const Top5ViewedProducts = ({ index, title, views }) => {
  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center">
        <span className="mr-2 text-sm font-semibold text-gray-600">
          {index}.
        </span>
        <span className="font-medium text-gray-800 text-md">{title}</span>
      </div>
      <div className="text-sm text-gray-500">
        <span className="font-bold text-gray-700">{views}</span> viewed
      </div>
    </li>
  );
};
export default Top5ViewedProducts;
