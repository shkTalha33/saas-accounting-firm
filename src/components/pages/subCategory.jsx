/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { Col, Form, Input, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { allCategories, createCategory, editCategory, updateCategory } from "../api/category";
import ProductTable from "../DataTable/productTable";
import { edit2 } from "../icons/icon";
const SubCategory = () => {
  // states-------
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [statusId, setstatusId] = useState("");
  const [lastId2, setLastId2] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setselectedItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [count, setcount] = useState(0);
  const [selectedItem2, setselectedItem2] = useState(null);
  const [loadingstatus, setloadingstatus] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItem2) {
      form.setFieldsValue({
        subCatName: selectedItem2?.name,
        catName: selectedItem2?.category?._id,
      });
      setIsEditMode(true);
    } else {
      form.setFieldsValue({
        catName: '',
        subCatName: '',
      })
      setIsEditMode(false);
    }
  }, [selectedItem2, form]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditMode(false)
    setselectedItem2(null);
    form.setFieldsValue({
      catName: '',
      subCatName: '',
    })
    form.setFieldsValue({
      subCatName: "",
      catType: "",
      catName: "",
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
      const res = await updateCategory('subcat', newStatus, row?._id);
      if (res) {
        message.success(`Category ${newStatus === 'deactivated' ? 'Deactivated' : 'Activated'} successfully`);
        const updatedCategories = subCategories.filter(item =>
          !(item._id === row._id && newStatus === "deactivated")
        );
        setSubCategories(updatedCategories);
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

  useEffect(() => {
    setLoading2(true);
    const fetchCategories = async () => {
      try {
        const res = await allCategories('category', 1);
        if (res?.data) {
          const formattedCategories = res.data.categories.map((category) => ({
            label: category.name,
            value: category._id,
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading2(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    const data = {
      name: values?.subCatName,
      category: values?.catName
    }
    try {
      const res = await createCategory({ data: data }, 'subcat');
      if (res?.data) {
        console.log(res);
        message.success("Category created Successfully");
        setSubCategories([...subCategories, res.data?.category])
        form.setFieldsValue({
          catName: '',
          subCatName: '',
        })
        setModalOpen(false)
      }
    } catch (error) {
      setIsProcessing(false);
      message.error("Your sub-category did not create");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit2 = async (values) => {
    const data = {
      name: values?.subCatName,
      category: values?.catName
    };
    setIsProcessing2(true);
    try {
      const res = await editCategory({ data: data }, 'subcat', selectedItem2?._id);
      if (res.data) {
        message.success("Sub-category updated successfully");
        const updatedCategories = subCategories.map(category =>
          category._id === selectedItem2?._id ? res.data?.category : category
        );
        setSubCategories(updatedCategories);
        setModalOpen(false);
        setselectedItem2(null);
        form.setFieldsValue({
          catName: '',
          subCatName: '',
        })
      }
    } catch (error) {
      message.error("Your sub-category did not update");
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
      const res = await allCategories('subcat', lastId)
      if (res?.data) {
        setSubCategories(res?.data?.categories);
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

  const columns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row?.category?.name,
    },
    {
      name: "Sub Category",
      sortable: true,
      selector: (row) => row?.name,
    },
    {
      name: "Status",
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
            <h4 className="manrope_bold mb-0">Sub-categories List</h4>
            <button onClick={() => setModalOpen(true)} className="bg_primary text_white px-3 py-2 rounded-3 manrope_medium">Create Sub-category</button>
          </div>
          <div className="mt-3 ">
            {loading ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <CircularProgress size={24} className="text_dark" />
              </main>
            ) : !subCategories || subCategories.length === 0 ? (
              <main className="my-5 d-flex w-100 justify-content-center align-items-center">
                <span className="text_secondary manrope_medium">
                  No sub-category Found
                </span>
              </main>
            ) : (
              <ProductTable
                count={count}
                loading={loading}
                setCurrentPage={setLastId2}
                currentPage={lastId2}
                columns={columns}
                data={subCategories}
                setLastId={setLastId}
              />
            )}
          </div>
        </main>
      </div>

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
            subCatName: selectedItem2?.name,
            catName: selectedItem2?.category?._id,
            catType: selectedItem2?.type,
          }}
          onFinish={isEditMode ? handleSubmit2 : handleSubmit}
        >
          <Col span={24} className="mt-3">
            <h6 className="manrope_medium text-[#252C32]">
              {isEditMode ? "Edit Sub-category" : "Add Sub-category"}{" "}
            </h6>
            <Form.Item
              name="catName"
              className="mt-2 mb-[20px]"
              rules={[
                {
                  required: true,
                  message: "Please select Category Name",
                },
              ]}
            >
              <Select
                size="large"
                options={categories}
                loading={loading2}
                placeholder="Select a Category"
              />
            </Form.Item>
            <Form.Item
              name="subCatName"
              className="mt-2 mb-[20px]"
              rules={[
                {
                  required: true,
                  message: "Please enter the sub-Category Name",
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
          Are you want to delete this sub-category?
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

export default SubCategory;