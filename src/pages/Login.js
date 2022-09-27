import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import { getMyArticles } from "../features/articles/articleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { email, password } = formData;
  useEffect(() => {
    if (isError && message !== false) {
      toast.error(message);
      dispatch(reset());
      // dispatch(resetArticles());
    }
    if (isSuccess) {
      toast.success(message);
      navigate("/dashboard");
      dispatch(reset());
      dispatch(getMyArticles());
      // dispatch(resetArticles());
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <>
      <section className="heading">
        <h1 className="text-primary">
          <FaSignInAlt /> Login
        </h1>
        <p>Please sign in</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            {" "}
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
            {" "}
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
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onSubmit={onSubmit}
            >
              {isLoading ? "...loading" : "Loading"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
