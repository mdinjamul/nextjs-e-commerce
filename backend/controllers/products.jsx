import prisma from "@/backend/prisma/prismaClient";

/***************************
 * CREATE PRODUCT FUNCTION
 ***************************/
export const createProduct = async (request) => {
  const {
    title,
    price,
    description,
    category,
    seller,
    stock,
    images,
    reviews,
  } = await request.json();
  const product = await prisma.product.create({
    data: {
      title,
      price,
      description,
      category,
      seller,
      stock,
      images,
      reviews,
    },
  });
  return product;
};

/**************************
 * GET PRODUCTS AND FILTER PRODUCTS
 **************************/
export const getAllProducts = async (request) => {
  const url = new URL(request.url);
  let queryParam = {};

  // search by keyword
  const keyword = url.searchParams.get("keyword") || "";
  if (keyword) {
    const keywordTokens = keyword.split(/\s+/);
    const regexKeywords = keywordTokens
      .map((kw) => kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|");
    queryParam = {
      where: {
        ...queryParam.where,
        OR: [
          { title: { contains: regexKeywords, mode: "insensitive" } },
          { description: { contains: regexKeywords, mode: "insensitive" } },
        ],
      },
    };
  }

  // filter by price
  const minPrice = parseFloat(url.searchParams.get("minPrice")) || 0;
  const maxPrice =
    parseFloat(url.searchParams.get("maxPrice")) || Number.MAX_SAFE_INTEGER;

  // Create a price range condition
  const priceRange = {};
  if (minPrice > 0) {
    priceRange.gte = minPrice;
  }
  if (maxPrice) {
    priceRange.lte = maxPrice;
  }

  if (minPrice > 0 || maxPrice) {
    queryParam = {
      where: {
        ...queryParam.where,
        price: priceRange,
      },
    };
  }

  // filter by category
  const category = url.searchParams.get("category") || "";
  if (category) {
    queryParam = {
      where: {
        ...queryParam.where,
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
    };
  }

  // filter by rating
  const rating = url.searchParams.get("rating") || "";
  if (rating) {
    queryParam = {
      where: {
        ...queryParam.where,
        averageRating: {
          gte: parseFloat(rating),
        },
      },
    };
  }

  // sorting
  const sort = url.searchParams.get("sort") || "";
  if (sort === "asc") {
    queryParam = {
      ...queryParam,
      orderBy: { title: "asc" },
    };
  } else if (sort === "desc") {
    queryParam = {
      ...queryParam,
      orderBy: { title: "desc" },
    };
  } else if (sort === "latest") {
    queryParam = {
      ...queryParam,
      orderBy: { createdAt: "desc" },
    };
  } else if (sort === "oldest") {
    queryParam = {
      ...queryParam,
      orderBy: { createdAt: "asc" },
    };
  }

  // pagination
  const pageNumber = url.searchParams.get("page") || "";
  const itemsPerPage = url.searchParams.get("perPage") || 3;
  const productsPerPage = Number(itemsPerPage);
  const skip = (pageNumber - 1) * productsPerPage;
  if (pageNumber) {
    queryParam = {
      ...queryParam,
      skip: skip,
      take: productsPerPage,
    };
  }

  // Include the "reviews" collection in the query
  queryParam = {
    ...queryParam,
    include: {
      reviews: true, // Include the associated reviews
    },
  };

  // show filtered products
  const products = await prisma.product.findMany(queryParam);
  const productCount = await prisma.product.count({ where: queryParam.where });

  return {
    productCount,
    productsPerPage,
    products,
  };
};

/****************************
 * GET UNIQUE PRODUCT BY ID
 ****************************/
export const getUniqueProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true, // Include the associated reviews
    },
  });

  return product;
};

/*****************
 * UPDATE PRODUCT
 *****************/
export const updateProduct = async (id, request) => {
  const updatedData = await request.json();
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      ...updatedData,
    },
  });

  return product;
};

/************************
 * DELETE PRODUCT FUNTION
 *************************/
export const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  return product;
};
