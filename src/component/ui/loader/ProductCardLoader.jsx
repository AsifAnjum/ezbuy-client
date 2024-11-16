const ProductCardLoader = ({ limit, className }) => {
  return Array.from({ length: limit }, (_, i) => (
    <div
      key={i}
      className={` flex flex-col gap-4 w-[270px] ${className ? className : ""}`}
    >
      {/* img  */}
      <div className="w-full h-64 skeleton"></div>
      {/* title */}
      <div className="w-full h-4 skeleton"></div>
      {/* price */}
      <div className="w-16 h-4 skeleton"></div>
      <div className="w-32 h-4 skeleton"></div>
    </div>
  ));
};
export default ProductCardLoader;
