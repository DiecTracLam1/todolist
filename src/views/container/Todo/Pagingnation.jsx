import React from "react";
import "../../../assets/css/pagingnation.css"
import ReactPaginate from "react-paginate";
import { FcPrevious, FcNext } from 'react-icons/fc';

function PaginatedItems({ pageTotalCount ,setPagecount , pageCount , setSearchparams , searchParams ,limit}) {
  const handlePageClick = (event) => {
    setPagecount(event.selected) ;
    setSearchparams({...searchParams , _page : event.selected + 1 , _offset : limit * event.selected});
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FcNext/>}
        onPageChange={handlePageClick}
        forcePage={pageCount}
        pageRangeDisplayed={1}
        pageCount={pageTotalCount}
        previousLabel={<FcPrevious/>}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageLinkClassName={"page-num"}
        activeLinkClassName={"active"}
        previousLinkClassName={"page-num"}
        nextLinkClassName={"page-num"}
        breakLinkClassName = {"page-num"}
      />
    </>
  );
}
export default PaginatedItems;