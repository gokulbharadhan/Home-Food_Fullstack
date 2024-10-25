import React, { useEffect, useState } from 'react';
import axios from "../../../../api/axios";
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div``;

const BookingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookingCard = styled.div`
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
`;

const URL = "./purchase/";

const PurchaseFarmer = () => {
  const [dataList, setDataList] = useState([]);
  const empid= ApplicationStore().getStorage("empid");
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList([]);
      } else {
        setDataList(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <div className="flat-booking">
        <h2>Purchase Request</h2>
        {dataList.length === 0 ? (
          <p>No post available</p>
        ) : (
          <BookingContainer>
            {dataList.map((booking) => (
              <BookingCard key={booking.id}>
                <img src={"http://localhost:3006" + booking.image} alt="Flat Image" style={{ width: '300px', height: '200px' }}/>
                <p>Payment_No :{booking.payment_number}</p>
                <p>Product Name: {booking.pname}</p>
                
                <p>Price : {booking.price}</p>
                {/* <p>Booking Timing: {booking.date}</p>
                <p>From Date: {booking.from_date}</p>
                <p>To Date: {booking.to_date}</p> */}
              </BookingCard>
            ))}
          </BookingContainer>
        )}
      </div>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default PurchaseFarmer;
