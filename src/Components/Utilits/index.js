import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { TbGridDots } from "react-icons/tb";

export const InistalFetchingStatus = {
  INITIAL: "Initial",
  SUCCESS: "Success",
  FAILURE: "Failure",
  INPROGRESS: "InProgress",
};

export const CallPostApi = async (path, bodyData) => {
  try {
    const url = `https://apis.ccbp.in/${path}`;

    const options = {
      method: "POST",
      body: JSON.stringify(bodyData),
    };

    const req = await fetch(url, options);
    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.error_msg);
    } else {
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CallGetApi = async (path) => {
  let token = Cookies.get("jwt_token");

  try {
    const url = `https://apis.ccbp.in/${path}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await fetch(url, options);
    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.error_msg);
    } else {
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CallLikePostApi = async (path, bodyData) => {
  let token = Cookies.get("jwt_token");

  try {
    const url = `https://apis.ccbp.in/${path}`;

    const options = {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await fetch(url, options);
    const res = await req.json();

    if (!req.ok) {
      throw new Error(res.error_msg);
    } else {
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const LoadingViewData = () => (
  <div className="d-flex justify-content-center my-5">
    <TailSpin color="blue" height={50} width={50} />
  </div>
);

export const FailureViewData = () => (
  <div className="d-flex flex-column align-items-center justify-content-center text-center my-5">
    <img
      src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
      alt="failure"
      className="img-fluid"
    />
    <h3>Something went wrong. Please try again</h3>
  </div>
);

export const DisplayCommenData = (data) => {
  return (
    <div>
      <h6 className="d-lg-none">{data.userName}</h6>
      <div className="d-flex align-items-center align-items-lg-start col-12">
        <div className="me-2 me-sm-5">
          <img
            src={data.profilePic}
            alt={data.userId}
            className="avatar rounded-circle"
          />
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <h3 className="d-none d-lg-block mb-4">{data.userName}</h3>
          <div className="d-flex justify-content-between align-items-center text-center col-12 col-md-5 col-lg-3">
            <div>
              <h6>{data.postsCount}</h6>
              <b>Posts</b>
            </div>
            <div>
              <h6>{data.followersCount}</h6>
              <b>Followers</b>
            </div>
            <div>
              <h6>{data.followingCount}</h6>
              <b>Following</b>
            </div>
          </div>
          <div className="d-none d-lg-block col-12 mt-3">
            <h6>{data.userId}</h6>
            <p>{data.userBio}</p>
          </div>
        </div>
      </div>
      <div className="d-lg-none mt-3">
        <h6>{data.userId}</h6>
        <p>{data.userBio}</p>
      </div>
      <hr />
      <div className="col-12 col-sm-6 col-lg-4">
        <div className="d-flex align-items-center mb-2">
          <TbGridDots className="dots-icon me-2" />
          <b>Stories</b>
        </div>
        <ul className="d-flex justify-content-between">
          {data.stories.map((each) => (
            <li key={each.id}>
              <img
                src={each.image}
                alt={each.id}
                className="avatar rounded-circle"
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="d-flex align-items-center mb-2">
          <TbGridDots className="dots-icon me-2" />
          <b>Posts</b>
        </div>
        <ul className="d-flex flex-wrap">
          {data.posts.map((each) => (
            <li key={each.id} className="m-2 col-12 col-sm-6 col-md-5 col-lg-3">
              <img
                src={each.image}
                alt={each.id}
                className="img-fluid rounded"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const NotFoundSearchResults = () => (
  <div className="d-flex flex-column align-items-center text-center my-5">
    <img
      src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1675684039/Group_i0rx3y.png"
      alt="not found results"
      className="img-fluid"
    />
    <h6>Search Not Found</h6>
    <p>Try different keyword or search again</p>
  </div>
);
