/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa6';
import { PiMapPinLineFill } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';
import LabourMaterialTableDesign from '../common/labourMaterialTableDesign';
import '../styles/main.css';

const ContractDetail = () => {
    const { state } = useLocation();
    const contractData = state?.contractData || null;
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null)

    const renderSignatureSection = (name, email, phone, address, role) => (
        <div className="flex flex-col gap-3 h-full items-start w-full">
            <div className="border flex justify-center w-full items-center p-4">
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <h6 className="text_primary mb-0 plusJakara_semibold">{name}</h6>
                    <h6 className="text_secondary mb-0 whitespace-nowrap plusJakara_medium">{phone}</h6>
                    <h6 className="text_secondary mb-0 whitespace-nowrap plusJakara_medium">{email}</h6>
                    <h6 className="text_secondary mb-0 text-center plusJakara_medium">{address}</h6>
                    <span className="text_secondary whitespace-nowrap plusJakara_regular">(the "{role === 'customer' ? 'Client' : 'Contractor'}")</span>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        if (contractData?.sign_employee) {
            setImageUrl(contractData?.sign_employee)
        }
        if (contractData?.sign_customer) {
            setImageUrl2(contractData?.sign_customer)
        }
    }, [contractData])

    return (
        <main className={` py-5 w-full`}>
            <Container className='bg_white rounded-3 p-4 w-full'>
                <div className="flex flex-col gap-3 w-full">

                    <div className="flex gap-4 mb-3 items-center w-full">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg_primary rounded-3 p-2"
                        >
                            <FaArrowLeft className='text_white' />
                        </button>
                        <h4 className="text_primary mb-0 plusJakara_semibold">Service Agreement</h4>
                    </div>
                    <hr style={{ color: "#828282" }} />
                </div>
                <div className="flex mt-4 flex-wrap gap-3 flex-col flex-md-nowrap justify-between w-full">
                    <div className="flex flex-col w-full mb-4">
                        <h5 className="text_primary mb-1 plusJakara_semibold">GENERAL SERVICE AGREEMENT</h5>
                        <span className="text_secondary whitespace-nowrap plusJakara_regular">
                            The GENERAL SERVICE AGREEMENT (the "Agreement") is dated this day 20, Aug of Monday.
                        </span>
                    </div>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} lg={8}>
                            {renderSignatureSection(contractData?.user?.name, contractData?.user?.email, contractData?.user?.phone, contractData?.user?.address, 'customer')}
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            {renderSignatureSection(contractData?.to_id?.name, contractData?.to_id?.email, contractData?.to_id?.phone, contractData?.to_id?.address, 'provider')}
                        </Col>
                    </Row>
                    <hr style={{ color: "#828282" }} />
                    <div className="flex gap-2 items-center">
                        <PiMapPinLineFill className='text_primary' size={20} />
                        <span className="text_secondary plusJakara_regular">{contractData?.address || contractData?.estimate?.location?.address}</span>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="text_primary mb-0 plusJakara_semibold">Description</h5>
                        <p className="text_secondary plusJakara_regular">
                            {contractData?.description || contractData?.estimate?.description}
                        </p>
                    </div>
                    <LabourMaterialTableDesign
                        labour={contractData?.estimate?.labour}
                        material={contractData?.estimate?.material}
                        dis_price={contractData?.estimate?.dis_price}
                        tax={contractData?.estimate?.tax}
                    />
                    <hr style={{ color: "#828282" }} />
                    <h6 className="text_secondary plusJakara_regular" style={{ lineHeight: 1.5 }}>This contract outlines the terms and conditions for professional home cleaning services provided by <span className="plusJakara_semibold text_primary">{contractData?.to_id?.name}</span> to the Client at the specified residence. The services include routine cleaning tasks such as dusting, vacuuming, mopping, bathroom sanitation, and kitchen cleaning. Additional services like window cleaning, deep cleaning, and appliance care can be arranged upon request for an additional fee.

                        The cleaning schedule will be agreed upon by both parties and may occur weekly, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt modi dolorum voluptate illo, facilis perferendis veniam alias vel quod, illum numquam? Provident, consequuntur. Ab repudiandae minus harum exercitationem, beatae molestiae. bi-weekly, or monthly depending on the Client’s preference. <br />  <br /> Services will be provided on the agreed dates between [start time] and [end time], with flexibility for minor adjustments. Both the Service Provider and the Client are expected to maintain open communication in case of any changes to the schedule or service requirements.

                        Payment for services is due upon completion or as otherwise agreed in advance, such as through a monthly billing system. <br /> <br /> The Client agrees to pay [agreed amount] per cleaning session or [total sum] for a recurring schedule. Payment can be made via cash, credit card, or bank transfer. A late fee of [percentage/amount] may be applied to any payment not received within [X] days of the due date.

                        Both parties agree to maintain a safe working environment. The Client is responsible for securing valuables, while the Service Provider will ensure staff follow all safety and privacy protocols. Any dissatisfaction with the service must be communicated within 24 hours of service completion, allowing the Service Provider the opportunity to resolve the issue promptly.</h6>
                </div>
                <Row gutter={16} className="w-full justify-between items-end my-4">
                    <Col xs={24} md={12}>
                        <h5 className="text_primary mb-5 plusJakara_semibold">Signature</h5>
                        <div className="flex items-end w-full justify-between">
                            <div className="flex flex-col gap-2 items-center">
                                {imageUrl2 &&
                                    <img src={imageUrl2} style={{ width: '120px', height: 'auto' }} alt="" />
                                }
                                <div style={{ width: '150px', height: '1px', backgroundColor: '#000', }}></div>
                                <h6 className="text_secondary mb-0 whitespace-nowrap plusJakara_regular">(the "Client")</h6>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                {imageUrl &&
                                    <img src={imageUrl} style={{ width: '120px', height: 'auto' }} alt="" />}
                                <div style={{ width: '150px', height: '1px', backgroundColor: '#000', }}></div>
                                <h6 className="text_secondary mb-0 whitespace-nowrap plusJakara_regular">(the "Contractor")</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </main >
    );
};

export default ContractDetail;
