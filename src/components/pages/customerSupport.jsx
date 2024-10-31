/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { StyleSheetManager } from 'styled-components';
import { updateSupport } from '../api/support';
import ProductTable from '../DataTable/productTable';

const userOptions = [
    { value: "all", label: "All" },
    { value: "customers", label: "Customers" },
    { value: "serviceProviders", label: "Service Providers" },
];


const CustomerSupport = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false)
    const [usertype, setUserType] = useState(userOptions[0]);
    const [lastId, setLastId] = useState(1);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [lastId2, setLastId2] = useState(0);
    const [selectItem, setselectItem] = useState(null)
    const [openModal, setopenModal] = useState(false)
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState([1, 2, 3])

    const handleChange = (selectedOption) => {
        setUserType(selectedOption);
    };


    const handleClick = (row) => {
        setselectItem(row)
        setopenModal(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const data = {
            title: title,
            description: description,
        }
        try {
            const res = await updateSupport({ data: data }, selectItem?._id)
            if (res.status === 200) {
                message.success('Message Attend Successfully')
                fetchData()
                setopenModal(false)
            } else {
                message.error('Failed to Attend Message')
                setopenModal(false)
            }
        } catch (error) {
            console.log(error);
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    }

    const columns = [
        {
            name: "User Name",
            sortable: true,
            selector: (row) => !row?.name ? 'User Not found' : row?.name
        },
        {
            name: "Email",
            sortable: true,
            selector: (row) => !row?.email ? 'Not found' : row?.email
        },
        {
            name: "Message",
            sortable: true,
            selector: (row) => row?.msg || 'Message'
        },
        {
            name: 'Status',
            sortable: true,
            cell: (row) => {
                return (
                    row?.attended === true ?
                        <button disabled style={{ backgroundColor: '#ecf8f0', color: '#1C8C6E', padding: '6px 12px' }} className="plusJakara_medium rounded text-center h-auto">
                            {row?.attended === true ? 'Attended' : 'Not attended'}
                        </button> :
                        <button disabled={isProcessing} onClick={() => handleClick(row)} style={{ backgroundColor: '#2B7F75', padding: '6px 20px' }} className="text_white flex justify-center rounded-3 items-center">Attend</button>
                )
            }
        },
        // {
        //     name: 'Action',
        //     allowoverflow: true,
        //     cell: () => {
        //         return (
        //             <div className='flex gap-1'>
        //                 <button className="bg-[#2B7F75] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><Edit size={14} className='text_white' /></button>
        //             </div>
        //         )
        //     }
        // }
    ]



    const fetchData = async () => {
        // setLoading(true);
        // try {
        //     const res = await getAllSupports(lastId);
        //     if (res?.data) {
        //         setCategories(res?.data?.Messages);
        //         setCount(res?.data?.count?.totalPage);
        //     }
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setLoading(false);
        // }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [lastId]);

    return (
        <StyleSheetManager shouldForwardProp={(prop) => !['sortActive'].includes(prop)}>
            <main className="lg:container p-4 mx-auto" style={{ minHeight: '90vh' }}>
                <div className="d-flex mb-4 align-items-center justify-content-between">
                    <h4 className="manrope_bold text_black">Customer Support</h4>
                    <div style={{ width: "200px" }}>
                        <Select
                            options={userOptions}
                            value={usertype}
                            onChange={handleChange}
                            defaultValue={userOptions[0]}
                        />
                    </div>
                </div>
                {loading ? <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                    <CircularProgress size={24} className='text_dark' />
                </main> :
                    !categories || categories.length === 0 ?
                        <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                            <span className="text_secondary plusJakara_medium">No data Found</span>
                        </main> :
                        <ProductTable
                            loading={loading}
                            count={count}
                            setCurrentPage={setLastId2}
                            currentPage={lastId2}
                            columns={columns}
                            data={categories}
                            setLastId={setLastId}
                        />
                }
            </main>


            <Modal
                open={openModal}
                onCancel={() => setopenModal(false)}
                footer={null}
                closeIcon
                centered
            // width={400}
            >
                <Form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-2 w-100">
                        <Form.Group className="shadow_def w-full">
                            <Form.Label className="manrope_semibold text_dark">
                                Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                // value={question}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ padding: "10px 20px" }}
                                className="custom_control rounded-3 manrope_regular text_secondarydark bg_white shadow-sm border"
                                placeholder="Enter Title..."
                            />
                        </Form.Group>
                        <Form.Group className="shadow_def w-full">
                            <Form.Label className="manrope_semibold text_dark">
                                Description
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                // value={question}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ padding: "10px 20px" }}
                                className="custom_control rounded-3 manrope_regular text_secondarydark bg_white shadow-sm border"
                                placeholder="Enter Description..."
                            />
                        </Form.Group>
                    </div>
                    <div className="flex justify-end my-3 w-full">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            style={{ padding: '12px 24px' }}
                            className={`bg_primary text_white w-100 rounded-3 inter_medium flex justify-center items-center`}
                        >
                            {isProcessing ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                "Attend"
                            )}
                        </button>
                    </div>
                </Form>
            </Modal>

        </StyleSheetManager>
    )
}

export default CustomerSupport;