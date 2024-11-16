import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/shop?search=${e.target.search.value}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="items-center hidden h-10 gap-2 rounded-none md:flex bg-slate-100 focus:border-none input-md input input-bordered"
    >
      <input
        type="text"
        name="search"
        className=""
        placeholder="what are you looking for?"
      />
      <CiSearch size={20} />
    </form>
  );
};
export default Search;
