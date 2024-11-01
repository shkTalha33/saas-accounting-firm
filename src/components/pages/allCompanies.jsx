import React, { useState } from "react";
import ProductTable from "../DataTable/productTable";
import { CircularProgress } from "@mui/material";
import ImageLoader from "./ImageLoader/ImageLoader";
import { avatar1 } from "../icons/icon";
import { Card } from "reactstrap";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CompanyFirms() {
  const [loading, setLoading] = useState(false);
  const [cellLoading, setCellLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusId, setStatusId] = useState("");

  const data = [
    {
      _id: "1",
      reg: "1",
      logo: avatar1,
      name: "Abstergo Ltd.",
      phone: "070 5472 6467",
      email: "tanya.hill@example.com",
      address: "3890 Poplar Dr.",
      admin: "Shane",
      plan: "premium",
      status: "Active",
    },
    {
      _id: "2",
      reg: "2",
      logo: avatar1,
      name: "Abstergo Ltd.",
      phone: "070 5472 6467",
      email: "tanya.hill@example.com",
      address: "3890 Poplar Dr.",
      admin: "Shane",
      plan: "premium",
      status: "Inactive",
    },
    {
      _id: "3",
      reg: "3",
      logo: avatar1,
      name: "Talha Ltd.",
      phone: "070 5472 6467",
      email: "tanya.hill@example.com",
      address: "3890 Poplar Dr.",
      admin: "Shane",
      plan: "premium",
      status: "Active",
    },
  ];

  const columns = [
    {
      name: "Reg#",
      minWidth: "70px",
      maxWidth: "80px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.reg || "1"}
        </span>
      ),
    },
    {
      name: "Logo",
      minWidth: "70px",
      maxWidth: "70px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.logo}
            classes="rounded-full"
            style={{ maxWidth: "35px", maxHeight: "35px", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      name: "Firm Name",
      minWidth: "210px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.name || "example@example.com"}
        </span>
      ),
    },
    {
      name: "Firm Email",
      minWidth: "210px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.email || "example@example.com"}
        </span>
      ),
    },
    {
      name: "Phone",
      minWidth: "110px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.phone || "+12345676543"}
        </span>
      ),
    },
    {
      name: "Address",
      minWidth: "100px",
      maxWidth: "180px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.address}
        </span>
      ),
    },
    {
      name: "Admin",
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.admin || "Admin Not found"}
        </span>
      ),
    },
    {
      name: "Plan",
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.plan || "Premium"}
        </span>
      ),
    },
    {
      name: "Status",
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <button
            style={{ color: row.status === "Active" ? "#26A4FF" : "#FF6550" }}
            disabled={cellLoading}
            className="rounded py-1 px-2"
          >
            {statusId === row._id && cellLoading ? (
              <CircularProgress size={15} color="inherit" />
            ) : row.status === "Active" ? (
              "Activate"
            ) : (
              "Inactive"
            )}
          </button>
        </div>
      ),
    },
  ];

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/companies/addfirm")
  }

  return (
    <main className="min-h-screen lg:container p-4 mx-auto">
      <Card className="p-3 mb-5 border rounded-lg border-white w-full">
        <div className="flex justify-between">
          <div>
            <h4 >Firms</h4>
            <p className="text-gray-500">
              Here Are The Firms That Have Subscribed
            </p>
          </div>
          <div>
            <Button
            onClick={handleClick}
              type="dashed"
              icon={
                <FaPlus style={{ padding: "3px", borderRadius: "50%", backgroundColor: "#f0f0f0" }} />
              }
              loading={false}
            >
              
              Add Firm
            </Button>
          </div>
        </div>
      </Card>
      <ProductTable
        count={count}
        loading={loading}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        columns={columns}
        data={data}
        setPageNumber={setPageNumber}
      />
    </main>
  );
}
