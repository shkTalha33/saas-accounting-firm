/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { allfaqs, createFaq, deleteFaq, editFaq } from "../api/faq";

const Faq = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(selectedItem?.title);
    setDescription(selectedItem?.description);
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      description: description,
    };
    setIsProcessing(true);
    if (selectedItem) {
      try {
        const res = await editFaq({ data: formData }, selectedItem?._id);
        if (res?.status === 201) {
          message.success("Faq Updated Successfully");
          fetchData();
          setShowModal(false);
          setDescription("");
          setTitle("");
        } else {
          message.error("Failed to Update Faq");
          setShowModal(false);
          setDescription("");
          setTitle("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      try {
        const res = await createFaq({ data: formData });
        if (res?.status === 201) {
          message.success("Faq create Successfully");
          fetchData();
          setShowModal(false);
          setDescription("");
          setTitle("");
        } else {
          message.error("Failed to create Faq");
          setShowModal(false);
          setDescription("");
          setTitle("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    }
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    setIsProcessing2(true);
    try {
      const res = await deleteFaq(selectedItem?._id)
      if (res?.data) {
        fetchData();
        setShowDelete(false);
        setSelectedItem(null)
        message.success("Faq deleted Successfully");
      }
    } catch (error) {
      setIsProcessing2(false);
      console.log(error);
    } finally {
      setIsProcessing2(false);
    }
  };

  const handleClick = (item) => {
    setSelectedItem(item);
    setShowDelete(true);
  };

  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleCKEditor = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await allfaqs(lastId)
      if (res?.data) {
        if (lastId === 1) {
          setFaqs(res?.data?.Faqs);
        } else {
          setFaqs((prevfaqs) => [
            ...prevfaqs,
            ...res?.data?.Faqs,
          ]);
        }
        setcount(res?.data?.count?.totalPage || 0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setLastId2(lastId);
    setLastId(lastId + 1);
  };

  useEffect(() => {
    fetchData();
  }, [lastId]);

  return (
    <main className="min-h-screen lg:container py-4 px-4 mx-auto">
      <div className="flex justify-between gap-3 items-center w-full">
        <div className="flex flex-col mb-5 w-full">
          <h2 className="plusJakara_bold text_black">All FAQs</h2>
          <h6 className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </h6>
        </div>
        <button
          onClick={() => {
            setShowModal(true)
            setSelectedItem(null)
          }}
          style={{ width: "150px" }}
          className="bg_primary py-3 rounded-3 text_white plusJakara_semibold"
        >
          Add FAQ
        </button>
      </div>
      {loading ? (
        <main className="my-5 d-flex w-100 justify-content-center align-items-center">
          <CircularProgress size={24} className="text_dark" />
        </main>
      ) : !faqs || faqs.length === 0 ? (
        <main className="my-5 d-flex w-100 justify-content-center align-items-center">
          <span className="text_secondary plusJakara_medium">No FAQ Found</span>
        </main>
      ) : (
        <>
          <div className="accordion d-flex flex-column gap-3">
            {faqs.map((item, i) => (
              <Accordion key={i}>
                <Accordion.Item className="w-100" eventKey={i + 1}>
                  <Accordion.Header className="w-100">
                    <h5 className="inter_medium text_black">{item?.title}</h5>
                  </Accordion.Header>
                  <Accordion.Body className="w-100 flex flex-col gap-1">
                    <span
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                      className="text_dark inter_regular"
                    ></span>
                    <div className="flex gap-3 w-full mt-3">
                      <Button
                        style={{ width: "fit-content" }}
                        onClick={() => handleShow(item)}
                        variant="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ width: "fit-content" }}
                        onClick={() => handleClick(item)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
            {lastId < count && (
              <div className="flex justify-center w-full">
                <button
                  onClick={handleShowMore}
                  className="bg_primary py-3 px-4 rounded-3 text_white plusJakara_semibold"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <Modal size="lg" centered show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Body>
          <Modal.Header closeButton />
          <Form
            onSubmit={handleSubmit}
            className="w-full bg_white rounded-3 shadow-md"
          >
            <Form.Group className="shadow_def p-3 w-full">
              <Form.Label className="plusJakara_semibold text_dark">
                Faq Title
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "10px 20px" }}
                className="custom_control rounded-3 plusJakara_regular text_secondarydark bg_white shadow-sm border"
                placeholder="Enter Faq title"
              />
            </Form.Group>
            <hr style={{ color: "#f4f4f4", margin: "3px" }} />
            <Form.Group className="shadow_def px-3 mb-3">
              <Form.Label className="plusJakara_semibold text_dark">
                Faq Description
              </Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description || ""}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "ckfinder",
                    "|",
                    "mediaEmbed",
                    "insertTable",
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "|",
                    "undo",
                    "redo",
                  ],
                }}
                onChange={handleCKEditor}
              />
            </Form.Group>
            <div className="flex justify-content-end my-4 w-100">
              {!isProcessing ? (
                <button
                  type="submit"
                  className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                >
                  <span className="plusJakara_semibold text_white">
                    {selectedItem ? 'Update Faq' : 'Create Faq'}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessing}
                  className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                >
                  <CircularProgress size={18} className="text_white" />
                </button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {selectedItem && (
        <Modal
          centered
          show={showDelete}
          onHide={() => setShowDelete(false)}
          footer={null}
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <h5 className="text_dark manrope_bold">
              Are you sure you want to delete this Faq?
            </h5>
            <div className="flex justify-center gap-3 w-100 my-4">
              <button
                type="button"
                disabled={isProcessing2}
                style={{ padding: '12px 24px' }}
                className={`bg_dark text_white w-100 rounded-3 gap-1 manrope_medium text-sm flex justify-center items-center`}
                onClick={handleDelete}
              >
                {isProcessing2 ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                type="button"
                style={{ padding: '12px 24px' }}
                className={`border bg_white text_dark bg_white cursor-pointer w-100 rounded-3 gap-1 manrope_medium text-sm flex justify-center items-center`}
                onClick={() => setShowDelete(false)}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </main>
  );
};

export default Faq;
