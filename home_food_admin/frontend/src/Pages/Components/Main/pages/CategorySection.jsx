// CategorySection.js
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "../../../../api/axios";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";


const CategoryWrapper = styled.div`
  margin-bottom: 20px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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
  text-align: center;
  background: linear-gradient(to bottom right, #ffecd2, #fcb69f); /* Gradient background color */
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #007bff; /* Updated hover color */
  }
`;

const URL = "./Category";
const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log(category.id);
    navigate("/ProductList", { state: { id: category.id } });
    // Do any other logic if needed
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList('');
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
        <h2>Category</h2>
        {dataList.length === 0 ? (
          <p>No post available</p>
        ) : (
          <BookingContainer>
            {dataList.map((category) => (
              <BookingCard
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
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

export default CategorySection;