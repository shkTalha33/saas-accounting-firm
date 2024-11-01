/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import ProductTable from "../DataTable/productTable";
import { allUsers, updateUser } from "../api/customer";
import { avatar1 } from "../icons/icon";
import ImageLoader from "./ImageLoader/ImageLoader";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };

  const columns = [
    {
      name: "Profile Picture",
      sortable: true,
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="flex justify-center gap-1" style={{ maxWidth: '100px', width: '100%' }}>
            <ImageLoader
              circeltrue={true}
              imageUrl={row?.profilePicture}
              onClick={() => handleImageClick(row?.profilePicture)}
              classes={"rounded-5 catIm00 radius20"}
            />
          </div>)
      }
    },
    {
      name: "Full Name",
      sortable: true,
      selector: (row) =>
        !row?.name
          ? "User Not found"
          : row?.name,
      minWidth: "110px",
      maxWidth: "200px",
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "210px",
      maxWidth: "250px",
      selector: (row) => row?.email || 'example@example.com',
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row?.phone || '+12345676543',
      minWidth: "110px",
      maxWidth: "200px",
    },
    {
      name: "Address",
      sortable: true,
      cell: (row) => (
        <span className="text_black plusJakara_medium">{row?.address}</span>
      ),
      minWidth: "210px",
      maxWidth: "250px",
    },
    {
      name: "Action",
      allowoverflow: true,
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              style={{
                backgroundColor:
                  row.status === "online" ? "#06D6A0" : "#d15a5a",
              }}
              disabled={loading2}
              onClick={() => handleUpdate(row)}
              className={`text_white flex justify-center rounded-2 py-1 px-2 items-center relative`}
            >
              {statusId === row._id && loading2 ? (
                <CircularProgress size={15} color="inherit" />
              ) : row.status === "online" ? (
                "Activate"
              ) : (
                "Deactivate"
              )}
            </button>
          </div>
        );
      },
    },
  ];

  const handleUpdate = async (item) => {
    setStatusId(item?._id);

    setLoading2(true);
    try {
      let newStatus;
      if (item?.status === "online") {
        newStatus = "deactivated";
      } else if (item?.status === "deactivated") {
        newStatus = "online";
      } else {
        return;
      }
      const res = await updateUser(item?._id, newStatus)
      if (res?.data) {
        message.success(`User ${newStatus} Successfully`);
        fetchData();
      }
    } catch (error) {
      setLoading2(false);
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await allUsers('customer', lastId)
      if (res?.data) {
        setCategories(res?.data?.users);
        setcount(res?.data?.count?.totalPage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastId]);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="lg:container py-5 px-4 mx-auto" style={{ minHeight: '90vh' }}>
        <div className="flex items-center mb-3 gap-3">
          <h5 className="plusJakara_semibold text_dark">All Customers</h5>
        </div>
        {loading ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <CircularProgress size={24} className="text_dark" />
          </main>
        ) : !categories || categories.length === 0 ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <span className="text_secondary plusJakara_medium">
              No Data Found
            </span>
          </main>
        ) : (
          <ProductTable
            count={count}
            
            loading={loading}
            setCurrentPage={setLastId2}
            currentPage={lastId2}
            columns={columns}
            data={categories}
            setLastId={setLastId}
          />
        )}
      </main>

      <Modal
        open={showImagePreview}
        onCancel={() => setShowImagePreview(false)}
        footer={null}
        centered
      >
        <img
          src={selectedImage}
          alt={selectedImage}
          className="object-cover w-full"
          style={{ maxHeight: "24rem" }}
        />
      </Modal>


    </StyleSheetManager>
  );
};

export default Customers;
