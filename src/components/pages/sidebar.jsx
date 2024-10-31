/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AmenitiesIcon,
  AmenitiesIconW,
  categoryIcon,
  categoryIconW,
  customerdark,
  customerlight,
  dashboarddark,
  dashboardlight,
  employeeIcon,
  employeWIconW,
  eventIcon,
  eventWIconW,
  faqdark,
  faqlight,
  historyIcon,
  historyWIconW,
  OrderIcon,
  OrderIconW,
  parentdark,
  parentlight,
  valixLogoWhite,
  dashboard,
  pages,
  setting,
  emailConfigurationlFirm,
  emailFirm,
  staff,
  companies,
} from "../icons/icon";

import { MdProductionQuantityLimits } from "react-icons/md";
import { useAuth } from "../authRoutes/useAuth";

const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLink, setSelectedLink] = useState("0");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useAuth();

  const handleLinkClick = (itemId, path) => {
    setSelectedLink(itemId);
    setToggled(false);
    setShow(false);
    navigate(path);
  };

  const isChildPath = (parentPath, childPath) => {
    return childPath.startsWith(parentPath);
  };

  const menuItems = [
    {
      image: dashboard,
      items: "Dashboard",
      path: "/dashboard",
    },
    {
      image: companies,
      items: "Companies/Firms",
      path: "/companies",
      subItems: [
        {
          label: "All Companies",
          path: "/sub/all-companies",
        },
        {
          label: "Companies and Subscriptions",
          path: "/sub/subscription",
        },
        {
          label: "Subscription and Transactions",
          path: "/transaction",
        },
      ],
    },
    {
      image: pages,
      items: "Packages",
      path: "/packages",
    },
    {
      image: staff,
      items: "Staff Management",
      path: "/staff",
      subItems: [
        {
          label: "Staff",
          path: "/staff/all",
        },
        {
          label: "Roles and Premission",
          path: "/staff/roles",
        },
      ],
    },
    {
      image: emailFirm,
      items: "Email Firms",
      path: "/email-firms",
    },
    {
      image: emailConfigurationlFirm,
      items: "Email Configuration",
      path: "/email-config",
    },
    {
      image: setting,
      items: "Landing Page Setting",
      path: "/setting",
    },
    {
      image: staff,
      items: "My Clients",
      path: "/clients",
    },
    // { image: parentdark, image2: parentlight, items: "Help", path: '/help-support' },
    // { image: parentdark, image2: parentlight, items: "FAQs", path: '/faq' },
    // { image: parentdark, image2: parentlight, items: "All Orders", path: '/all-orders' },
  ];

  return (
    <>
      {isLogin ? (
        <div className="flex h-screen min-h-screen bg_dark ">
          <div className="h-screen relative bg_dark" style={{ zIndex: 9999 }}>
            <Sidebar
              className="bg_dark"
              width="280px"
              style={{ height: "100%", zIndex: 9999 }}
              collapsed={collapsed}
              toggled={toggled}
              backgroundColor="bg_dark"
              onBackdropClick={() => {
                setToggled(false);
                setShow(false);
              }}
              onBreakPoint={setBroken}
              breakPoint="xl"
            >
              <div
                className="scrolbar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  height: "100%",
                  paddingTop: "1rem",
                }}
              >
                <div className="flex items-center mb-3 justify-center">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className=""
                  >
                    <img
                      src={valixLogoWhite}
                      alt="valix Logo White"
                      width={"150px"}
                    />
                  </button>
                </div>
                <Menu className="container mx-auto flex flex-col justify-between h-full mt-4 ">
                  <div>
                    <p
                      style={{ width: "90%", margin: "auto", fontSize: "17px" }}
                      className="text-secondary archivo_bold mb-2"
                    >
                      General
                    </p>
                    {menuItems.map((item, i) => (
                      <Fragment key={i}>
                        {item.subItems ? (
                          <SubMenu
                            label={item.items}
                            icon={<img src={item.image} width="22px" alt={item.items} />}
                            className={`w-full archivo_bold text_white mb-2`}
                          >{item.subItems.map((subItem, j) => (<MenuItem
                                style={{backgroundColor:"bg_dark"}}
                                key={`${i}-${j}`}
                                onClick={() =>
                                  handleLinkClick(`${i}-${j}`, subItem.path)
                                }
                                component={<Link to={subItem.path} />}
                                className={`w-full bg_dark archivo_regular text_white  ${
                                  isChildPath(subItem.path, location.pathname)
                                }`}
                              >
                                {subItem.label}
                              </MenuItem>
                            ))}
                          </SubMenu>
                        ) : (
                          <MenuItem
                            style={{ borderRadius: "20px", margin: "auto" }}
                            key={i}
                            onClick={() =>
                              handleLinkClick(i.toString(), item.path)
                            }
                            component={<Link to={item.path} />}
                            className={` mb-2 dashboard-menu-items rounded-lg  ${
                              isChildPath(item.path, location.pathname)
                                ? "bg_primary text_white archivo_bold"
                                : "text_white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* {isChildPath(item.path, location.pathname) ? ( */}
                              <img
                                style={{ height: "auto", width: "22px" }}
                                src={item.image}
                                alt=""
                              />
                              {/* ) : (
                                <img
                                  style={{ height: "auto", width: "25px" }}
                                  src={item.image}
                                  alt=""
                                />
                              )} */}
                              <div className="archivo_regular text">
                                {item.items}
                              </div>
                            </div>
                          </MenuItem>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </Menu>
              </div>
            </Sidebar>
          </div>
          <main
            className="w-full overflow-auto"
            style={{ backgroundColor: "#F3F3F9" }}
          >
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SidebarMenu;
