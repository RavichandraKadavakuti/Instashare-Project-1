import React, { useEffect } from "react";
import Navbar from "../Navbar";
import HomeSlider from "../HomeSlider";
import PostCards from "../PostCards";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Navbar />
          <HomeSlider />
          <PostCards />
        </div>
      </div>
    </div>
  );
};

export default Home;
