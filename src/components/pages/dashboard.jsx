/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LiaUserCheckSolid } from "react-icons/lia";
import { MdBlock, MdIncompleteCircle, MdOutlineCheckCircle, MdOutlineLocalShipping, MdTask } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbGridDots, TbProgress } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import OrderChart from "../common/orderChart";
const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`users/admin/dashboard`);
      if (res?.data) {
        setCategories(res?.data);
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
  }, []);

  return (
    <main className="min-h-screen lg:container p-4 mx-auto">
      <div className="flex flex-col mb-3 w-full">
        <h4 className="plusJakara_semibold text_black">Dashboard</h4>
      </div>
      <div className="gridDashboard w-100">
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #4634ff' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#DED9FF' }}>
            <PiUsersThreeBold style={{ color: '#4634ff' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Total Customers</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalCustomer || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #28c76f' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#DCF4E5' }}>
            <LiaUserCheckSolid style={{ color: '#28c76f' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Active Customers</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalActiveCustomer || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #eb2222' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#FBD8DA' }}>
            <PiUsersThreeBold style={{ color: '#eb2222' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Customers by State</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.stateCustomer?.usersInEachDivision[0] || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #ff9f43' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#FFEDDE' }}>
            <PiUsersThreeBold style={{ color: '#ff9f43' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Customers by City</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.stateCustomer?.cityDivisionsCount || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #28c76f' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#DCF4E5' }}>
            <PiUsersThreeBold style={{ color: '#28c76f' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Total Service Providers</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalCompany || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #007bff' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#DED9FF' }}>
            <LiaUserCheckSolid style={{ color: '#007bff' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Active Providers</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalActiveCompany || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #ff9f43' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#FFEDDE' }}>
            <PiUsersThreeBold style={{ color: '#ff9f43' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Providers by State</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.stateCompany?.usersInEachDivision[0] || 0}</h4>
            </div>
          </div>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex align-items-center" style={{ border: '1px solid #eb2222' }}>
          <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '50px', height: '50px', backgroundColor: '#FBD8DA' }}>
            <PiUsersThreeBold style={{ color: '#eb2222' }} size={20} />
          </div>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Providers by City</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.stateCompany?.cityDivisionsCount || 0}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="gridDashboard2 w-100 mt-4">
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex justify-between align-items-center" style={{ backgroundColor: '#CDC4FA' }}>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Total Services</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalService || 0}</h4>
            </div>
          </div>
          <TbGridDots style={{ color: '#4634FF' }} size={20} />
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 justify-between d-flex align-items-center" style={{ backgroundColor: '#F5DFD1' }}>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Pending Services</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalPendingService || 0}</h4>
            </div>
          </div>
          <TbProgress style={{ color: '#FF9E42' }} size={20} />
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 justify-between d-flex align-items-center" style={{ backgroundColor: '#C9E8D9' }}>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">pending Estimates</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.pendingEstimate || 0}</h4>
            </div>
          </div>
          <MdOutlineCheckCircle style={{ color: '#29C770' }} size={20} />
        </div>
        {/* <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 gap-3 d-flex justify-between align-items-center" style={{ backgroundColor: '#FBD8DA' }}>
          <div className="d-flex flex-column">
            <span className="plusJakara_medium text-sm">Rejected Services</span>
            <div className="d-flex align-items-end">
              <h4 className="plusJakara_bold mb-0">{categories?.totalActiveCompany || 0}</h4>
            </div>
          </div>
          <IoMdCloseCircleOutline style={{ color: '#ED5D67' }} size={20} />
        </div> */}
      </div>
      <div className="gridDashboard my-4 w-100">
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#4634FF' }}>
              <MdOutlineLocalShipping style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Total Orders</span>
          </div>
          <h5 className="plusJakara_bold mb-0">{categories?.totalOrder || 0}</h5>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#FF9E44' }}>
              <TbProgress style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Pending Orders</span>
          </div>
          <h5 className="plusJakara_bold mb-0">{categories?.totalPendingOrder || 0}</h5>
        </div>
        {/* <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#1E9FF2' }}>
              <FaCheckCircle style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Confirmed Orders</span>
          </div>
          <h5 className="plusJakara_bold mb-0">{categories?.totalOrder || 0}</h5>
        </div> */}
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#29C76F' }}>
              <IoMdCheckboxOutline style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Completed Orders</span>
          </div>
          <h5 className="plusJakara_bold mb-0">{categories?.totalcompleteOrder || 0}</h5>
        </div>
        <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#EB2321' }}>
              <MdBlock style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Cancelled Orders</span>
          </div>
          <h5 className="plusJakara_bold mb-0">{categories?.totalRejectedOrder || 0}</h5>
        </div>
        {/* <div className="sub_grid_dashboard w-100 p-3 bg_white rounded-2 shadow-sm gap-2 d-flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="d-flex justify-content-center rounded-1 align-items-center" style={{ width: '30px', height: '30px', backgroundColor: '#E9907A' }}>
              <MdOutlineStarPurple500 style={{ color: '#fff' }} size={16} />
            </div>
            <span className="plusJakara_medium text-sm">Provider Rating</span>
          </div>
          <h5 className="plusJakara_bold mb-0">0</h5>
        </div> */}
      </div>
      {/* <div className="w-100 bg_white shadow-sm rounded-3 p-3">
        <h6 className="plusJakara_medium text_black">Provider Plans</h6>
        <div className="gridDashboard3 my-3 w-100">
          <div className="sub_grid_dashboard w-100 p-2 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #d3d3d3' }}>
            <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DCF4E5' }}>
              <MdPayment style={{ color: '#29C76F' }} size={20} />
            </div>
            <div className="d-flex flex-column">
              <span className="plusJakara_medium text-sm">Free</span>
              <div className="d-flex align-items-end">
                <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
              </div>
            </div>
          </div>
          <div className="sub_grid_dashboard w-100 p-2 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #d3d3d3' }}>
            <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FBD8DA' }}>
              <MdOutlinePayments style={{ color: '#ED5D67' }} size={20} />
            </div>
            <div className="d-flex flex-column">
              <span className="plusJakara_medium text-sm">Simple</span>
              <div className="d-flex align-items-end">
                <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
              </div>
            </div>
          </div>
          <div className="sub_grid_dashboard w-100 p-2 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #d3d3d3' }}>
            <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#EDE3F9' }}>
              <TbCash style={{ color: '#825DD1' }} size={20} />
            </div>
            <div className="d-flex flex-column">
              <span className="plusJakara_medium text-sm">Standard</span>
              <div className="d-flex align-items-end">
                <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
              </div>
            </div>
          </div>
          <div className="sub_grid_dashboard w-100 p-2 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #d3d3d3' }}>
            <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#F5DFD1' }}>
              <BsCash style={{ color: '#FF9E42' }} size={20} />
            </div>
            <div className="d-flex flex-column">
              <span className="plusJakara_medium text-sm">Professional</span>
              <div className="d-flex align-items-end">
                <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
              </div>
            </div>
          </div>
          <div className="sub_grid_dashboard w-100 p-2 bg_white gap-3 d-flex align-items-center">
            <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DED9FF' }}>
              <FaHandHoldingUsd style={{ color: '#007bff' }} size={20} />
            </div>
            <div className="d-flex flex-column">
              <span className="plusJakara_medium text-sm">Total Payments</span>
              <div className="d-flex align-items-end">
                <h4 className="plusJakara_bold mb-0">{categories?.totalCompany || 0}</h4>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="gridDashboard5 my-4 w-100">
        <div className="w-100 bg_white shadow-sm rounded-3 p-3">
          <h6 className="plusJakara_medium text_black">Contracts</h6>
          <div className="gridDashboard4 my-3 w-100">
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #f4f4f4', borderBottom: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DAF4E3' }}>
                <MdTask style={{ color: '#29C76F' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Total Contracts</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalContracts || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderLeft: '1px solid #f4f4f4', borderBottom: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FFECDB' }}>
                <TbProgress style={{ color: '#FF9E44' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Pending Contracts</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalpendingContracts || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #f4f4f4', borderTop: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FED6D5' }}>
                <MdBlock style={{ color: '#EB2322' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Rejected Contracts</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalrejectedContracts || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderLeft: '1px solid #f4f4f4', borderTop: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DAD7FF' }}>
                <MdIncompleteCircle style={{ color: '#4634FF' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Complete Contracts</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-100 bg_white shadow-sm rounded-3 p-3">
          <h6 className="plusJakara_medium text_black">Invoices</h6>
          <div className="gridDashboard4 my-3 w-100">
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #f4f4f4', borderBottom: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DAF4E3' }}>
                <FaWallet style={{ color: '#29C76F' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Invoice Orders </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalinvoiceOrder || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderLeft: '1px solid #f4f4f4', borderBottom: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FFECDB' }}>
                <TbProgress style={{ color: '#FF9E44' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Invoice Contracts</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalinvoiceContracts || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderRight: '1px solid #f4f4f4', borderTop: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#FED6D5' }}>
                <MdBlock style={{ color: '#EB2322' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Invoices Rejected</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
                </div>
              </div>
            </button>
            <button className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center" style={{ borderLeft: '1px solid #f4f4f4', borderTop: '1px solid #f4f4f4' }}>
              <div className="d-flex justify-content-center rounded-2 align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#DAD7FF' }}>
                <MdIncompleteCircle style={{ color: '#4634FF' }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">Invoices Completed</span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">{categories?.totalcompleteContracts || 0}</h4>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-3 mb-4 items-center flex-wrap flex-lg-nowrap w-full">
        <ChartjsHorizontalBarChart
          info="#003F7D"
          labelColor={labelColor}
          warning="#FF8E00"
          gridLineColor={gridLineColor}
        />
        <StatisticsChart />
      </div> */}
      <OrderChart graph={categories?.graph} />
    </main>
  );
};

export default Dashboard;
