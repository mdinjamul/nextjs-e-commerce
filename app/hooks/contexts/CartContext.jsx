"use client";
import {
  fetchCartItems,
  fetchForAddToCart,
  fetchForDeleteCart,
  fetchForUpdateCart,
} from "@/app/functions/fetch";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartData, setCartData] = useState([]);
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
        toast.success("Product added to cart");
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
  useEffect(() => {
    if (session && userId) {
      const handleCartItems = async () => {
        try {
          const data = await fetchCartItems(userId);
          setCartData(data);
        } catch (error) {
          console.log("Error fetching cart items", error);
        }
      };
      handleCartItems();
    }
  }, [session, userId]);

  /*********************
   * Increase Quantity
   *********************/
  const increaseQty = (cartItemId) => {
    const cartQuantityUpdated = cartData.map((item) => {
      if (item.id === cartItemId) {
        item.quantity++;
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
    const cartQuantityUpdated = cartData.map((item) => {
      if (item.id === cartItemId) {
        if (item.quantity > 1) {
          item.quantity--;
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
      const update = await fetchForUpdateCart(cartItemId, itemToUpdate);

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
      toast.error("Unable to update");
    }
  };

  /*************************
   * Deleting the cart Item
   *************************/
  const deleteItem = async (cartItemId) => {
    const itemToDelete = cartData.find((item) => item.id === cartItemId);
    if (!itemToDelete) {
      return null;
    }
    try {
      await fetchForDeleteCart(cartItemId);

      // Create a new array without the deleted item
      const updatedCartData = cartData.filter((item) => item.id !== cartItemId);

      // Update the state to reflect the changes
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
        cartData,
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
