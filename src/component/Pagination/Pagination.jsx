const Pagination = ({ currentPage, totalPage, handlePage }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-20">
      <button
        disabled={currentPage <= 1}
        className="btn btn-md btn-outline"
        onClick={() => handlePage(currentPage - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPage || 0 }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePage(i + 1)}
          className={` btn btn-md ${
            currentPage === i + 1
              ? "btn-neutral pointer-events-none"
              : "btn-outline"
          } `}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage >= totalPage}
        className="btn btn-md btn-outline"
        onClick={() => handlePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
