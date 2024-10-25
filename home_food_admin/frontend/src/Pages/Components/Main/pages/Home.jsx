import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import ProductUserList from "./ProductUserList";
import CategorySection from "./CategorySection";
import CategoryMain from "./CategoryMain";
import ProductMain from "./ProductMain";

const Home = () => {
  return (
    <div>
      {/* <Announcement /> */}
      <Navbar />
      {/* <Announcement /> */}
      <Slider />
      <CategoryMain/>
      {/* <ProductMain/> */}
      {/* <Newsletter/> */}
      <Footer/>
    </div>
  );
};

export default Home;
