/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css';
// import * as Yup from "yup"
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { FaArrowLeft, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { IoIosCheckmarkCircle, IoMdCheckboxOutline } from 'react-icons/io';
import { MdEmail, MdOutlineShoppingCart } from 'react-icons/md';
import { TbProgress } from 'react-icons/tb';
import { Label } from 'reactstrap';
import { calculateFinalPrice } from '../common/calculateFinalPrice';
import LabourMaterialTableDesign from '../common/labourMaterialTableDesign';
import ProductTable from '../DataTable/productTable';
import { avatarman } from '../icons/icon';

const OrderDetail = ({ showButtons = true }) => {
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEmployee, setselectedEmployee] = useState(null)
    const [selectedEmployeeSummary, setselectedEmployeeSummary] = useState([])
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalOpen2, setmodalOpen2] = useState(false)
    const [selectedItem, setselectedItem] = useState(null)
    const [orderData, setOrderData] = useState(state?.orderData || null)
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleAssignOrder = (row) => {
        setmodalOpen(true)
        setselectedItem(row)
    }
    // const handleSelectEmployee = async (row) => {
    //     setselectedEmployee(row)
    //     setmodalOpen2(true)
    //     await getEmployeeSummary(orderData?._id, row?.user?._id).then((res) => {
    //         if (res.data?.success) {
    //             setselectedEmployeeSummary(res.data?.checkIns);
    //         } else {
    //             setselectedEmployeeSummary([]);
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    useEffect(() => {
        if (orderData?.service?.features) {
            const total = orderData?.service?.features?.reduce((sum, feature) => sum + (feature.totalPrice || 0), 0);
            setGrandTotal(total);
        }
    }, [orderData])

    const columns = [
        {
            name: 'Service Name',
            sortable: true,
            minWidth: '580px',
            maxWidth: '580px',
            cell: row => (<span className='plusJakara_medium text-[16px]'>{row.title}</span>)
        },
        {
            name: 'Units',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            // maxWidth: '250px',
            selector: row => row.unit
        },
        {
            name: 'Unit Type',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            // maxWidth: '250px',
            selector: row => row.unitType
        },
        {
            name: 'Price',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            // maxWidth: '250px',
            selector: row => '$ ' + row.price
        },
        {
            name: 'Total Price',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            cell: row => (<span className='plusJakara_medium'>${row.totalPrice}</span>)
        },
    ]

    const workInProgress = orderData?.assign_users?.find((item, i) => item.status === 'pending')

    const handleCreateInvoice = (row) => {
        navigate(`/orders/invoice/${row?._id}`, { state: { invoiceData: row } })
    };

    return (
        <main className={`py-5 w-full`}>
            {!orderData ? (
                <div className="flex justify-center w-full items-center my-5">
                    <CircularProgress size={24} style={{ color: 'black' }} />
                </div>
            ) : (
                <Container className='bg_white rounded-3 p-4 w-full'>
                    <div className="flex gap-4 items-center justify-between w-full mb-4">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex gap-4 mb-3 items-center w-full">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg_primary rounded-3 p-2"
                                >
                                    <FaArrowLeft className='text_white' />
                                </button>
                                <h4 className="text_primary mb-0 plusJakara_semibold">Order Detail</h4>
                            </div>
                            <div className="flex gap-3 items-start w-full">
                                <img src={(orderData?.user?.profilePicture || orderData?.to_id?.profilePicture)} style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: '12px' }} alt="" />
                                <div className="flex flex-col w-full">
                                    <h5 className="text_black plusJakara_semibold">{(orderData?.user?.name || orderData?.to_id?.name)}</h5>
                                    <div className="flex gap-2 items-center">
                                        <FaLocationDot className='text_primary' />
                                        <span className="text_secondary2 whitespace-nowrap plusJakara_medium">{(orderData?.user?.address || orderData?.to_id?.address)}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaPhone className='text_primary' />
                                        <span className="text_secondary2 plusJakara_medium">{(orderData?.user?.phone || orderData?.to_id?.phone)}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <MdEmail className='text_primary' />
                                        <span className="text_secondary2 plusJakara_medium">{(orderData?.user?.email || orderData?.to_id?.email)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ color: "#828282" }} />
                    <div className="flex mt-4 flex-wrap gap-3 flex-col flex-md-nowrap justify-between w-full">
                        <div className="flex gap-3 items-center justify-between w-full">
                            <Col xs={24} md={11} xl={14}>
                                <div className="flex justify-between gap-5 items-center flex-wrap">
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Order Status</h6>
                                        <div className="px-2 py-1 w-fit text-center rounded-2" style={{ backgroundColor: '#E6E9F4', color: '#5A607F' }}>
                                            <span className="plusJakara_bold">{orderData?.status === 'pending' ? 'On Going' : orderData?.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Order No</h6>
                                        <div className="px-2 py-1 w-fit text-center rounded-2" style={{ backgroundColor: '#f6911e1b' }}>
                                            <span className="plusJakara_medium text_primary2">#{orderData?.order_id}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Booking Date</h6>
                                        <span className="text_black plusJakara_bold">{moment(orderData?.bookingDate).format('ddd DD MMM YYYY')}</span>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <hr style={{ color: "#828282" }} />
                        <div className="flex flex-col mb-5 gap-3">
                            <h4 className="text_black plusJakara_semibold">Assigned Employees</h4>
                            <Col xs={24} sm={18} md={12}>
                                <div className="flex flex-col gap-2 items-start w-full">
                                    {orderData?.assign_users?.map((item, i) => (
                                        <div key={i} className="flex justify-between p-3 rounded-3 shadow-sm border gap-3 w-full items-center">
                                            <div className="flex gap-3 items-start">
                                                <img src={item?.user?.profilePicture || avatarman} style={{ borderRadius: '50%', objectFit: 'cover', width: '45px', height: "45px" }} alt="" />
                                                <div className="flex flex-col items-start">
                                                    <h5 className="plusJakara_semibold mb-0 text_primary">{item?.user?.name}</h5>
                                                    <h6 className="plusJakara_regular text_secondary">{item?.task[0]?.labourName},...</h6>
                                                </div>
                                            </div>
                                            <button
                                                // onClick={() => handleSelectEmployee(item)}
                                                className="bg_primary text_white h-fit plusJakara_medium rounded-2 px-3 py-2 text-sm">View Tasks</button>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </div>
                        <Col xs={24} md={11} xl={18}>
                            <div className="flex flex-col mb-5 gap-3">
                                <h4 className="text_black plusJakara_semibold">Order Progress</h4>
                                <div className="flex flex-col w-full gap-4">
                                    <Col xs={24} xl={12}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex gap-3 w-full items-center">
                                                <div className="bg_light rounded-5 flex justify-center items-center" style={{ width: '60px', height: '60px' }}>
                                                    <MdOutlineShoppingCart size={24} className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'}`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h5 className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'} plusJakara_semibold`}>Order Assign</h5>
                                                    <h6 className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'} line-clamp-1 plusJakara_regular`}>Order Assigned to Employees</h6>
                                                </div>
                                            </div>
                                            <IoIosCheckmarkCircle size={34} className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'}`} />
                                        </div>
                                    </Col>
                                    <Col xs={24} xl={12}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg_light rounded-5 flex justify-center items-center" style={{ width: '60px', height: '60px' }}>
                                                    <TbProgress size={24} className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'}`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h5 className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'} plusJakara_semibold`}>Order In Progress</h5>
                                                    <h6 className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'} line-clamp-1 plusJakara_regular`}>Employees working on assigned order</h6>
                                                </div>
                                            </div>
                                            <IoIosCheckmarkCircle size={34} className={`${orderData?.assign_users.length === 0 ? 'text_secondary2' : 'text_primary'}`} />
                                        </div>
                                    </Col>
                                    <Col xs={24} xl={12}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg_light rounded-5 flex justify-center items-center" style={{ width: '60px', height: '60px' }}>
                                                    <IoMdCheckboxOutline size={24} className={`${workInProgress ? 'text_secondary2' : 'text_primary'}`} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h5 className={`${workInProgress ? 'text_secondary2' : 'text_primary'} plusJakara_semibold`}>Order Completed</h5>
                                                    <h6 className={`${workInProgress ? 'text_secondary2' : 'text_primary'} line-clamp-1 plusJakara_regular`}>Employee has completed the Order</h6>
                                                </div>
                                            </div>
                                            <IoIosCheckmarkCircle size={34} className={`${workInProgress ? 'text_secondary2' : 'text_primary'}`} />
                                        </div>
                                    </Col>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h5 className="text_primary mb-3 plusJakara_semibold">Description</h5>
                                <h6 className="text_secondary plusJakara_regular">{orderData?.estimate?.description || orderData?.service?.description}</h6>
                            </div>
                        </Col>
                    </div>
                    <hr style={{ color: "#828282" }} />
                    {orderData?.estimate ?
                        <div className="flex mb-4 flex-col w-full gap-1">
                            <Label
                                className="form-label text_secondary2 plusJakara_medium"
                                htmlFor="scheduling"
                            >
                                Scheduling
                            </Label>
                            <div className="flex justify-between flex-wrap gap-3 w-full">
                                {orderData?.estimate?.labour?.map((category, index) => (
                                    <div key={index} className="w-full md:w-[48%] bg_light border rounded-3 px-3 py-2 flex justify-between items-center">
                                        <div className="flex flex-col w-full gap-1">
                                            <h6 className="text_secondary2 mb-0 w-full text-sm plusJakara_semibold">LABOUR</h6>
                                            <h6 className="text_primary mb-0 w-full plusJakara_bold">{category?.labourName}</h6>
                                        </div>
                                        <div className="flex gap-2 items-center w-full justify-end">
                                            <span className="text_secondary2 text-sm whitespace-nowrap plusJakara_medium">
                                                {moment(category?.startDate).format('ddd DD MMM YYYY')}
                                            </span>
                                            <span className="text_black text-sm plusJakara_bold">TO</span>
                                            <span className="text_secondary2 text-sm whitespace-nowrap plusJakara_medium">
                                                {moment(category?.endDate).format('ddd DD MMM YYYY')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> : null}
                    {orderData?.estimate ?
                        <LabourMaterialTableDesign
                            labour={orderData?.estimate?.labour}
                            material={orderData?.estimate?.material}
                            dis_price={orderData?.estimate?.dis_price}
                            tax={orderData?.estimate?.tax}
                        /> :
                        <div className="flex flex-col">
                            <h5 className="plusJakara_semibold mb-3 text_dark">Services:</h5>
                            <div className="w-full flex flex-col gap-3 mb-4">
                                <ProductTable columns={columns} data={orderData?.service?.features} />
                                <div className="flex flex-col gap-2 items-end justify-end w-full">
                                    <div className="flex w-full justify-end">
                                        <div className="flex justify-between" style={{ width: '250px' }}>
                                            <h6 className="text_secondary2 mb-0 plusJakara_semibold">Sub Total </h6>
                                            <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                                ${orderData?.service?.features?.reduce((sum, feature) => sum + (feature.totalPrice || 0), 0)}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-end">
                                        <div className="flex justify-between" style={{ width: '250px' }}>
                                            <h6 className="text_secondary2 mb-0 plusJakara_semibold">Discount ({orderData?.service?.dis_price || 0}%)</h6>
                                            <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                                ${grandTotal * parseInt(orderData?.service?.dis_price) / 100}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-end">
                                        <div className="flex justify-between" style={{ width: '250px' }}>
                                            <h6 className="text_secondary2 mb-0 plusJakara_semibold">Tax ({orderData?.service?.tax || 0}%)</h6>
                                            <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                                ${grandTotal * parseInt(orderData?.service?.tax) / 100}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex mt-3 w-full justify-end">
                                        <div className="flex justify-between" style={{ width: '250px' }}>
                                            <h5 className="text_primary mb-0 plusJakara_semibold">Total Price </h5>
                                            <h5 className="text_black plusJakara_semibold mb whitespace-nowrap-0">
                                                ${calculateFinalPrice(grandTotal,
                                                    parseInt(orderData?.service?.dis_price) || 0,
                                                    parseInt(orderData?.service?.tax) || 0)}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </Container >)}

            <Modal
                centered
                open={modalOpen2}
                footer={null}
                width={850}
                zIndex={9999}
                onCancel={() => setmodalOpen2(false)}
            >
                <div className="flex w-full gap-2 items-center flex-col" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <h4 className="text_primary text-center mb-4 plusJakara_bold">Task Details</h4>
                    {selectedEmployee?.map}
                </div>
            </Modal>
        </ main>
    );
};

export default OrderDetail;