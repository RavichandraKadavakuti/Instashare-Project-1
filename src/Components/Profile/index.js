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

const Profile = (props) => {
  const [fetchState, setFetchState] = useState(InistalFetchingStatus.INITIAL);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InistalFetchingStatus.INPROGRESS);
        const path = "insta-share/my-profile";
        const apiData = await CallGetApi(path);
        const eachData = apiData.profile;
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
        setProfileData(modifyData);
      } catch (error) {
        console.log(error);
        setFetchState(InistalFetchingStatus.FAILURE);
      }
    };

    fetchApi();
  }, []);

  const successView = () => {
    return DisplayCommenData(profileData);
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

export default Profile;
