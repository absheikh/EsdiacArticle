import { useState, useEffect, useRef } from "react";
import { Row, Col } from "bootstrap-4-react";
import { reset, addArticle } from "../features/articles/articleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Editor } from "@tinymce/tinymce-react";
import { updateUser } from "../features/auth/authSlice";
import LoadingSpinner from "../common/Loader";

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: user.name,
  });
  const { name } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message);
      //   navigate("/dashboard");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();

    const data = {
      name,
    };

    dispatch(updateUser(data));
    console.log(data);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Row className="mb-5">
        <Col className="mx-auto col-sm-12 col-md-3">
          <h1 className="text-primary border-bottom">Dashboard</h1>
          <h5 className="text-primary  mb-4">Update Profile</h5>
        </Col>
      </Row>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            {" "}
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onSubmit={onSubmit}
            >
              {isLoading ? "...loading" : "Update"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UpdateProfile;
