const TableLoader = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-[10%] h-4 skeleton"></div>

          <div className="w-[40%] h-4 skeleton"></div>

          <div className="w-[20%] h-4 skeleton"></div>

          <div className="w-[20%] h-4 skeleton"></div>
          <div className="w-[10%] h-4 skeleton"></div>
        </div>
      ))}
    </div>
  );
};
export default TableLoader;
