import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { useState, useEffect } from "react";

import Filter from "./Filter";

const FilterSidebar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prevDrawer) => !prevDrawer);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDrawer && !event.target.closest("#drawer")) {
        setOpenDrawer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDrawer]);

  return (
    <>
      {/* Filter Sidebar - Always visible on mobile screen with drawer */}
      <aside className="p-4 xl:hidden">
        <button onClick={toggleDrawer} className="bg-white btn hover:bg-white">
          <HiOutlineMenuAlt2 size={20} />
          Filters
        </button>

        <div
          id="drawer"
          className={`fixed top-0 left-0 z-20 w-64 h-full overflow-y-auto transition-all duration-700 transform  bg-white shadow-lg ${
            openDrawer ? " translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-4 mt-28">
            <Filter toggleDrawer={toggleDrawer} />
          </div>
        </div>
      </aside>

      {/* Filter Sidebar - Always visible on larger screens */}
      <aside className="hidden w-1/4 p-4 xl:block">
        <Filter toggleDrawer={toggleDrawer} />
      </aside>
    </>
  );
};
export default FilterSidebar;
