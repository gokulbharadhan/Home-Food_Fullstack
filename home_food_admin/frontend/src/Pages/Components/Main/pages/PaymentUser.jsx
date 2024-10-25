import React, { useEffect, useState } from 'react';
import axios from "../../../../api/axios";
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
`;

const PaymentSection = styled.div`
  padding: 20px;
`;

const PaymentCard = styled.div`
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: left;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PaymentTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const PaymentLabel = styled.p`
  font-size: 16px;
  color: #555;
  margin: 8px 0;
`;
const URL = "./purchase/user";
const PaymentUser = () => {
  const [dataList, setDataList] = useState([]);
  const empid = ApplicationStore().getStorage("empid");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Content-Type': 'application/json', "empid": empid },
      });
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
      <PaymentSection>
        <PaymentTitle>Payment List</PaymentTitle>
        {dataList.length === 0 ? (
          <p>No payment available</p>
        ) : (
          <div>
            {dataList.map((payment) => (
              <PaymentCard key={payment.id}>
                <PaymentLabel>Payment No: {payment.payment_number}</PaymentLabel>
                <PaymentLabel>Price: {payment.price}</PaymentLabel>
                <PaymentLabel>Date: {payment.date}</PaymentLabel>
              </PaymentCard>
            ))}
          </div>
        )}
      </PaymentSection>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default PaymentUser;
