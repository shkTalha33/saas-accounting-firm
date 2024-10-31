/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { Autoplay, FreeMode, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { allUsers, updateUser } from "../api/customer";
import ProductTable from "../DataTable/productTable";
import ImageLoader from "./ImageLoader/ImageLoader";

const Employee = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [selectedItem, setselectedItem] = useState(null)
  const [companies, setCompanies] = useState([]);
  const [showModal, setshowModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef()

  const handleClickPortfolio = (row) => {
    setshowModal(true)
    setselectedItem(row)
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };
  const columns = [
    {
      name: "Business Cover",
      sortable: true,
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="flex p-2 items-center gap-1" >
            <ImageLoader
              imageUrl={row?.coverPic}
              onClick={() => handleImageClick(row?.coverPic)}
              classes={"catIm02 rounded-2"}
            />
          </div>)
      }
    },
    {
      name: "Business Information",
      sortable: true,
      cell: (row) => {
        return (
          <div className="flex items-center gap-2" style={{ maxWidth: '250px', width: '100%' }}>
            <ImageLoader
              circeltrue={true}
              imageUrl={row?.profilePicture}
              onClick={() => handleImageClick(row?.profilePicture)}
              classes={"rounded-5 catIm01 radius20"}
            />
            <div className="flex flex-col items-start">
              <span className="text_black text-sm plusJakara_semibold">{row?.name}</span>
              <span className="text_secondary plusJakara_regular">{row?.email}</span>
            </div>
          </div>)
      },
      minWidth: "250px",
      maxWidth: "250px",
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row?.phone,
      minWidth: "180px",
      maxWidth: "200px",
    },
    {
      name: "Business Address",
      sortable: true,
      cell: (row) => (
        <span className="text_black plusJakara_medium">{row?.address || 'No found'}</span>
      ),
      minWidth: "210px",
      maxWidth: "250px",
    },
    {
      name: "Portfolio",
      sortable: true,
      minWidth: "150px",
      maxWidth: "280px",
      cell: (row) => {
        return (
          <div className="flex">
            {row?.portfolio?.length > 0 ?
              <button onClick={() => handleClickPortfolio(row, 0)} className="plusJakara_medium whitespace-nowrap px-2 py-1 rounded-2 text-xs text_white bg_primary gap-1">
                See Portfolios
              </button> :
              <button disabled style={{ backgroundColor: "#f4f4f4" }} className="plusJakara_medium px-2 py-1 rounded-2 text-xs text_black gap-1">
                No Portfolio
              </button>}
          </div>
        )
      }
    },
    {
      name: "Subscription",
      sortable: true,
      selector: (row) => row?.plan || 'No Plan',
      minWidth: "110px",
      maxWidth: "200px",
    },
    {
      name: "Insurance No",
      sortable: true,
      selector: (row) => row?.insurance || 'No Insurance',
      minWidth: "110px",
      maxWidth: "150px",
    },
    {
      name: "License No",
      sortable: true,
      selector: (row) => row?.license || 'Not found',
      minWidth: "110px",
      maxWidth: "150px",
    },
    // {
    //   name: "Category",
    //   sortable: true,
    //   minWidth: "110px",
    //   maxWidth: "250px",
    //   cell: (row) => {
    //     return (
    //       <div className="flex gap-1">
    //         {row?.category ?
    //           typeof row?.category !== 'string' && row?.category?.length > 0 ? (
    //             <div className="text_dark flex justify-center plusJakara_semibold items-center relative">
    //               {toCapitalized(row?.category?.join(', '))}
    //             </div>
    //           ) : (
    //             <div className="text_dark flex justify-center plusJakara_semibold items-center relative">
    //               {toCapitalized(row?.category)}
    //             </div>
    //           )
    //           : <div className="text_dark flex justify-center plusJakara_semibold items-center relative">
    //             Not Found
    //           </div>}
    //       </div>
    //     );
    //   },
    // },
    {
      name: "View Employee",
      allowoverflow: true,
      // minWidth: "110px",
      // maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              style={{
                // backgroundColor:
                //   row.status === "online" ? "#d15a5a" : "#06D6A0",
              }}
              disabled={loading2}
              // onClick={() => handleUpdate(row)}
              onClick={() => navigate(`/service-providers/${row?._id}`, { state: { user: row } })}
              className={`text_white flex bg_primary justify-center rounded-3 py-1 px-2 items-center relative`}
            >
              {/* {statusId === row._id && loading2 ? (
                <CircularProgress size={15} color="inherit" />
              ) : row.status === "online" ? (
                "Deactivate"
              ) : (
                "Activate"
              )} */}
              <Eye size={14} />
            </button>
          </div>
        );
      },
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
      const res = await allUsers('company', lastId)
      if (res?.data) {
        setCompanies(res?.data?.users);
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

  console.log(selectedItem);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-5 px-4 mx-auto" style={{ minHeight: '90vh' }}>
        <div className="flex items-center mb-3 gap-3">
          <h5 className="plusJakara_semibold text_dark">All Service Providers</h5>
        </div>
        {loading ? (
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
        centered
        open={showModal}
        footer={null}
        width={700}
        zIndex={9999}
        onCancel={() => setshowModal(false)}
      >
        <h4 className="text_primary text-center mb-4 plusJakara_bold">View Portfolio Detail</h4>
        <div className="flex flex-wrap w-full gap-4">
          {selectedItem?.portfolio?.map((item, i) => (
            <div style={{ maxWidth: '300px', width: '100%' }} key={i} className="flex flex-col rounded-4 overflow-hidden border gap-3">
              <div className="home_swiper" style={{ width: '100%', height: 'auto' }}>
                <Swiper
                  freeMode={true}
                  modules={[FreeMode, Autoplay, Navigation]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  loop={true}
                  className="mySwiper d-flex w-100 gap-3 relative"
                  slidesPerView={1}
                >
                  {item?.urls?.map((cat, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ width: '100%', height: '10rem', overflow: 'hidden' }}
                    >
                      {cat?.type === 'video' && cat?.url ? (
                        <video
                          src={cat.url}
                          alt="Preview"
                          style={{
                            height: '100%',
                            width: '100%',
                            cursor: 'pointer',
                            objectFit: 'cover',
                          }}
                          className="rounded-4 w-full bg_light object-cover"
                          controls
                        />
                      ) : (
                        <img
                          // onClick={() => handleClickPortfolio(item, index)}
                          src={cat.url}
                          style={{
                            height: '100%',
                            width: '100%',
                            cursor: 'pointer',
                            objectFit: 'cover',
                          }}
                          alt="Project"
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="p-2 flex flex-col cursor-pointer gap-1">
                  <h6 className="text_black plusJakara_bold mb-0 whitespace-nowrap">{item.title}</h6>
                  <span className="text_secondary2 plusJakara_regular line-clamp-2">{item.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

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

export default Employee;
