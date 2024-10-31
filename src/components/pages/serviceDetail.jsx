/* eslint-disable no-unused-vars */
import { Col } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaArrowLeft, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import DTables from '../DataTable/DTable';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { calculateFinalPrice } from '../common/calculateFinalPrice';
import '../styles/swiper.css';
import { MdEmail } from 'react-icons/md';

const ServiceDetail = () => {
    const { state } = useLocation()
    const { searchParams } = useSearchParams()
    const serviceDetail = state?.serviceDetail || null
    const navigate = useNavigate()
    const [selectedDates, setSelectedDates] = useState([]);
    const [highlightedDate, setHighlightedDate] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);

    const columns = [
        {
            name: 'Service Name',
            sortable: true,
            minWidth: '680px',
            maxWidth: '680px',
            cell: row => (<span className='plusJakara_medium text-[16px]'>{row.title}</span>)
        },
        {
            name: 'Units',
            sortable: true,
            maxWidth: '140px',
            minWidth: '140px',
            // maxWidth: '250px',
            selector: row => row.unit
        },
        {
            name: 'Unit Type',
            sortable: true,
            maxWidth: '140px',
            minWidth: '140px',
            // maxWidth: '250px',
            selector: row => row.unitType
        },
        {
            name: 'Price',
            sortable: true,
            maxWidth: '140px',
            minWidth: '140px',
            // maxWidth: '250px',
            selector: row => '$ ' + row.price
        },
        {
            name: 'Total Price',
            sortable: true,
            maxWidth: '140px',
            minWidth: '140px',
            cell: row => (<span className='plusJakara_medium'>${row.totalPrice}</span>)
        },
    ]
    useEffect(() => {
        if (serviceDetail?.availablity) {
            const dates = serviceDetail?.availablity?.map(dateString => moment(dateString).toDate());
            setSelectedDates(dates);
        }
        if (serviceDetail?.features) {
            const total = serviceDetail?.features?.reduce((sum, feature) => sum + (feature.totalPrice || 0), 0);
            setGrandTotal(total);
        }
    }, [serviceDetail]);

    const handleDateSelect = (date) => {
        setHighlightedDate(date);
    };

    const customDayClassName = (date) => {
        const isAvailable = selectedDates.some(d => moment(d).isSame(date, 'day'));
        const isHighlighted = moment(date).isSame(highlightedDate, 'day');
        if (isHighlighted) {
            return 'react-datepicker__day--highlighted';
        }
        return isAvailable ? '' : 'react-datepicker__day--disabled';
    };
    return (
        <main className='py-5 w-full'>
            <Container className='p-4 bg_white rounded-4 w-full'>
                <div className="flex justify-between w-full">
                    <div className="flex gap-4 mb-5 items-center w-full">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg_primary rounded-3 p-2"
                        >
                            <FaArrowLeft className='text_white' />
                        </button>
                        <h4 className="text_primary mb-0 plusJakara_semibold">Service Detail</h4>
                    </div>
                </div>
                <div className="flex gap-3 flex-col mb-4 justify-start w-full">
                    <div className="flex flex-wrap w-full justify-between">
                        <Col xs={24} lg={12}>
                            <div className="w-full detail_page_swiper overflow-hidden mb-4">
                                <Swiper
                                    spaceBetween={10}
                                    navigation={true}
                                    freeMode={true}
                                    modules={[Navigation, Autoplay, FreeMode, Pagination,]}
                                    className="mySwiper"
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: true,
                                    }}
                                    slidesPerView={"auto"}
                                >
                                    {serviceDetail && serviceDetail?.images?.map((image, index) => (
                                        <SwiperSlide key={index} className="bg_img w-full">
                                            <img src={image} style={{ height: '20rem' }} className='object-cover object-center w-full rounded-2' alt="" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Col>
                        <Col xs={24} lg={11}>
                            <div className="flex flex-col mb-3 gap-2 w-full">
                                <h5 className="form-label text_black plusJakara_semibold">
                                    User Information
                                </h5>
                                <div className="flex gap-3 items-start w-full">
                                    <img
                                        src={serviceDetail?.user?.profilePicture}
                                        style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '12px' }}
                                        alt=""
                                    />
                                    <div className="flex flex-col w-full">
                                        <h6 className="text_black mb-1 plusJakara_semibold">
                                            {serviceDetail?.user?.name}
                                        </h6>
                                        <div className="flex gap-2 items-center">
                                            <FaLocationDot className="text_primary" />
                                            <span className="text_secondary2 plusJakara_medium" >
                                                {serviceDetail?.user?.address}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FaPhone className="text_primary" />
                                            <span className="text_secondary2 plusJakara_medium">
                                                {serviceDetail?.user?.phone}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <MdEmail className="text_primary" />
                                            <span className="text_secondary2 plusJakara_medium">
                                                {serviceDetail?.user?.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start w-full mb-3 justify-between">
                                <div className="flex flex-col gap-2 w-full">
                                    <h6 className="plusJakara_semibold whitespace-nowrap mb-0 text_dark">Main Category:</h6>
                                    <div style={{ width: 'fit-content' }} className="rounded-5 px-4 py-2 border text_secondary2 plusJakara_medium">{serviceDetail?.category?.name}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-4 w-full">
                                <h6 className="plusJakara_semibold whitespace-nowrap mb-0 text_dark">Sub Category:</h6>
                                <div className="flex gap-3 items-center flex-wrap w-full">
                                    {serviceDetail?.subcategory?.map((item, i) => (
                                        <div key={i} style={{ width: 'fit-content' }} className="rounded-5 px-4 py-2 border text_secondary2 plusJakara_medium">{item?.name}</div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mb-3 w-full">
                    <h5 className="plusJakara_semibold whitespace-nowrap mb-0 text_dark">Description:</h5>
                    <span className="text_secondary2 plusJakara_regular">{serviceDetail?.description}</span>
                </div>
                <h5 className="plusJakara_semibold mb-3 text_dark">Working Dates:</h5>
                <div className="flex flex-wrap items-center mb-3 gap-2 w-full">
                    {serviceDetail?.availablity?.map((date, i) => (
                        <div key={i} className="bg_primary text_white rounded-5 py-[6px] px-3">
                            <span className="text-xs plusJakara_medium">{moment(date).format('DD MMM YYYY')}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <h5 className="plusJakara_semibold mb-3 text_dark">Services:</h5>
                    <div className="w-full flex flex-col gap-3 mb-4">
                        <DTables columns={columns} data={serviceDetail?.features} />
                        <div className="flex flex-col gap-2 items-end justify-end w-full">
                            <div className="flex w-full justify-end">
                                <div className="flex justify-between" style={{ width: '250px' }}>
                                    <h6 className="text_secondary2 mb-0 plusJakara_semibold">Sub Total </h6>
                                    <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                        ${serviceDetail?.features?.reduce((sum, feature) => sum + (feature.totalPrice || 0), 0)}
                                    </h6>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="flex justify-between" style={{ width: '250px' }}>
                                    <h6 className="text_secondary2 mb-0 plusJakara_semibold">Discount ({serviceDetail?.dis_price || 0}%)</h6>
                                    <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                        ${grandTotal * parseInt(serviceDetail?.dis_price) / 100}
                                    </h6>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <div className="flex justify-between" style={{ width: '250px' }}>
                                    <h6 className="text_secondary2 mb-0 plusJakara_semibold">Tax ({serviceDetail?.tax || 0}%)</h6>
                                    <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">
                                        ${grandTotal * parseInt(serviceDetail?.tax) / 100}
                                    </h6>
                                </div>
                            </div>
                            <div className="flex mt-3 w-full justify-end">
                                <div className="flex justify-between" style={{ width: '250px' }}>
                                    <h5 className="text_primary mb-0 plusJakara_semibold">Total Price </h5>
                                    <h5 className="text_black plusJakara_semibold mb whitespace-nowrap-0">
                                        ${calculateFinalPrice(grandTotal,
                                            parseInt(serviceDetail?.dis_price || 0),
                                            parseInt(serviceDetail?.tax || 0))}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ main >
    );
};
export default ServiceDetail;
