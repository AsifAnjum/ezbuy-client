import { PiSmileySadLight } from "react-icons/pi";

const ItemNotFound = ({ message, section, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        section ? "h-[calc(100vh-70vh)]" : "h-[calc(100vh-14rem)]"
      }`}
    >
      <PiSmileySadLight size={70} />
      <p
        className={`mt-4 text-xl font-semibold ${
          className ? className : "text-gray-600"
        } `}
      >
        {message ? message : "Something Went Wrong!!!"}
      </p>
    </div>
  );
};
export default ItemNotFound;
