import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({ rating }) => {
  const content = (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const fill = index < rating ? "text-yellow-400" : "text-gray-300";
        return <TiStarFullOutline key={index} className={`text-xl ${fill}`} />;
      })}
    </div>
  );

  return content;
};
export default Rating;
