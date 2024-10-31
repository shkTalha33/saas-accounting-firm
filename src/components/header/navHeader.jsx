/* eslint-disable no-unused-vars */
import { Menu, Transition } from "@headlessui/react";
import { message } from "antd";
import React, { Fragment, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { avatar1, profileArrow, avatar, notificationIcon } from "../icons/icon";

const NavHeader = ({ broken, setToggled, toggled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("isLogin_admin");
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_data");
    message.error("Logout Successful!");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="p-3 shadow-sm w-full bg_white text_black"
        id="navbar"
      >
        <Container fluid className="flex justify-between items-center">
          {/* H1 Tag at the Start */}
          <h3 className="text-2xl poppins_medium text_darkprimary">
            Dashboard
          </h3>

          {/* Avatar and Admin at the End */}
          <Nav className="flex items-center">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 no-underline">
                <img
                  src={avatar}
                  style={{
                    height: "35px",
                    width: "35px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  alt="Admin Avatar"
                />
                <div className="flex flex-col align-items-start">
                  <span className="text_darkprimary plusJakara_medium">
                    Admin
                  </span>
                  <span
                    style={{ fontSize: "11px" }}
                    className="text_darksecondary plusJakara_medium"
                  >
                    Super Admin
                  </span>
                </div>
                <img
                  src={profileArrow}
                  alt="Profile Arrow"
                  className="text_darksecondary"
                  width={"16px"}
                />
                <div
                  className="flex justify-center items-center rounded-full bg_secondaryligth p-1"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <img
                    src={notificationIcon}
                    alt="notifications"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute z-10 mt-2 flex flex-col shadow-sm bg_white rounded-3 py-2"
                  style={{
                    minWidth: "10rem",
                    right: "0px",
                  }}
                >
                  <Link
                    onClick={handleLogout}
                    style={{ textDecoration: "none" }}
                    className="px-4 py-1 plusJakara_semibold sub_grid_dashboard2 text_dark no-underline"
                  >
                    Sign out
                  </Link>
                </Menu.Items>
              </Transition>
            </Menu>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavHeader;
