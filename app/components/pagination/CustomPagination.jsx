import { createQueryString } from "@/app/functions/commonFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ totalProducts, productsPerPage }) => {
  const router = useRouter();
  const searchparams = useSearchParams();

  //   set search params for pagination
  const handlePageClick = (event) => {
    const clickedPageNumber = event.selected + 1;
    console.log(clickedPageNumber);
    router.push(
      "?" + createQueryString(searchparams, "page", clickedPageNumber)
    );
  };

  const totalPage = Math.ceil(totalProducts / productsPerPage);

  console.log(typeof totalPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={totalPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="<<"
        nextLabel=">>"
        containerClassName="pagination flex items-center justify-center"
        pageClassName="page-item relative inline-flex items-center mx-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        previousClassName="page-item relative inline-flex items-center mx-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        nextClassName="page-item relative inline-flex items-center mx-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        breakClassName="page-item relative inline-flex items-center mx-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        pageLinkClassName="page-link px-4 py-2"
        previousLinkClassName="page-link px-4 py-2"
        nextLinkClassName="page-link px-4 py-2"
        breakLinkClassName="page-link px-4 py-2 "
        activeClassName="active !bg-blue-600 text-white border border-blue-600"
      />
    </>
  );
};

export default CustomPagination;
