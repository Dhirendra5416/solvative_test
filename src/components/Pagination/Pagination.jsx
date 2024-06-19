import React from 'react';
import './Pagination.css';

const Pagination=({  limit, setLimit, page, setPage, resultsLength, totalCount })=> {
  
  const totalPages = Math.ceil(totalCount / limit);
//   console.log(totalPages)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); 
    }
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>{page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
      <div className="limit-controls">
        <label htmlFor="limit">Results per page:</label>
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>
    </div>
  );
}

export default Pagination;
