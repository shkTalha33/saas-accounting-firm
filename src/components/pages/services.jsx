/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getServices } from '../api/services';
import { calculateFinalPrice } from '../common/calculateFinalPrice';
import ProductTable from '../DataTable/productTable';
import '../styles/swiper.css';

const Services = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState([])
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setcount] = useState(0);
  const [services, setservices] = useState([])

  const fetchServices = async () => {
    setloading(true)
    await getServices(lastId)
      .then((res) => {
        if (res.data?.success === true) {
          setservices(res.data?.services)
          setloading(false)
        } else {
          setloading(false)
          setservices([])
        }
      }).catch((err) => {
        setloading(false)
        setservices([])
      })
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleViewDetails = (row) => {
    navigate(`/services/${row?._id}`, { state: { serviceDetail: row } })
  };

  const columns = [
    {
      name: 'Service Image',
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div className="p-1">
          <img src={row?.images[0]} alt="" style={{ width: "50px", height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
      ),
    },
    {
      name: 'Service Name',
      sortable: true,
      selector: row => row?.name,
      minWidth: '150px'
    },
    {
      name: 'Category',
      sortable: true,
      selector: row => row?.category?.name,
      minWidth: '150px'
    },
    {
      name: 'Amount',
      sortable: true,
      cell: row => (
        <span className='plusJakara_medium '>${calculateFinalPrice(row?.totalPrice,
          parseInt(row?.dis_price || 0),
          parseInt(row?.tax || 0))}</span>
      ),
      minWidth: '100px'
    },
    {
      name: 'View Service',
      cell: row => (
        <button className="btn-view-details ms-3 bg_light rounded-2 p-2" onClick={() => handleViewDetails(row)}>
          <FaEye />
        </button>
      ),
      minWidth: '50px'
    },

  ];

  return (
    <main className={`py-5 w-full`}>
      <Container>
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-3 items-center justify-between w-full">
            <h4 className="text_black plusJakara_semibold">All Services</h4>
          </div>
          <div className="flex w-full flex-col">
            {loading ? (
              <div className='my-5 flex justify-center w-full items-center'>
                <CircularProgress size={24} className='text_primary' style={{ color: "#000" }} />
              </div>) :
              (!services || services.length === 0) ? (
                <div className='flex justify-center items-center w-full my-5'>
                  <span className="plusJakara_medium md:text-lg">No Service Found</span>
                </div>
              ) :
                <ProductTable
                  count={count}
                  loading={loading}
                  setCurrentPage={setLastId2}
                  currentPage={lastId2}
                  columns={columns}
                  data={services}
                  setLastId={setLastId}
                />}
          </div>
        </div>
      </Container>
    </ main>
  );
};

export default Services;