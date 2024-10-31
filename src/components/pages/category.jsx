/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Input as InputStrap } from "reactstrap";
import { cleaning, edit2, fileavatar, painting, plumbing } from "../icons/icon";
// import { createCategory, getCategory } from "../api/category";
import { CircularProgress } from "@mui/material";
import { allCategories, createCategory, editCategory, updateCategory } from "../api/category";
import { fileUpload } from "../api/fileUpload";
import ProductTable from "../DataTable/productTable";
import ImageLoader from "./ImageLoader/ImageLoader";
import { Trash2 } from "react-feather";
const Category = () => {
  // states-------
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [statusId, setstatusId] = useState("");
  const [lastId2, setLastId2] = useState(0);
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

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false)
    setselectedItem2(null);
    form.resetFields();
    form.setFieldsValue({
      catName: "",
      catType: "",
    })
  }

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
      const res = await updateCategory('category', newStatus, row?._id);
      if (res) {
        message.success(`Category ${newStatus === 'deactivated' ? 'Deactivated' : 'Activated'} successfully`);
        const updatedCategories = categories.filter(item =>
          !(item._id === row._id && newStatus === "deactivated")
        );
        setCategories(updatedCategories);
        setShowDelete(false);
      } else {
        message.error("Status not updated");
      }
    } catch (error) {
      message.error("An error occurred while updating");
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

  const handleFileChange = (e) => {
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
    }
    try {
      const res = await createCategory({ data: data }, 'category');
      if (res?.data) {
        console.log(res);
        message.success("Category created Successfully");
        setCategories([...categories, res.data?.category])
        form.resetFields();
        setModalOpen(false)
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
    };
    setIsProcessing2(true);
    try {
      const res = await editCategory({ data: data }, 'category', selectedItem2?._id);
      if (res.data) {
        message.success("Category updated successfully");
        const updatedCategories = categories.map(category =>
          category._id === selectedItem2?._id ? res.data?.category : category
        );
        setCategories(updatedCategories);
        setModalOpen(false);
        setselectedItem2(null);
        form.resetFields();
        setSelectedImg("");
      }
    } catch (error) {
      message.error("Your category did not update");
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
    setLoading(true);
    try {
      const res = await allCategories('category', lastId)
      if (res?.data) {
        setCategories(res?.data?.categories);
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };

  const columns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row?.name,
    },
    {
      name: "Icon",
      sortable: true,
      cell: (row) => {
        return (
          <div>
            <ImageLoader
              circeltrue={true}
              imageUrl={row?.image}
              onClick={() => handleImageClick(row?.image)}
              classes={"rounded-5 catIm00 radius20"}
            />
          </div>
        );
      },
    },
    {
      name: "Status",
      minWidth: "132px",
      maxWidth: "152px",
      allowoverflow: true,
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <div
              style={{ backgroundColor: "#f4f7f2" }}
              className="rounded-2 px-2 py-1 text-sm plusJakara_medium">{row?.status}</div>
          </div>
        );
      },
    },
    {},
    {
      name: "Action",
      allowoverflow: true,
      noSort: true,
      minWidth: "132px",
      maxWidth: "152px",
      cell: (row) => {
        return (
          <div className="flex gap-1">
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
            <button
              style={{
                backgroundColor: "#d15a5a",
              }}
              onClick={() => handleClick(row)}
              className={`text_white flex justify-center rounded-2 p-1 items-center relative`}>
              <Trash2 size={14} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <main className="lg:container p-4 mx-auto" style={{ minHeight: '90vh' }}>
          <div className="flex justify-between mb-4 gap-2 items-center w-full">
            <h4 className="manrope_bold mb-0">Categories List</h4>
            <button onClick={() => setModalOpen(true)} className="bg_primary text_white px-3 py-2 rounded-3 manrope_medium">Create Category</button>
          </div>
          <div className="mt-3 ">
            {loading ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <CircularProgress size={24} className="text_dark" />
              </main>
            ) : !categories || categories.length === 0 ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <span className="text_secondary manrope_medium">
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
          style={{ maxHeight: "24rem" }}
        />
      </Modal>

      <Modal
        open={modalOpen}
        maskClosable={false}
        onCancel={handleCloseModal}
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
            <h6 className="manrope_medium text-[#252C32]">
              {isEditMode ? "Edit Category" : "Add Category"}{" "}
            </h6>
            <div className="flex flex-col mb-3 gap-2">
              <div>
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="fileInput"
                  className="cursor-pointer"
                >
                  {fileLoading ? (
                    <div
                      style={{ width: "120px", height: "100px" }}
                      className="border rounded-3 d-flex justify-content-center align-items-center"
                    >
                      <CircularProgress size={20} />
                    </div>
                  ) : selectedImg ? (
                    <img
                      src={selectedImg}
                      alt="Preview"
                      style={{
                        width: "120px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      className="rounded-3 object-cover"
                    />
                  ) : (
                    <div
                      style={{ width: "120px", height: "100px" }}
                      className="border rounded-3 flex justify-center items-center"
                    >
                      <img src={fileavatar} alt="Camera Icon" />
                    </div>
                  )}
                </label>
                <InputStrap
                  type="file"
                  // required
                  id="fileInput"
                  className="visually-hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <Form.Item
              name="catName"
              className="mt-2 mb-[20px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the Category Name",
                },
              ]}
            >
              <Input
                size="large"
                className="manrope_regular"
                type="text"
                placeholder="Category Name"
              />
            </Form.Item>
          </Col>
          <div className="d-flex w-100 justify-content-end">
            <button
              type="submit"
              disabled={fileLoading || isProcessing || isProcessing2}
              className="px-4 py-2 text_white rounded-3 bg_dark manrope_medium"
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

      <Modal
        open={showDelete}
        centered
        onCancel={() => setShowDelete(false)}
        footer={null}
      >
        <h6 className="text_dark manrope_medium">
          Are you want to delete this category?
        </h6>
        <div className="flex justify-center gap-2 w-full my-3">
          <button
            type="button"
            className={`border cursor-pointer rounded-lg gap-1 px-3 py-2 inter_medium text-sm flex justify-center items-center bg_white text_secondary`}
            onClick={() => setShowDelete(false)}
          >
            No
          </button>
          <button
            type="button"
            disabled={loadingstatus}
            className={`border rounded-lg gap-1 px-3 py-2 inter_medium text-sm flex justify-center items-center bg_primary text_white`}
            onClick={() => handleUpdate2(selectedItem)}
          >
            {loadingstatus ? <CircularProgress size={14} color="inherit" /> : "Yes"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Category;
