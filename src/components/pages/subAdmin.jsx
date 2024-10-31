/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { edit2, trash } from "../icons/icon";
// import { createCategory, getCategory } from "../api/category";
import { CircularProgress } from "@mui/material";
import { createCategory, editCategory, updateCategory } from "../api/category";
import { fileUpload } from "../api/fileUpload";
import ProductTable from "../DataTable/productTable";
import Select from "react-select";


const pagesOptions = [
  { value: "all", label: "All" },
  { value: "customers", label: "Dashboard" },
  { value: "category", label: "Category" },
  { value: "customers", label: "Customers" },
  { value: "serviceProviders", label: "Service Providers" },
  { value: "estimates", label: "Estimates" },
  { value: "allOrders", label: "All Orders" },
  { value: "customerSupport", label: "Customer Supports" },
];

const SubAdmin = () => {
  // states-------
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [categories, setCategories] = useState([1, 2, 3]);
  const [statusId, setstatusId] = useState("");
  const [lastId2, setLastId2] = useState(0);
  const [selectPages, setselectPages] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setselectedItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [count, setcount] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedItem2, setselectedItem2] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loadingstatus, setloadingstatus] = useState(false);
  const [courseImage, setCourseImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  const toCapitalized = (str) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  };

  const handleChange = (selectedOption) => {
    setselectPages(selectedOption);
  };


  useEffect(() => {
    if (selectedItem2) {
      setCourseImage(selectedItem2?.image);
      setSelectedImg(selectedItem2?.image);
      form.setFieldsValue({
        catName: selectedItem2?.name,
        catType: selectedItem2?.type
      });
      setIsEditMode(true);
    } else {
      form.resetFields();
      setCourseImage(null);
      setSelectedImg(null);
      setIsEditMode(false);
    }
  }, [selectedItem2, form]);

  const handleClick = (row) => {
    setselectedItem(row);
    setShowDelete(true);
  };

  const handleUpdate2 = async (row) => {
    setstatusId(row?._id);
    setloadingstatus(true);
    let newStatus;
    if (row?.status === "active") {
      newStatus = "deactivated";
    } else if (row?.status === "deactivated") {
      newStatus = "active";
    }
    try {
      const res = await updateCategory('cat', newStatus, row?._id)
      if (res) {
        message.success(`Status updated Successfully`);
        fetchData();
      } else {
        message.error("Status not updated");
      }
    } catch (error) {
      setloadingstatus(false);
      console.log(error);
    } finally {
      setloadingstatus(false);
    }
  };

  const uploadFoodFile = async (courseFile) => {
    setFileLoading(true);
    if (!courseFile) return;

    const formData = new FormData();
    formData.append("image", courseFile);
    try {
      const res = await fileUpload(formData);
      setCourseImage(res.data.image);
      setFileLoading(false);
    } catch (err) {
      setFileLoading(false);
      message.error("Failed to upload image");
      console.log(err);
    }
  };

  const handleCourseFile = (e) => {
    setFileLoading(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImg(null);
    }
    if (file) {
      uploadFoodFile(file);
    }
  };

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    const data = {
      name: values?.catName,
      image: courseImage,
      type: values?.catType
    }
    try {
      const res = await createCategory({ data: data }, 'cat');
      if (res?.data) {
        message.success("Category created Successfully");
        form.resetFields();
        fetchData();
        setSelectedImg("");
      }
    } catch (error) {
      setIsProcessing(false);
      message.error("Your category did not create");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit2 = async (values) => {
    const data = {
      name: values?.catName,
      image: courseImage,
      type: values?.catType
    }
    setIsProcessing2(true);
    try {
      const res = await editCategory({ data: data }, 'cat', selectedItem2?._id);
      if (res) {
        message.success("Category updated Successfully");
        fetchData();
        setselectedItem2(null);
        form.resetFields();
        setSelectedImg("");
      }
    } catch (error) {
      setIsProcessing2(false);
      message.error("Your Category did not create");
      console.log(error);
    } finally {
      setIsProcessing2(false);
    }
  };

  const handleClick2 = (row) => {
    setselectedItem2(row);
    setModalOpen(true)
  };

  const fetchData = async () => {
    // setLoading(true);
    // try {
    //   const res = await allCategories('cat', lastId)
    //   if (res?.data) {
    //     setCategories(res?.data?.categories);
    //     setcount(res?.data?.count?.totalPage);
    //   }
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    // fetchData();
  }, [lastId]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };

  // const handleDelete = async () => {
  //   setLoading2(true);
  //   try {
  //     const res = await axiosInstance.delete(`api/cat/${selectedItem?._id}`, {
  //       headers,
  //     });
  //     if (res?.data) {
  //       fetchData();
  //       setShowDelete(false);
  //     }
  //     setLoading2(false);
  //   } catch (error) {
  //     setLoading2(false);
  //     setShowDelete(false);
  //     console.log(error);
  //   } finally {
  //     setLoading2(false);
  //   }
  // };

  const columns = [
    {
      name: "Sub-Admin Name",
      sortable: true,
      selector: (row) => row?.name || 'User',
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row?.name || 'example@example.com',
    },
    {
      name: "Pages",
      allowoverflow: true,
      noSort: true,
      minwidth: "200px",
      cell: (row) => {
        return (
          <div className="flex plusJakara_semibold gap-1">
            {row?.pages || 'Dashboard, Category, Customers, Service Providers,'}
          </div>
        );
      },
    },
    {
      name: "Action",
      allowoverflow: true,
      noSort: true,
      minwidth: "112px",
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#ED5D67",
              }}
              // onClick={() => handleClick2(row)}
              className="bg-[#ED5D67] flex justify-center rounded-3 items-center"
            >
              <img
                style={{ width: "14px", height: "auto" }}
                src={trash}
                alt=""
              />
            </button>
            <button
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#54A6FF",
              }}
              onClick={() => handleClick2(row)}
              className="bg-[#54A6FF] flex justify-center rounded-3 items-center"
            >
              <img
                style={{ width: "14px", height: "auto" }}
                src={edit2}
                alt=""
              />
            </button>
          </div>
        );
      },
    },
    // {
    //   name: "Status",
    //   allowoverflow: true,
    //   cell: (row) => {
    //     return (
    //       <div className="flex gap-1">
    //         {
    //           <button
    //             style={{
    //               backgroundColor:
    //                 row?.status === "active" ? "#d15a5a" : "#06D6A0",
    //             }}
    //             disabled={loadingstatus}
    //             onClick={() => handleUpdate2(row)}
    //             className={`text_white flex justify-center rounded-2 py-1 px-2 items-center relative`}
    //           >
    //             {statusId === row?._id && loadingstatus ? (
    //               <CircularProgress size={15} color="inherit" />
    //             ) : row.status === "active" ? (
    //               "Deactivate now"
    //             ) : (
    //               "Activate now"
    //             )}
    //           </button>
    //         }
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div>
        <main className="lg:container p-4 mx-auto" style={{ minHeight: '90vh' }}>
          <div className="flex justify-between mb-4 gap-2 items-center w-full">
            <h4 className="plusJakara_bold mb-0">Sub-Admins</h4>
            <button onClick={() => setModalOpen(true)} className="bg_primary text_white px-3 py-2 rounded-3 plusJakara_medium">Add</button>
          </div>
          <div className="mt-3 ">
            {loading ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <CircularProgress size={24} className="text_dark" />
              </main>
            ) : !categories || categories.length === 0 ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <span className="text_secondary plusJakara_medium">
                  No Category Found
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
          </div>
        </main>
      </div>

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
          style={{ maxHeight: "30rem" }}
        />
      </Modal>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          className="flex flex-wrap"
          form={form}
          initialValues={{
            catName: selectedItem2?.name,
            catType: selectedItem2?.type,
          }}
          onFinish={isEditMode ? handleSubmit2 : handleSubmit}
        >
          <Col span={24} className="mt-">
            <h5 className="plusJakara_medium mb-3 text-[#252C32]">
              {isEditMode ? "Edit Sub-Admin" : "Add Sub-Admin"}{" "}
            </h5>
            <span className="plusJakara_medium">Sub-Admin Name</span>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the Name",
                },
              ]}
            >
              <Input
                size="large"
                className="plusJakara_regular"
                type="text"
                placeholder="Name"
              />
            </Form.Item>
            <span className="plusJakara_medium">Email</span>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter the Email Address",
                },
                {
                  type: "email",
                  message: "Please enter the valid Email Address",
                },
              ]}
            >
              <Input
                size="large"
                className="plusJakara_regular"
                type="email"
                placeholder="Email address..."
              />
            </Form.Item>
            <span className="plusJakara_medium">Select Pages</span>
            <Select
              options={pagesOptions}
              value={selectPages}
              isMulti
              onChange={handleChange}
              defaultValue={pagesOptions[0]}
            />
          </Col>
          <div className="d-flex w-100 mt-4 justify-content-end">
            <button
              type="submit"
              disabled={isProcessing || isProcessing2}
              className="px-4 py-2 text_white rounded-3 bg_dark plusJakara_medium"
            >
              {isEditMode ? (
                isProcessing2 ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  "Update"
                )
              ) : isProcessing ? (
                <CircularProgress color="inherit" size={16} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SubAdmin;
