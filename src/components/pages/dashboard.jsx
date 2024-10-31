/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LiaUserCheckSolid } from "react-icons/lia";
import {
  MdBlock,
  MdIncompleteCircle,
  MdOutlineCheckCircle,
  MdOutlineLocalShipping,
  MdTask,
} from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbGridDots, TbProgress } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import OrderChart from "../common/orderChart";
import Hero from "../dashboard/hero";
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
      <div
        className="gridDashboard w-100 px-3 py-4 mt-4 bg_white rounded-lg"
        style={{ boxShadow: "0px 3.09px 15.44px 0px #EEEEEE80" }}
      >
        <Hero value={45} category={"Total Firms"} />
        <Hero value={25} category={"Active Firms"} />
        <Hero value={25} category={"Inactive Firms"} />
        <Hero value={7} category={"Total Packages"} />
      </div>
      {/* <div className="gridDashboard5 my-4 w-100">
        <div className="w-100 bg_white shadow-sm rounded-3 p-3">
          <h6 className="plusJakara_medium text_black">Contracts</h6>
          <div className="gridDashboard4 my-3 w-100">
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderRight: "1px solid #f4f4f4",
                borderBottom: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DAF4E3",
                }}
              >
                <MdTask style={{ color: "#29C76F" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Total Contracts
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderLeft: "1px solid #f4f4f4",
                borderBottom: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#FFECDB",
                }}
              >
                <TbProgress style={{ color: "#FF9E44" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Pending Contracts
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalpendingContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderRight: "1px solid #f4f4f4",
                borderTop: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#FED6D5",
                }}
              >
                <MdBlock style={{ color: "#EB2322" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Rejected Contracts
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalrejectedContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderLeft: "1px solid #f4f4f4",
                borderTop: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DAD7FF",
                }}
              >
                <MdIncompleteCircle style={{ color: "#4634FF" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Complete Contracts
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalcompleteContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-100 bg_white shadow-sm rounded-3 p-3">
          <h6 className="plusJakara_medium text_black">Invoices</h6>
          <div className="gridDashboard4 my-3 w-100">
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderRight: "1px solid #f4f4f4",
                borderBottom: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DAF4E3",
                }}
              >
                <FaWallet style={{ color: "#29C76F" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Invoice Orders{" "}
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalinvoiceOrder || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderLeft: "1px solid #f4f4f4",
                borderBottom: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#FFECDB",
                }}
              >
                <TbProgress style={{ color: "#FF9E44" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Invoice Contracts
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalinvoiceContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderRight: "1px solid #f4f4f4",
                borderTop: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#FED6D5",
                }}
              >
                <MdBlock style={{ color: "#EB2322" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Invoices Rejected
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalcompleteContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
            <button
              className="sub_grid_dashboard2 w-100 p-3 bg_white gap-3 d-flex align-items-center"
              style={{
                borderLeft: "1px solid #f4f4f4",
                borderTop: "1px solid #f4f4f4",
              }}
            >
              <div
                className="d-flex justify-content-center rounded-2 align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DAD7FF",
                }}
              >
                <MdIncompleteCircle style={{ color: "#4634FF" }} size={20} />
              </div>
              <div className="d-flex flex-column">
                <span className="plusJakara_medium text-sm">
                  Invoices Completed
                </span>
                <div className="d-flex align-items-end">
                  <h4 className="plusJakara_bold mb-0">
                    {categories?.totalcompleteContracts || 0}
                  </h4>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div> */}
      {/* <div className="flex gap-3 mb-4 items-center flex-wrap flex-lg-nowrap w-full">
        <ChartjsHorizontalBarChart
          info="#003F7D"
          labelColor={labelColor}
          warning="#FF8E00"
          gridLineColor={gridLineColor}
        />
        <StatisticsChart />
      </div> */}
      {/* <OrderChart graph={categories?.graph} /> */}
    </main>
  );
};

export default Dashboard;
