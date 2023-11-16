import React from "react";
import Navbar from "../Navbar";
import {
  FailureViewData,
  LoadingViewData,
  InistalFetchingStatus,
  CallGetApi,
  DisplayCommenData,
} from "../Utilits";
import { useState, useEffect } from "react";
import "./index.css";

const Users = (props) => {
  const [fetchState, setFetchState] = useState(InistalFetchingStatus.INITIAL);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InistalFetchingStatus.INPROGRESS);
        const { match } = props;
        const { params } = match;
        const { id } = params;
        const path = `insta-share/users/${id}`;
        const apiData = await CallGetApi(path);
        const eachData = apiData.user_details;
        const modifyData = {
          followersCount: eachData.followers_count,
          followingCount: eachData.following_count,
          id: eachData.id,
          postsCount: eachData.posts_count,
          profilePic: eachData.profile_pic,
          userBio: eachData.user_bio,
          userId: eachData.user_id,
          userName: eachData.user_name,
          posts: eachData.posts.map((each) => ({
            id: each.id,
            image: each.image,
          })),
          stories: eachData.stories.map((each) => ({
            id: each.id,
            image: each.image,
          })),
        };
        setFetchState(InistalFetchingStatus.SUCCESS);
        setUserData(modifyData);
      } catch (error) {
        setFetchState(InistalFetchingStatus.FAILURE);
      }
    };

    fetchApi();
  }, []);

  const successView = () => {
    return DisplayCommenData(userData);
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
    <div className="container">
      <div className="row">
        <Navbar />
        {RenderCondition()}
      </div>
    </div>
  );
};

export default Users;
