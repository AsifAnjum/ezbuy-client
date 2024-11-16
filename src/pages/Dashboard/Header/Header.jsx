import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-base-100">
      <div className="py-6 ">
        <div className="flex items-center justify-center">
          <Link to="/" className="text-3xl lg:text-4xl">
            𝓔𝓩𝓑𝓤𝓨
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
