/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import { Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Container
} from "reactstrap";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { calculateFinalPrice } from '../common/calculateFinalPrice';
import ProductTable from '../DataTable/productTable';
import '../styles/swiper.css';
import ImageLoader from './ImageLoader/ImageLoader';
import { allContracts } from '../api/estimate';

const AllOrders = () => {
  const { state } = useLocation()
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [loading, setloading] = useState([])
  const [orders, setOrders] = useState([])

  const fetchorders = async () => {
    setloading(true)
    await allContracts('order', lastId)
      .then((res) => {
        if (res.data?.success === true) {
          setOrders(res.data?.orders)
          setloading(false)
        } else {
          setloading(false)
          setOrders([])
        }
      }).catch((err) => {
        setloading(false)
        setOrders([])
      })
  }


  useEffect(() => {
    fetchorders()
  }, [])

  const handleViewDetails = (row) => {
    navigate(`/all-orders/${row?._id}`, { state: { orderData: row } })
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePreview(true);
  };

  const columns = [
    {
      name: 'Order Id',
      cell: row => (
        <button style={{ textDecoration: 'underline' }}
          // onClick={() => handleViewDetails(row)}
          className="text-center text_primary plusJakara_semibold">
          {row?.order_id}
        </button>
      ),
    },
    {
      name: 'Service Provider',
      sortable: true,
      cell: (row) => {
        return (
          <div className="flex items-center gap-2" style={{ maxWidth: '250px', width: '100%' }}>
            <ImageLoader
              circeltrue={true}
              imageUrl={row?.to_id?.profilePicture}
              onClick={() => handleImageClick(row?.to_id?.profilePicture)}
              classes={"rounded-5 catIm01 radius20"}
            />
            <div className="flex flex-col items-start">
              <span className="text_black text-sm plusJakara_semibold">{row?.to_id?.name}</span>
              <span className="text_secondary plusJakara_regular">{row?.to_id?.email}</span>
            </div>
          </div>)
      },
      minWidth: "250px",
      maxWidth: "250px",
    },
    {
      name: 'Customer Information',
      sortable: true,
      cell: (row) => {
        return (
          <div className="flex items-center gap-2" style={{ maxWidth: '250px', width: '100%' }}>
            <ImageLoader
              circeltrue={true}
              imageUrl={row?.user?.profilePicture}
              onClick={() => handleImageClick(row?.user?.profilePicture)}
              classes={"rounded-5 catIm01 radius20"}
            />
            <div className="flex flex-col items-start">
              <span className="text_black text-sm plusJakara_semibold">{row?.user?.name}</span>
              <span className="text_secondary plusJakara_regular">{row?.user?.email}</span>
            </div>
          </div>)
      },
      minWidth: "250px",
      maxWidth: "250px",
    },
    {
      name: 'Booking Date',
      sortable: true,
      selector: row => moment(row?.bookingDate).format('ddd DD MMM YYYY'),
      minWidth: '180px'
    },
    {
      name: 'Status',
      // sortable: true,
      cell: row => (
        <div className="px-2 py-1 w-fit text-center rounded-2" style={{ backgroundColor: '#E6E9F4', color: '#5A607F' }}>
          {row?.status}
        </div>
      ),
      // minWidth: '200px'
    },
    {
      name: 'Amount',
      sortable: true,
      cell: row => (
        <span className='plusJakara_medium'>
          ${calculateFinalPrice(
            parseInt(row?.estimate?.totalPrice) || 0,
            parseInt(row?.estimate?.dis_price) || 0,
            parseInt(row?.estimate?.tax) || 0
          )}
        </span>
      ),
      minWidth: '100px'
    },
    {
      name: 'View order',
      cell: row => (
        <button className="btn-view-details ms-3 bg_light rounded-2 p-2"
        // onClick={() => handleViewDetails(row)}
        >
          <FaEye />
        </button>
      ),
      minWidth: '50px'
    }
  ];

  return (
    <main className={`py-5`}>
      <Container>
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-3 items-center justify-between w-full">
            <h4 className="text_black plusJakara_semibold">All Orders</h4>
          </div>
          <div className="flex w-full flex-col">
            {loading ? (
              <div className='my-5 flex justify-center w-full items-center'>
                <CircularProgress size={24} className='text_primary' style={{ color: "#000" }} />
              </div>) :
              (!orders || orders.length === 0) ? (
                <div className='flex justify-center items-center w-full my-5'>
                  <span className="plusJakara_medium md:text-lg">No order Found</span>
                </div>
              ) :
                <ProductTable
                  count={count}
                  loading={loading}
                  setCurrentPage={setLastId2}
                  currentPage={lastId2}
                  columns={columns}
                  data={orders}
                  setLastId={setLastId}
                />}
          </div>
        </div>
      </Container>

      <Modal
        open={showImagePreview}
        onCancel={() => setShowImagePreview(false)}
        footer={null}
        centered
      >
        <img
          src={selectedImage}
          alt={selectedImage}
          className="object-cover w-full"
          style={{ maxHeight: "24rem" }}
        />
      </Modal>

    </ main>
  );
};
export default AllOrders;
