import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  getMyArticles,
  deleteArticle,
} from "../features/articles/articleSlice";

import { format } from "date-fns";
import { Row, Col } from "bootstrap-4-react/lib/components/layout";
import { toast } from "react-toastify";

const ReadArticle = () => {
  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { my_articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMyArticles());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate]);

  const dispatch = useDispatch();

  const handleDeleteArticle = () => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteArticle(state.article.uuid));

      toast.success("Article deleted successfully");
      navigate("/dashboard");
    } else {
      toast.error("Cancelled");
    }
  };

  return (
    <>
      <Row className="mb-5">
        <Col col="12">
          <h1 className="text-primary">{state.article.title}</h1>
          <h5 className="text-primary text-muted">
            {format(new Date(state.article.createdAt), "dd MMM yyyy")}
            {user ? (
              user.uuid !== state.article.user ? (
                <span className="ml-5">{state.article.username}</span>
              ) : (
                ""
              )
            ) : (
              <span className="ml-5">{state.article.username}</span>
            )}
          </h5>
        </Col>
      </Row>

      <Row className="text-align-left">
        <Col sm="12" className="mb-2 ">
          <div dangerouslySetInnerHTML={{ __html: state.article.content }} />
        </Col>
        <Col>
          {user ? (
            user.uuid !== state.article.user ? (
              ""
            ) : (
              <div className="d-flex border-top mt-4 pt-2">
                <button
                  className="btn btn-danger mr-5"
                  onClick={handleDeleteArticle}
                >
                  Delete
                </button>
                <button
                  className="
                    btn
                    btn-info"
                  onClick={() =>
                    navigate(
                      `/dashboard/articles/update/${state.article.slug}`,
                      {
                        // replace: true,
                        state: {
                          article: state.article,
                        },
                      }
                    )
                  }
                >
                  Update
                </button>
              </div>
            )
          ) : (
            ""
          )}
          <Link to="/dashboard" className="btn btn-light mt-4">
            Back
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default ReadArticle;
