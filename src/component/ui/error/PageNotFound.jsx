import { Link } from "react-router-dom";
import Footer from "../../../pages/shared/Footer/Footer";
import Navbar from "../../../pages/shared/Navbar/Navbar";
import { useLocation } from "react-router-dom";
// import { useRouteError } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  let breadcrumbsContent;
  if (location.pathname.indexOf("/dashboard") > -1) {
    breadcrumbsContent = (
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    );
  } else if (location.pathname.indexOf("/shop") > -1) {
    breadcrumbsContent = (
      <li>
        <Link to="/shop">Shop</Link>
      </li>
    );
  }

  return (
    <div className="container flex flex-col justify-between min-h-screen mx-auto">
      <Navbar />
      <div className="flex-grow my-20">
        <div className="text-sm breadcrumbs">
          <ul className="text-slate-500">
            <li>
              <Link to="/">Home</Link>
            </li>
            {breadcrumbsContent}
            <li className="font-bold text-black">404 Error</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center mt-20 space-y-16">
          <h1 className="text-7xl font-bold tracking-[1rem]">404 Not Found</h1>
          <p className="font-semibold">
            Your visited page is not found. You may go home page.
          </p>
          <button className="text-white btn btn-error btn-wide">
            Back to home page
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PageNotFound;
