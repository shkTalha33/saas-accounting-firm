/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { Form, Input, message } from "antd";
import React, { useState } from "react";
import {} from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { eye, eyeoff, luxurelogolight } from "../icons/icon";
// import { apiRequest } from '../../api/auth_api'

// valix-saas-firm

import { valixLogo } from "../icons/icon";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (value) => {
    const data = {
      email: value?.email,
      password: value?.password,
    };
    // setIsProcessing(true);
    // await login(data)
    //   .then((res) => {
    //     console.log(res);
    //     if (res?.data) {
      //       setIsProcessing(false);
      //     } else {
        //       setIsProcessing(false);
        //       message.error(res.data.message);
        //     }
        //   })
        //   .catch((err) => {
          //     message.error(err.response.data.message);
          //     setIsProcessing(false);
          //   });
                message.success("Login successfully");
                // localStorage.setItem("admin_data", JSON.stringify(res?.data?.user));
                // localStorage.setItem("admin_token", res?.data?.token);
                localStorage.setItem("isLogin_admin", true);
                navigate("/dashboard");
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden  flex flex-row">
        <div className="d-none flex justify-center d-md-flex flex-col  items-start w-full lg:w-1/2  relative login-bg ">
          <div className="bg-overlay"></div>
          {/* <img src={luxurelogolight} alt="ImageNotfound" /> */}
          <div className="mr-auto relative px-5">
            <img
              src={valixLogo}
              alt="valix-logo"
              width={"100px"}
              height={"90px"}
              className="object-cover"
            />
          </div>
          <div>
            <p className="login-logo-text poppins_medium px-5 py-2">
              This accounting firm offers streamlined, personalized financial
              services, specializing in tax returns, VAT, and payroll
              management. With a user-friendly platform, clients can track
              progress in real-time, communicate directly with accountants, and
              manage payments seamlessly. We ensure accuracy, transparency, and
              efficiency for all your accounting needs.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full overflow-y-scroll justify-center items-center p-4">
          <div
            className="flex flex-col items-center justify-center m-auto"
            style={{ minHeight: "90vh", maxWidth: "600px" }}
          >
            {/* <div className="d-flex justify-content-end w-full mb-4">
              <Link to="/dashboard">
                <img
                  src={luxurelogo}
                  style={{ height: "6rem", width: "auto" }}
                  className=""
                  alt=""
                />
              </Link>
            </div> */}
            <div className="border border-white p-xl-4 ">
              <h2 className="inter_semibold text-xl mb-0 md:mb-auto md:text-2xl lg:text-3xl text_black">
                Login
              </h2>
              <p className="text_secondary max-md:text-sm inter_regular my-2 mb-5">
                Login to your account
              </p>
              <Form
                layout="verticle"
                className="flex flex-wrap justify-between"
                onFinish={handleSubmit}
              >
                <span className="inter_regular mb-2 text_black text-lg w-full">
                  Email Address
                </span>
                <Form.Item
                  name="email"
                  className="mb-3 w-full inter_regular"
                  rules={[
                    {
                      type: "email",
                      message: "The Input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please Input your E-mail!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Your Email Address" />
                </Form.Item>
                <span className="inter_regular mb-2 text_black text-lg w-full">
                  Password
                </span>
                <Form.Item
                  name="password"
                  className="w-full mb-0 inter_regular"
                  rules={[
                    {
                      min: 6,
                      message: "Please Enter a strong Password",
                      required: true,
                      whitespace: true,
                    },
                  ]}
                  hasFeedback
                >
                  <div className="relative">
                    <div className="flex justify-end">
                      <img
                        src={showPassword ? eye : eyeoff}
                        className="absolute m-2 cursor-pointer"
                        alt="Toggle Password Visibility"
                        onClick={togglePasswordVisibility}
                      />
                      <Input.Password size="large" placeholder="********" />
                    </div>
                  </div>
                </Form.Item>
                  <Link to="/forget-password"
                    className="inter_regular text_primary mb-4 mt-2 no-underline hover:underline forgot-password"
                  >
                    Forgot Password?
                  </Link>
                {/* <button type='button' className="my-[18px] md:my-[24px] text-sm text-[#0E73F6] inter_semibold">Forgot Password?</button> */}
                <div className="w-full my-1">
                  {!isProcessing ? (
                    <button
                      style={{ padding: "12px" }}
                      type="submit"
                      className="w-full rounded-3 bg_primary text_white inter_bold flex justify-center items-center"
                    >
                      Sign In
                    </button>
                  ) : (
                    <button
                      style={{ padding: "12px" }}
                      type="button"
                      className="w-full rounded-3 bg_primary text_white flex justify-center items-center"
                      disabled
                    >
                      <CircularProgress
                        style={{ color: "white" }}
                        size={20}
                        className="text_white"
                      />
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
