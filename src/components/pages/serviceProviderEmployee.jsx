/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { allCompanyEmployees } from "../api/customer";
import ProductTable from "../DataTable/productTable";
import '../styles/swiper.css';
import ImageLoader from "./ImageLoader/ImageLoader";
import { Modal } from "antd";
import { FaArrowLeft } from "react-icons/fa";

const ServiceProviderEmployeee = () => {
  const { state } = useLocation()
  const userData = state?.user || null
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (userData) {
      setLoading2(true)
      allCompanyEmployees(userData?._id, lastId)
        .then((res) => {
          if (res.data) {
            setCompanies(res.data?.users)
            setLoading2(false)
            setLastId(res.data.lastId)
          }
        }).catch((err) => {
          setLoading2(false)
          console.log(err);
        })
    }
  }, [userData])
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };

  const columns = [
    {
      name: "Profile Photo",
      sortable: true,
      minWidth: "110px",
      maxWidth: "150px",
      cell: (row) => {
        return (
          <div className="flex p-2 items-center gap-1" >
            <ImageLoader
              imageUrl={row?.profilePicture}
              onClick={() => handleImageClick(row?.profilePicture)}
              classes={"catIm00 rounded-5"}
            />
          </div>)
      }
    },
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row?.name,
      minWidth: "180px",
      maxWidth: "200px",
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row?.phone,
      minWidth: "180px",
      maxWidth: "200px",
    },
    {
      name: "Email Address",
      sortable: true,
      selector: (row) => row?.email,
      minWidth: "220px",
      maxWidth: "240px",
    },
    {
      name: "Address",
      sortable: true,
      cell: (row) => (
        <span className="text_black plusJakara_medium">{row?.address || 'No found'}</span>
      ),
      minWidth: "210px",
      maxWidth: "250px",
    },
  ];

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-5 px-4 mx-auto" style={{ minHeight: '90vh' }}>
        <div className="flex items-center mb-3 gap-3">
          <button className="p-2 bg_primary text_white rounded-2" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h5 className="plusJakara_semibold mb-0 text_dark">{userData?.name}'s Employees</h5>
        </div>
        {loading2 ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <CircularProgress size={24} className="text_dark" />
          </main>
        ) : !companies || companies.length === 0 ? (
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
            data={companies}
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
    </StyleSheetManager >
  );
};

export default ServiceProviderEmployeee;
