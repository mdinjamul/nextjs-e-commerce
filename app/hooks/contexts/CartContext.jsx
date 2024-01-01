"use client";
import {
  fetchCartItems,
  fetchForAddToCart,
  fetchForDeleteCart,
  fetchForUpdateCart,
} from "@/app/functions/fetch";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = session?.user?.id;

  ////////////////////////
  // ADD TO CART
  ////////////////////////
  const addToCart = async (
    userId,
    productId,
    title,
    image,
    price,
    stock,
    quantity
  ) => {
    if (session) {
      // check existing product
      const checkExistingItem = await fetchCartItems(userId);
      const updateCartItems = await checkExistingItem.find(
        (item) => item.productId === productId && item.userId === userId
      );
      try {
        // update quantity if product already exist
        if (updateCartItems) {
          const newQuantity = updateCartItems.quantity + quantity;
          const updateQty = await fetchForUpdateCart(
            updateCartItems.id,
            newQuantity
          );

          if (updateQty.ok) {
            // fetching cart items to show updated cart quantity
            const countTotalCartItems = await fetchCartItems(userId);
            setCartData(countTotalCartItems);
            toast.success("Item Exist, Quantity Updated");
          } else {
            toast.error("Unexpected Error");
          }

          return updateQty;
        }

        // if product not exist then create new cart item
        const addToCartResponse = await fetchForAddToCart(
          userId,
          productId,
          title,
          image,
          price,
          stock,
          quantity
        );

        if (!addToCartResponse) {
          toast.error("Unable to add product to Cart");
        } else {
          // fetching cart items to show added cart quantity
          const countTotalCartItems = await fetchCartItems(userId);
          setCartData(countTotalCartItems);
          toast.success("Product added to cart");
        }
      } catch (error) {
        toast.error("Unexpected Error 2", error);
      }
    } else {
      toast.warning("you are not logged in, please login first");
      router.push("/login");
    }
  };

  ////////////////////////
  // MANAGE CART ITEMS  //
  ////////////////////////

  /*********************
   * Get cart items
   *********************/
  const getCartItems = async () => {
    if (session && userId) {
      try {
        const data = await fetchCartItems(userId);
        if (data) {
          setCartData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching cart items", error);
      }
    }
  };

  /*********************
   * Increase Quantity
   *********************/
  const increaseQty = (cartItemId) => {
    console.log("I have clicked on +", cartItemId);
    const cartQuantityUpdated = cartData.map((item) => {
      if (item.id === cartItemId) {
        item.quantity += 1;
        item.isQuantityChanged = true;
      }
      return item;
    });
    setCartData(cartQuantityUpdated);
  };

  /********************
   * Decrease Quantity
   ********************/
  const decreaseQty = (cartItemId) => {
    console.log("I have clicked on -", cartItemId);
    const cartQuantityUpdated = cartData.map((item) => {
      if (item.id === cartItemId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.isQuantityChanged = true;
        }
      }
      return item;
    });
    setCartData(cartQuantityUpdated);
  };

  /***************************
   * Calculate Total Summery
   ***************************/
  const subTotalPrice = cartData
    ?.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    .toFixed(2);

  const totalUnits = cartData?.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  const gst = ((subTotalPrice * 18) / 100).toFixed(2);
  const totalPrice = (Number(subTotalPrice) + Number(gst)).toFixed(2);

  /**********************
   * Update Cart Quantity
   ***********************/
  const updateCart = async (cartItemId) => {
    const itemToUpdate = cartData.find((item) => item.id === cartItemId);
    if (!itemToUpdate) {
      return null;
    }

    try {
      const newQuantity = itemToUpdate.quantity;
      const update = await fetchForUpdateCart(cartItemId, newQuantity);

      // Disabling the update button after apdate the cart
      if (update.ok) {
        const updatedCartData = [...cartData];
        updatedCartData.forEach((item) => {
          if (item.id === cartItemId) {
            item.isQuantityChanged = false;
          }
        });
        // Update the state to reflect the changes
        setCartData(updatedCartData);
      }

      toast.success("Cart Updated Successfully");
      return update;
    } catch (error) {
      toast.error("Unable to update cart", error);
    }
  };

  /*************************
   * Deleting the cart Item
   *************************/
  const deleteItem = async (cartItemId) => {
    try {
      await fetchForDeleteCart(cartItemId);

      // re render the component
      const updatedCartData = cartData.filter((item) => item.id !== cartItemId);
      setCartData(updatedCartData);

      toast.success("Item Deleted Successfully");
    } catch (error) {
      toast.error("Unable to Delete Item");
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        cartData,
        isLoading,
        increaseQty,
        decreaseQty,
        subTotalPrice,
        totalUnits,
        gst,
        totalPrice,
        updateCart,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// create custom hook
const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("There is a error with Cart Context");
  }
  return context;
};
export { CartProvider, useCartContext };
