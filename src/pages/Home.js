import React, { useEffect } from "react";
import { Row, Col } from "bootstrap-4-react/lib/components/layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../features/articles/articleSlice";
import { reset, getAllUsers } from "../features/auth/authSlice";
import { format } from "date-fns";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles } = useSelector((state) => state.articles);
  const { user, users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllUsers());
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  return (
    <>
      <Row className="mb-5">
        <Col col="12">
          <h1 className="text-primary">Esdiac Article</h1>
          <h5 className="text-primary text-muted">
            Simplified article system using ReactJS, Redux Toolkit, Bootstrap
            and NodeJS
          </h5>
        </Col>
      </Row>

      <Row className="text-align-left">
        <Col md="7" className="mb-2  shadow p-3 mb-5 bg-white rounded">
          <h4 className="bg-primary text-white border-bottom p-2 rounded shadow-sm">
            Latest Articles
          </h4>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div className="py-2 my-2 border-bottom" key={article.id}>
                <p
                  className="text-dark  mb-2 font-weight-bold  text-uppercase hover-article"
                  onClick={() =>
                    navigate(`/articles/view/${article.slug}`, {
                      // replace: true,
                      state: {
                        article: article,
                      },
                    })
                  }
                >
                  {article.title}
                </p>
                <p className="d-flex justify-content-between text-muted list-articles">
                  {article.username}

                  <span className="">
                    {format(new Date(article.createdAt), "dd MMM yyyy")}
                  </span>
                  {}
                </p>
              </div>
            ))
          ) : (
            <p className="text-danger">No articles found</p>
          )}
        </Col>
        <Col
          md="4"
          className="mx-4  shadow p-3 mb-5 bg-primary rounded"
          style={{ height: "10% !important" }}
        >
          <h5 className="text-white border-bottom py-2">Users</h5>
          {users.length > 0 ? (
            users.map((user) => (
              <Link
                key={user.id}
                className="d-block bg-white  mb-2 text-dark p-2 rounded"
                to={`/users/${user.uuid}`}
              >
                {user.name}
              </Link>
            ))
          ) : (
            <p className="text-danger">No users found</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
