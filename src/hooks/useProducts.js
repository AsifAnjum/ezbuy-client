import { useGetProductsQuery } from "../redux/features/product/productApi";

const useProducts = (query, options = {}) => {
  let updatedQuery;

  if (typeof query === "object") {
    updatedQuery = query?.size
      ? (function () {
          // let queryString = "";
          // query.forEach((value, key) => {
          //   queryString += queryString.length ? "&" : "";
          //   if (key == "sort") {
          //     queryString += `sort=${
          //       (value == "most-sold" && "-sold") ||
          //       (value == "best-discount" && "-sale") ||
          //       (value == "low-to-high" && "price") ||
          //       (value == "high-to-low" && "-price")
          //     }`;
          //   } else {
          //     queryString += `${key}=${value}`;
          //   }
          // });

          // return queryString;
          const queryArray = [];

          // sorted query. best for rtk caching
          if (query.get("search"))
            queryArray.push(`search=${query.get("search")}`);

          if (query.get("page")) queryArray.push(`page=${query.get("page")}`);

          if (query.get("category"))
            queryArray.push(`category=${query.get("category")}`);

          if (query.get("tags")) queryArray.push(`tags=${query.get("tags")}`);

          if (query.get("rating"))
            queryArray.push(`rating=${query.get("rating")}`);

          if (query.get("sort")) {
            const sortQuery = query.get("sort");
            const sortVal =
              (sortQuery == "most-sold" && "-sold") ||
              (sortQuery == "best-discount" && "-sale") ||
              (sortQuery == "low-to-high" && "price") ||
              (sortQuery == "high-to-low" && "-price");

            queryArray.push(`sort=${sortVal}`);
          }

          return queryArray.length ? queryArray.join("&") : "";
        })()
      : "page=1";
  } else if (typeof query === "string") {
    updatedQuery = query;
  } else if (typeof query === "undefined") {
    updatedQuery = "page=1";
  }

  const { data, isLoading, error, isError, isSuccess } = useGetProductsQuery(
    updatedQuery,
    options
  );

  const { products } = data?.data || [];
  const totalPage = data?.data.page || 0;

  return { products, isLoading, isError, error, isSuccess, totalPage };
};
export default useProducts;
