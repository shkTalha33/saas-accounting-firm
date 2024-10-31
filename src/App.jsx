/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import "bootstrap/dist/js/bootstrap.bundle";
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import PrivateRoutes from "./components/authRoutes/privateRoutes";
import PublicRoutes from "./components/authRoutes/publicRoutes";
import AllOrders from "./components/pages/allOrders";
import Category from "./components/pages/category";
import Customers from "./components/pages/customers";
import CustomerSupport from "./components/pages/customerSupport";
import Employee from "./components/pages/employee";
import EstimateDetailProvider from "./components/pages/estimateDetailProvider";
import Estimates from "./components/pages/estimates";
import Faq from "./components/pages/faq";
import HelpSupport from "./components/pages/helpSupport";
import ServiceProviderEmployeee from "./components/pages/serviceProviderEmployee";
import Services from "./components/pages/services";
import SubAdmin from "./components/pages/subAdmin";
import SubCategory from "./components/pages/subCategory";
import './components/styles/main.css';
import Contract from "./components/pages/contract";
import ContractDetail from "./components/pages/contractDetail";
import OrderDetail from "./components/pages/orderDetail";
import ServiceDetail from "./components/pages/serviceDetail";
const NavHeader = lazy(() => import('./components/header/navHeader'));
const SidebarMenu = lazy(() => import('./components/pages/sidebar'));
const LoginPage1 = lazy(() => import('./components/auth/login'));
const Dashboard = lazy(() => import('./components/pages/dashboard'));

function App() {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  const token = window.localStorage.getItem('admin_token')

  useEffect(() => {
    global.BASEURL = 'https://api.tideandtidy.co.uk/'
    global.TOKEN = token
  }, [token])

  useEffect(() => {
    const isLoginData = JSON.parse(localStorage.getItem("isLogin_admin") || false);
    setIsLogin(isLoginData);
  }, [pathname]);

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <SidebarMenu toggled={toggled} setBroken={setBroken} broken={broken} setToggled={setToggled}>
        {isLogin && <NavHeader toggled={toggled} setBroken={setBroken} broken={broken} setToggled={setToggled} />}
        <Suspense fallback={
          <main className='h-screen flex flex-col justify-center items-center'>
            <CircularProgress className='text_darkprimary' size={40} thickness={2} />
            {/* <img style={{ width: '3rem', height: "auto" }} src={finabeelight} className='absolute' alt="" /> */}
          </main>
        }>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicRoutes />} >
              <Route index element={<LoginPage1 />}></Route>
              <Route path='/login' element={<LoginPage1 />}></Route>
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/support" element={<CustomerSupport />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/sub-category" element={<SubCategory />} />
              <Route path="/services" element={<Services />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/sub-admins" element={<SubAdmin />} />
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/estimates/:id" element={<EstimateDetailProvider />} />
              <Route path="/contracts" element={<Contract />} />
              <Route path="/contracts/:id" element={<ContractDetail />} />
              <Route path="/service-providers" element={<Employee />} />
              <Route path="/service-providers/:id" element={<ServiceProviderEmployeee />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/all-orders" element={<AllOrders />} />
              <Route path="/all-orders/:id" element={<OrderDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </SidebarMenu>
    </>
  );
}
export default App;
