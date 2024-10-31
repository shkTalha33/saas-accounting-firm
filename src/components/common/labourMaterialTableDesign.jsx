import React from 'react'
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { Col } from 'antd';
import { Input } from 'reactstrap';
import { labour2, material2 } from '../icons/icon';

const LabourMaterialTableDesign = ({ labour, material, dis_price, tax }) => {

    const calculateSubTotal = () => {
        const labourTotal = parseInt(labour?.reduce((sum, entry) => sum + (parseInt(entry?.labourTotal) || 0), 0));
        const materialTotal = parseInt(material?.reduce((sum, entry) => sum + (parseInt(entry?.materialTotal) || 0), 0));
        return labourTotal + materialTotal;
    };

    const calculateDiscount = (subTotal, discount) => {
        return (subTotal * (parseInt(discount) || 0)) / 100;
    };

    const calculateTax = (subTotal, tax) => {
        return (subTotal * (parseInt(tax) || 0)) / 100;
    };

    const calculateFinalPrice = (subTotal, discount, tax) => {
        const discountAmount = calculateDiscount(subTotal, discount);
        const taxAmount = calculateTax(subTotal, tax);
        return subTotal - discountAmount + taxAmount;
    };

    const subTotal = calculateSubTotal();
    const discountAmount = calculateDiscount(subTotal, dis_price);
    const taxAmount = calculateTax(subTotal, tax);
    const totalEstimate = calculateFinalPrice(subTotal, dis_price, tax);

    return (
        <div className="flex w-full flex-col gap-3">
            <div
                style={{ backgroundColor: "#f4f4f4", }}
                className="flex flex-col w-full relative shadow-sm p-2 rounded-3 gap-2 mb-3 items-center justify-between">
                <div className="flex gap-5 items-center w-full">
                    <div className="flex mt-1 gap-1 items-center">
                        <PiDotsSixVerticalBold size={20} />
                        <h6 style={{ whiteSpace: 'nowrap' }} className="text_secondary whitespace-nowrap text-sm mb-0 plusJakara_medium">Labour & Material</h6>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="flex items-center gap-2">
                            <img src={labour2} style={{ height: "16px", width: "auto" }} alt="" />
                            <span className="text_secondary text-sm plusJakara_medium">{labour?.length || 0} Labors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={material2} style={{ height: "16px", width: "auto" }} alt="" />
                            <span className="text_secondary text-sm plusJakara_medium">{material?.length || 0} Materials</span>
                        </div>
                    </div>
                </div>
                <>
                    {labour?.map((entry, index) => (
                        <div
                            className='w-full relative'
                            key={index}
                        >
                            <Col xs={24}>
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="flex bg_white justify-between items-end rounded-2 p-2 w-full">
                                        <Col xs={15} className="w-full mt-3">
                                            <div className="flex gap-2 items-start">
                                                <span className='text_secondary2 mt-2 whitespace-nowrap plusJakara_medium text-xs'>LABOUR</span>
                                                <Input
                                                    readOnly
                                                    value={entry?.labourName}
                                                    name={`labour[${index}].labourName`}
                                                    className="form-control border text-sm rounded-1 w-full"
                                                    style={{ backgroundColor: '#fefefe' }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>UNIT TYPE</span>
                                            <Input
                                                readOnly
                                                value={entry?.laboutUnitType}
                                                as="select"
                                                className="form-control border text-sm rounded-1 w-full"
                                                style={{ backgroundColor: '#fefefe' }}
                                                disabled
                                            >
                                                <option value="unit">Unit</option>
                                                <option value="sqrft">Sqrft</option>
                                                <option value="inch">Inch</option>
                                            </Input>
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>{entry?.laboutUnitType?.toUpperCase()}</span>
                                            <Input
                                                readOnly
                                                value={entry?.labourUnit}
                                                name={`labour[${index}].labourUnit`}
                                                className="form-control border text-sm rounded-1 w-full"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Unit"
                                                type="number"
                                            />
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>PER PRICE</span>
                                            <Input
                                                readOnly
                                                value={entry?.labourPrice}
                                                name={`labour[${index}].labourPrice`}

                                                className="form-control border text-sm rounded-1"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Price"
                                                type="number"
                                            />
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>TOTAL PRICE</span>
                                            <Input
                                                readOnly
                                                value={entry?.labourTotal}
                                                name={`labour[${index}].labourTotal`}
                                                className="form-control border text-sm rounded-1"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Total Price"
                                                type="number"
                                            />
                                        </Col>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    ))}
                </>
                <>
                    {material?.map((entry, index) => (
                        <div
                            className='w-full relative'
                            key={index}
                        >
                            <Col xs={24}>
                                <div className="flex flex-col gap-3 items-start">
                                    <div className="flex bg_white items-end justify-between rounded-2 p-2 w-full">
                                        <Col xs={15} className="w-full mt-3">
                                            <div className="flex gap-2 items-start">
                                                <span className='text_secondary2 mt-2 whitespace-nowrap plusJakara_medium text-xs'>MATERIAL</span>
                                                <Input
                                                    readOnly
                                                    value={entry?.materialName}
                                                    name={`material[${index}].materialName`}
                                                    className="form-control border text-sm rounded-1 w-full"
                                                    style={{ backgroundColor: '#fefefe' }}
                                                    placeholder="material Name"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>UNIT TYPE</span>
                                            <Input
                                                readOnly
                                                value={entry?.materialUnitType}
                                                as="select"
                                                disabled
                                                className="form-control border text-sm rounded-1 w-full"
                                                style={{ backgroundColor: '#fefefe' }}
                                                name={`material[${index}].materialUnitType`}
                                            >
                                                <option value="unit">Unit</option>
                                                <option value="sqrft">Sqrft</option>
                                                <option value="inch">Inch</option>
                                            </Input>
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>{entry?.materialUnitType?.toUpperCase()}</span>
                                            <Input
                                                readOnly
                                                value={entry?.materialUnit}
                                                name={`material[${index}].materialUnit`}
                                                className="form-control border text-sm rounded-1 w-full"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Unit"
                                                type="number"
                                            />
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>PER PRICE</span>
                                            <Input
                                                readOnly
                                                value={entry?.materialPrice}
                                                name={`material[${index}].materialPrice`}
                                                className="form-control border text-sm rounded-1"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Price"
                                                type="number"
                                            />
                                        </Col>
                                        <Col xs={2} className='w-full'>
                                            <span className='text_secondary2 plusJakara_medium text-xs whitespace-nowrap'>TOTAL PRICE</span>
                                            <Input
                                                readOnly
                                                value={entry?.materialTotal}
                                                name={`material[${index}].materialTotal`}
                                                className="form-control border text-sm rounded-1"
                                                style={{ backgroundColor: '#fefefe' }}
                                                placeholder="Total Price"
                                                type="number"
                                            />
                                        </Col>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    ))}
                </>
            </div>
            <div className="flex flex-col gap-2 items-end justify-end w-full">
                <div className="flex w-full justify-end">
                    <div className="flex justify-between" style={{ width: '250px' }}>
                        <h6 className="text_secondary2 mb-0 plusJakara_semibold">Sub Total </h6>
                        <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0">${subTotal}</h6>
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    <div className="flex justify-between" style={{ width: '250px' }}>
                        <h6 className="text_secondary2 mb-0 plusJakara_semibold">Discount ({dis_price || 0}%)</h6>
                        <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0"> ${discountAmount}</h6>
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    <div className="flex justify-between" style={{ width: '250px' }}>
                        <h6 className="text_secondary2 mb-0 plusJakara_semibold">Tax ({tax || 0}%)</h6>
                        <h6 className="text_black plusJakara_semibold whitespace-nowrap mb-0"> ${taxAmount}</h6>
                    </div>
                </div>
                <div className="flex mt-3 w-full justify-end">
                    <div className="flex justify-between" style={{ width: '250px' }}>
                        <h5 className="text_primary mb-0 plusJakara_semibold">Total Price </h5>
                        <h5 className="text_black plusJakara_semibold whitespace-nowrap mb-0">${totalEstimate?.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabourMaterialTableDesign