/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ProductTable from "../DataTable/productTable";
import { dataTable } from "../DataTable/productsData";
import { avatarman, preview, trash } from "../icons/icon";
import { StyleSheetManager } from "styled-components";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { message as antdMessage } from "antd";
import { Form, Modal } from "react-bootstrap";

const HelpSupport = () => {
  const [loading, setLoading] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState("");
  const [messageDetail, setMessageDetail] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleClick = (row) => {
    setIsOpen(true);
    setSelectItem(row);
  };

  const columns = [
    {
      name: "User Name",
      sortable: true,
      selector: (row) => row?.name,
      minWidth: "110px",
      maxWidth: "200px",
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "110px",
      maxWidth: "200px",
      selector: (row) => row?.email,
    },
    {
      name: "Message",
      allowoverflow: true,
      minWidth: "110px",
      maxWidth: "200px",
      cell: (row) => {
        return (
          <div className="flex items-center gap-1">
            <span className="text_dark plusJakara_semibold">{row?.msg}</span>
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
          <div className="flex items-center gap-1">
            {row?.attended === true ? (
              <button
                style={{
                  backgroundColor: "#d3d3d3",
                }}
                disabled
                className={`text_dark flex justify-center rounded-3 py-1 px-2 items-center relative`}
              >
                Attended
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "#06D6A0",
                }}
                disabled={loading2}
                onClick={() => handleClick(row)}
                className={`text_white flex justify-center rounded-3 py-1 px-2 items-center relative`}
              >
                Reply
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const handleUpdate = async (e, item) => {
    e.preventDefault();
    setStatusId(item?._id);

    setLoading2(true);
    // try {
    //   const res = await axiosInstance.put(
    //     `api/support/attended/${item._id}`,
    //     {
    //       answer: message,
    //     },
    //     { headers }
    //   );

    //   if (res?.data) {
    //     antdMessage.success("Support updated successfully");
    //     setIsOpen(false);
    //     fetchData();
    //   }
    // } catch (error) {
    //   setLoading2(false);
    //   console.log(error);
    // } finally {
    //   setLoading2(false);
    // }
  };

  const fetchData = async () => {
    setLoading(true);
    // try {
    //   const res = await axiosInstance.get(
    //     `api/support/admin/${lastId}`,
    //     { headers }
    //   );
    //   if (res?.data) {
    //     setCategories(res?.data?.Messages);
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
    fetchData();
  }, [lastId]);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-5 px-4 mx-auto">
        <div className="flex flex-col mb-3 w-full">
          <h2 className="manrope_bold text_black">All Users</h2>
          <h6 className="text_secondary manrope_regular">
            Information about your current plan and usages
          </h6>
        </div>
        {loading ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <CircularProgress size={24} className="text_dark" />
          </main>
        ) : !categories || categories.length === 0 ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <span className="text_secondary manrope_medium">No User Found</span>
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

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form className="flex flex-col gap-2">
            <h5 className="manrope_bold text_black">Send Message</h5>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
              style={{ padding: "10px 20px" }}
              className="custom_control rounded-3 plusJakara_regular text_secondarydark bg_white shadow-sm border"
              placeholder="Send Message..."
            />
            <button
              onClick={(e) => handleUpdate(e, selectItem)}
              disabled={loading2}
              className="bg_primary text_white rounded-3 px-3 py-2"
            >
              {statusId === selectItem?._id && loading2 ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                "Send"
              )}
            </button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={messageDetail} onHide={() => setMessageDetail(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form className="flex flex-col gap-2">
            <p className="text_dark manrope_medium">{selectItem?.reason}</p>
          </Form>
        </Modal.Body>
      </Modal>
    </StyleSheetManager>
  );
};

export default HelpSupport;
