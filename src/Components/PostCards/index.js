import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom/cjs/react-router-dom";

import {
  InistalFetchingStatus,
  CallGetApi,
  LoadingViewData,
  FailureViewData,
  CallLikePostApi,
  NotFoundSearchResults,
} from "../Utilits";

import "./index.css";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaCommentAlt, FaShare } from "react-icons/fa";

import Context from "../../Context";

const PostCards = () => {
  const { searchInputValue } = useContext(Context);

  const [fetchState, setFetchState] = useState(InistalFetchingStatus.INITIAL);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setFetchState(InistalFetchingStatus.INPROGRESS);
        const path = `insta-share/posts?search=${searchInputValue}`;
        const apiData = await CallGetApi(path);
        const modifyData = apiData.posts.map((each) => ({
          isLike: false,
          createdAt: each.created_at,
          likesCount: each.likes_count,
          postId: each.post_id,
          profilePic: each.profile_pic,
          userId: each.user_id,
          userName: each.user_name,
          caption: each.post_details.caption,
          imageUrl: each.post_details.image_url,
          comments: each.comments.map((each) => ({
            userId: each.user_id,
            userName: each.user_name,
            comment: each.comment,
          })),
        }));
        setFetchState(InistalFetchingStatus.SUCCESS);
        setPostData(modifyData);
      } catch (error) {
        setFetchState(InistalFetchingStatus.FAILURE);
      }
    };

    fetchApi();
  }, [searchInputValue]);

  const onClickLikePost = async (id) => {
    try {
      const path = `insta-share/posts/${id}/like`;
      const bodyData = { like_status: true };
      const apiData = await CallLikePostApi(path, bodyData);
      if (apiData.message === "Post has been liked".trim()) {
        setPostData((prev) =>
          prev.map((each) =>
            each.postId === id
              ? { ...each, likesCount: each.likesCount + 1, isLike: true }
              : each
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const failureView = () => {
    return FailureViewData();
  };

  const loadingView = () => {
    return LoadingViewData();
  };

  const successView = () => {
    return (
      <ul>
        {postData.length > 0 &&
          postData.map((each) => (
            <li key={each.postId} className="card p-3 my-2">
              <Link to={`/users/${each.userId}`} className="text-dark">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={each.profilePic}
                    alt={each.userName}
                    className="img-fluid rounded-circle avatar me-3"
                  />
                  <h6>{each.userName}</h6>
                </div>
              </Link>
              <div className="my-3">
                <img
                  src={each.imageUrl}
                  alt={each.postId}
                  className="img-fluid rounded"
                />
              </div>
              <div className="card-body col-6 col-md-3 p-0">
                <ul className="d-flex justify-content-between align-items-center  mb-3">
                  <li>
                    <button
                      type="button"
                      className="btn border-0"
                      onClick={() => onClickLikePost(each.postId)}
                    >
                      {each.isLike ? (
                        <FcLike className="post-control-btns " />
                      ) : (
                        <FcLikePlaceholder className="post-control-btns " />
                      )}
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn border-0">
                      <FaCommentAlt className="post-control-btns " />
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn border-0">
                      <FaShare className="post-control-btns " />
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <b>{each.likesCount} Likes</b>
                <br />
                <b>{each.caption}</b>
                <ul>
                  {each.comments.map((each) => (
                    <li key={each.userId}>
                      <div>
                        <span>
                          <b className="me-2">{each.userName}</b>
                          {each.comment}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <b>{each.createdAt}</b>
              </div>
            </li>
          ))}
        {postData.length !== 1 && NotFoundSearchResults()}
      </ul>
    );
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
      <div className="row">{RenderCondition()}</div>
    </div>
  );
};

export default PostCards;
