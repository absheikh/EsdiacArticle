import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap-4-react/lib/components";
import { register, reset } from "../features/auth/authSlice";
import LoadingSpinner from "../common/Loader";

function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, fname, password, confirmPassword } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message);
      navigate("/dashboard");
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
    const userData = {
      email,
      name: fname,
      password,
    };
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register(userData));
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <section className="heading">
        <h1 className="text-primary">
          <FaUser /> Register
        </h1>{" "}
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              value={fname}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block btn-primary">
              {isLoading ? "...loading" : "Register"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
