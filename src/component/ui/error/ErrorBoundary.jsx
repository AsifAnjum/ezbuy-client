import { PiSmileySadLight } from "react-icons/pi";
import Footer from "../../../pages/shared/Footer/Footer";
import Navbar from "../../../pages/shared/Navbar/Navbar";

const ErrorBoundary = () => {
  return (
    <div className="container flex flex-col justify-between min-h-screen mx-auto">
      <Navbar />

      <div className="flex-grow my-20">
        <div className="flex flex-col items-center justify-center mt-20 space-y-16">
          <PiSmileySadLight size={70} />
          <p className="mt-4 text-xl font-semibold text-gray-600">
            Something Went Wrong
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ErrorBoundary;
