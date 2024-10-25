// ProductList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";





const ProductWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: green; // Add your desired hover styles
  }
`;

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
const URL1="./Product/";
const URL2="./get";
const ProductMain = ({ category, onSelect }) => {


  const staticReviews = [
    {
        customer_name: 'John Doe',
        subject: 'Amazing Experience',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        customer_name: 'Jane Smith',
        subject: 'Delicious Food',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    // Add more static reviews as needed
];

  return (
    
    <div className="customer_feedback_area pb-5">
            <div className="container">
                <div className="row justify-content-center mb-50">
                    <div className="col-xl-9">
                        <div className="section_title text-center">
                            <h3>Feedback From Customers</h3>
                            <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially <br /> in the workplace. That’s why it’s crucial that, as women.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="customer_active owl-carousel">
                        {staticReviews.map((row, index) => (
                                <div key={index} className="single_customer d-flex justify-content-center align-items-center">
                                    <div className="customer_meta text-center">
                                        <h3>{row.customer_name}</h3>
                                        <span>{row.subject}</span>
                                        <p>{row.comment}.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
  );
};

export default ProductMain;
