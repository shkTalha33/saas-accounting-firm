/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import { Col } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaArrowLeft, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Label } from 'reactstrap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LabourMaterialTableDesign from '../common/labourMaterialTableDesign';
import '../styles/swiper.css';

const EstimateDetailProvider = () => {
    const { state } = useLocation();
    const [estimateData, setEstimateData] = useState(state?.estimateData || null);
    const navigate = useNavigate();

    return (
        <main className={`py-5 w-full`}>
            {!estimateData ? (
                <div className="flex justify-center w-full items-center my-5">
                    <CircularProgress size={24} style={{ color: 'black' }} />
                </div>
            ) : (
                <Container className="bg_white rounded-3 p-4 w-full">
                    <div className="flex gap-4 items-center justify-between w-full mb-4">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex gap-4 mb-3 items-center w-full">
                                <button onClick={() => navigate(-1)} className="bg_primary rounded-3 p-2">
                                    <FaArrowLeft className="text_white" />
                                </button>
                                <h4 className="text_primary mb-0 plusJakara_semibold">Estimate Detail</h4>
                            </div>
                            <div className="flex justify-between w-full items-start">
                                <div className="flex flex-col gap-2 w-full">
                                    <h5 className="form-label text_black plusJakara_semibold">
                                        Service Provider
                                    </h5>
                                    <div className="flex gap-3 items-start w-full">
                                        <img
                                            src={estimateData?.user?.profilePicture}
                                            style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
                                            alt=""
                                        />
                                        <div className="flex flex-col w-full">
                                            <h5 className="text_black plusJakara_semibold">
                                                {estimateData?.user?.name}
                                            </h5>
                                            <div className="flex gap-2 items-center">
                                                <FaLocationDot className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium" >
                                                    {estimateData?.user?.address}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <FaPhone className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium">
                                                    {estimateData?.user?.phone}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <MdEmail className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium">
                                                    {estimateData?.user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <h5 className="form-label text_black plusJakara_semibold">
                                        Customer
                                    </h5>
                                    <div className="flex gap-3 items-start w-full">
                                        <img
                                            src={estimateData?.to_id?.profilePicture}
                                            style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
                                            alt=""
                                        />
                                        <div className="flex flex-col w-full">
                                            <h5 className="text_black plusJakara_semibold">
                                                {estimateData?.to_id?.name}
                                            </h5>
                                            <div className="flex gap-2 items-center">
                                                <FaLocationDot className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium" >
                                                    {estimateData?.to_id?.address}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <FaPhone className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium">
                                                    {estimateData?.to_id?.phone}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <MdEmail className="text_primary" />
                                                <span className="text_secondary2 plusJakara_medium">
                                                    {estimateData?.to_id?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ color: '#828282' }} />
                    <div className="flex mt-4 flex-wrap gap-3 flex-col flex-md-nowrap justify-between w-full">
                        <div className="flex gap-3 items-center justify-between w-full">
                            <Col xs={24} md={11} xl={14}>
                                <div className="flex justify-between gap-5 items-center flex-wrap">
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Estimate Status</h6>
                                        <div className="px-2 py-1 w-fit text-center rounded-2" style={{ backgroundColor: '#E6E9F4', color: '#5A607F' }}>
                                            <span className="plusJakara_bold">
                                                {estimateData?.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Estimate Start Date</h6>
                                        <span className="text_black plusJakara_bold">
                                            {moment(estimateData?.startDate).format('ddd DD MMM YYYY')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h6 className="text_secondary2 plusJakara_semibold">Estimate End Date</h6>
                                        <span className="text_black plusJakara_bold">
                                            {moment(estimateData?.endDate).format('ddd DD MMM YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <hr style={{ color: '#828282' }} />
                        <Col xs={24} md={11} xl={18}>
                            <div className="flex flex-col">
                                <h5 className="text_primary mb-3 plusJakara_semibold">Description</h5>
                                <h6 className="text_secondary plusJakara_regular">{estimateData?.description}</h6>
                            </div>
                        </Col>
                    </div>
                    <hr style={{ color: '#828282' }} />
                    <div className="flex mb-4 flex-col w-full gap-1">
                        <Label className="form-label text_secondary2 plusJakara_medium">
                            Scheduling
                        </Label>
                        <div className="flex justify-between flex-wrap gap-3 w-full">
                            {estimateData?.labour?.map((category, index) => (
                                <div
                                    key={index}
                                    style={{ maxWidth: '50%', width: '100%' }}
                                    className="bg_light border rounded-3 px-3 py-2 flex justify-between items-center"
                                >
                                    <div className="flex flex-col w-full gap-1">
                                        <h6 className="text_secondary2 mb-0 w-full text-sm plusJakara_semibold">LABOUR</h6>
                                        <h6 className="text_primary mb-0 w-full plusJakara_bold">{category.labourName}</h6>
                                    </div>
                                    <div className="flex gap-2 items-center w-full justify-end">
                                        <span className="text_secondary2 text-sm plusJakara_medium" style={{ whiteSpace: 'nowrap' }}>
                                            {moment(category?.startDate).format('DD MMM')}
                                        </span>
                                        -
                                        <span className="text_secondary2 text-sm plusJakara_medium" style={{ whiteSpace: 'nowrap' }}>
                                            {moment(category?.endDate).format('DD MMM')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr style={{ color: '#828282' }} />
                    <LabourMaterialTableDesign
                        labour={estimateData?.labour}
                        material={estimateData?.material}
                        dis_price={estimateData?.dis_price}
                        tax={estimateData?.tax}
                    />
                </Container>
            )
            }
        </main >
    );
};

export default EstimateDetailProvider;