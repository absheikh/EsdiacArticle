import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  getMyArticles,
  deleteArticle,
} from "../features/articles/articleSlice";

import { format } from "date-fns";
import { Row, Col } from "bootstrap-4-react/lib/components/layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { my_articles, isLoading, isError, message } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getMyArticles());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate]);

  const dispatch = useDispatch();

  return (
    <>
      <Row className="mb-5">
        <Col col="12">
          <h1 className="text-primary">Dashboard</h1>
          <h5 className="text-primary text-muted">
            Welcome to Esdiac article dashboard.
          </h5>
        </Col>
      </Row>

      <Row className="text-align-left">
        <Col md="6" className="mb-2  shadow p-3 mb-5 bg-white rounded">
          <h4 className="bg-primary text-white border-bottom p-2 rounded shadow-sm">
            Published Articles
          </h4>
          {my_articles.length > 0 ? (
            my_articles
              .filter((article) => article.status === "published")
              .map((article) => (
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
                  <p className="text-muted list-articles">
                    <span className="d-block text-right">
                      {format(new Date(article.createdAt), "dd MMM yyyy")}
                    </span>
                  </p>
                </div>
              ))
          ) : (
            <p className="text-danger">No articles found</p>
          )}
        </Col>
        <Col md="5" className="mb-2 mx-4  shadow p-3 mb-5 bg-white rounded">
          <h4 className="text-danger border-bottom p-2  ">Draft Articles</h4>
          {my_articles.length > 0 ? (
            my_articles
              .filter((article) => article.status === "draft")
              .map((article) => (
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
                  <p className="text-muted list-articles">
                    <span className="d-block text-right">
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
      </Row>
    </>
  );
};

export default Dashboard;
