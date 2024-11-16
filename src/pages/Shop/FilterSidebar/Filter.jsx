import { useState } from "react";
import { IoRadioButtonOn } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import Rating from "../../../component/Rating";

const Filter = ({ toggleDrawer }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const categoriesChecked = searchParams
    .get("category")
    ?.split(",")
    .reduce((acc, category) => ({ ...acc, [category]: true }), {});

  const [categories, setCategories] = useState({
    Electronics: categoriesChecked?.Electronics || false,
    Clothing: categoriesChecked?.Clothing || false,
    Books: categoriesChecked?.Books || false,
    Kitchen: categoriesChecked?.Kitchen || false,
    Toys: categoriesChecked?.Toys || false,
    Sports: categoriesChecked?.Sports || false,
    Gaming: categoriesChecked?.Gaming || false,
    Others: categoriesChecked?.Others || false,
  });

  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Handle checkbox changes for categories
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle the filter button click
  const handleFilterClick = () => {
    const updatedCategories = Object.keys(categories)
      .filter((category) => categories[category])
      .join(",");

    const filters = {
      search: search,
      category: updatedCategories,
      rating,
      sort,
      page: 1,
    };

    setSearchParams((prev) => {
      for (let key in filters) {
        if (filters[key]) {
          prev.set(key, filters[key]);
        } else {
          prev.delete(key);
        }

        if (key === "search" && search.length) {
          prev.delete("tags");
        }
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategories({
      Electronics: false,
      Clothing: false,
      Books: false,
      Kitchen: false,
      Toys: false,
      Sports: false,
      Gaming: false,
      Others: false,
    });
    setRating("");
    setSort("");
    setSearchParams("");
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold">Filters</h3>

      {/* product search */}

      <input
        type="text"
        className="profile-input"
        placeholder="what are you looking for?"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <div className="">
        <h4 className="font-semibold">Category</h4>
        <div className="mt-2 space-y-2">
          {[
            "Electronics",
            "Clothing",
            "Books",
            "Kitchen",
            "Toys",
            "Sports",
            "Gaming",
            "Others",
          ].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="w-[19px] h-4 mr-2 checkbox"
                name={category}
                checked={categories[category]}
                onChange={handleCategoryChange}
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="">
        <h4 className="font-semibold">Rating</h4>
        <div className="mt-2">
          {[5, 4, 3, 2, 1].map((stars, i) => (
            <label key={stars} className="flex items-center">
              <input
                type="radio"
                className="appearance-none peer"
                onClick={(e) => {
                  rating == e.target.value && setRating("");
                }}
                value={stars}
                checked={rating == stars}
                onChange={(e) => setRating(e.target.value)}
              />
              <IoRadioButtonOn className="mr-2 fill-white peer-checked:fill-black" />
              <Rating rating={stars} /> {i == 0 ? "" : "& Up"}
            </label>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="">
        <h4 className="font-semibold">Sort By</h4>
        <div className="mt-2 space-y-2">
          {/* Sort by Price */}
          {["low-to-high", "high-to-low", "best-discount", "most-sold"].map(
            (sortOption) => (
              <label key={sortOption} className="flex items-center capitalize">
                <input
                  type="radio"
                  onClick={(e) => {
                    sort == e.target.value && setSort("");
                  }}
                  className="appearance-none peer"
                  value={sortOption}
                  checked={sort === sortOption}
                  onChange={(e) => setSort(e.target.value)}
                />
                <IoRadioButtonOn className="mr-2 fill-white peer-checked:fill-black" />
                {sortOption.split("-").join(" ")}
              </label>
            )
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            if (window.innerWidth <= 1280) {
              // 768px is a common breakpoint for mobile
              toggleDrawer();
            }
            handleFilterClick();
          }}
          className="text-white btn btn-error"
        >
          Filter
        </button>
        <button onClick={clearFilters} className="btn btn-outline">
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default Filter;
