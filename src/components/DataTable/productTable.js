/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  FileText,
  MoreVertical,
  Edit2,
  Trash,
} from "react-feather";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
  Spinner,
} from "reactstrap";
import {
  arrowleft2,
  arrowright2,
  filter,
  searchbar,
  searchnormal,
} from "../icons/icon";
import { MdSearch } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "antd";

const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))


const ProductTable = ({
  data, //  data
  columns, // coulumns
  currentPage, // 0
  showFilter,
  // showRow, // undefines
  // rowHeading, // undefines
  setCurrentPage, //
  setPageNumber,
  count, //ok
  // setSearch,
  loading,
}) => {
  // debugger;
  const [modal, setModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle Modal toggle
  // const handleModal = () => setModal(!modal);

  // ** Function to handle filter
  // const handleFilter = (e) => {
  //   const value = e.target.value;
  //   let updatedData = [];
  //   setSearchValue(value);

  //   if (value.length) {
  //     updatedData = data.filter((item) => {
  //       const startsWith =
  //         item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.post.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.email.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.age.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().startsWith(value.toLowerCase());

  //       const includes =
  //         item.full_name.toLowerCase().includes(value.toLowerCase()) ||
  //         item.post.toLowerCase().includes(value.toLowerCase()) ||
  //         item.email.toLowerCase().includes(value.toLowerCase()) ||
  //         item.age.toLowerCase().includes(value.toLowerCase()) ||
  //         item.salary.toLowerCase().includes(value.toLowerCase()) ||
  //         item.start_date.toLowerCase().includes(value.toLowerCase());

  //       if (startsWith) {
  //         return startsWith;
  //       } else if (!startsWith && includes) {
  //         return includes;
  //       } else return null;
  //     });
  //     setFilteredData(updatedData);
  //     setSearchValue(value);
  //   }
  // };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    console.log(page)
    setCurrentPage(page.selected);
    setPageNumber(page.selected + 1);
  };

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
           <Button className='flex justify-between items-center' type='default'> <FaArrowLeft /> <span className="ml-2">Previous</span> </Button>
      </Fragment>
    );
  };

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <Button className='flex justify-between items-center' type='default'>  <span className="mr-2">Next</span> <FaArrowRight /></Button>
      </Fragment>
    );
  };
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={count}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-between mt-4"
    />
    // <ReactPaginate
    //   previousLabel={<Previous size={15} />}         // Previous button
    //   nextLabel={<Next size={15} />}                 // Next button
    //   forcePage={currentPage}                        // Force current page to stay in sync
    //   onPageChange={(page) => handlePagination(page)}
    //   pageCount={count}                              // Total pages
    //   breakLabel="..."                               // Ellipsis between page ranges
    //   pageRangeDisplayed={2}                         // Pages around current page
    //   marginPagesDisplayed={2}                       // Pages at the start and end
    //   activeClassName="active"                       // Active page styling
    //   pageClassName="page-item"                      // Page item styling
    //   breakClassName="page-item"                     // Ellipsis styling
    //   nextLinkClassName="page-link"                  // Next link styling
    //   pageLinkClassName="page-link"                  // Page link styling
    //   breakLinkClassName="page-link"                 // Break/ellipsis link styling
    //   previousLinkClassName="page-link"              // Previous link styling
    //   nextClassName="page-item next-item"            // Next item styling
    //   previousClassName="page-item prev-item"        // Previous item styling
    //   containerClassName="pagination react-paginate separated-pagination pagination-sm pe-4 justify-end mt-4"
    // />

  );

  return (
    <>
      <Fragment>
        <Card className="border rounded-lg border-white px-4 w-full">
          {/* {showRow && (
            <div className="flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full">
              <div className="">
                <h6 className="plusJakara_semibold text-[#6C7278]">
                  {rowHeading}
                </h6>
              </div>
              <div className="flex items-center flex-wrap gap-[12px]">
                <div className="relative">
                  <img
                    src={searchnormal}
                    className="absolute mt-[12px] ms-3"
                    alt=""
                  />
                  <Input
                    className="dataTable-filter ps-5 md:pe-5 py-[8px] w-full"
                    type="text"
                    placeholder="Search anything here"
                    id="search-input-1"
                    value={searchValue}
                    // onChange={handleFilter}
                  />
                </div>
                {showFilter && (
                  <div>
                    <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                      <img src={filter} alt="" />
                      <span className="inter_regular text_black text-sm">
                        Filter
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )} */}
          {loading ? (
            <div
              className="py-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress size={18} color="inherit" />
            </div>
          ) : (
            <div className="react-dataTable">
              <DataTable
                noHeader
                pagination
                selectableRowsNoSelectAll
                // selectableRows
                columns={columns}
                paginationPerPage={10}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                // selectableRowsComponent={BootstrapCheckbox}
              />
            </div>
          )}
        </Card>
      </Fragment>
    </>
  );
};

export default ProductTable;
