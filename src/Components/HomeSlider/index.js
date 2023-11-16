import React, { useEffect, useState } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

import {
  CallGetApi,
  FailureViewData,
  InistalFetchingStatus,
  LoadingViewData,
} from "../Utilits/index";

import "./index.css";

const HomeSlider = () => {
  const [fetchState, setFetchState] = useState(InistalFetchingStatus.INITIAL);
  const [slickData, setSlickData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InistalFetchingStatus.INPROGRESS);
        const path = "insta-share/stories";
        const apiData = await CallGetApi(path);
        const modifyData = apiData.users_stories.map((each) => ({
          id: each.user_id,
          userName: each.user_name,
          imageUrl: each.story_url,
        }));
        setFetchState(InistalFetchingStatus.SUCCESS);
        setSlickData(modifyData);
      } catch (error) {
        setFetchState(InistalFetchingStatus.FAILURE);
      }
    };

    fetchApi();
  }, []);

  const successView = () => {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="bg-body-tertiary rounded  px-4 py-2 p-lg-5">
        <Slider {...settings}>
          {slickData.map((each) => (
            <Link key={each.id} className="text-dark" to={`/users/${each.id}`}>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={each.imageUrl}
                  alt={each.userName}
                  className="img-fluid rounded-circle slick-img"
                />
                <small>{each.userName}</small>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    );
  };

  const failureView = () => {
    return FailureViewData();
  };

  const loadingView = () => {
    return LoadingViewData();
  };

  const RenderCondition = () => {
    switch (fetchState) {
      case InistalFetchingStatus.SUCCESS:
        return successView();
      case InistalFetchingStatus.FAILURE:
        return failureView();
      case InistalFetchingStatus.INPROGRESS:
        return loadingView();
      default:
        return null;
    }
  };

  return (
    <div className="container my-3">
      <div className="row">{RenderCondition()}</div>
    </div>
  );
};

export default HomeSlider;
