import { useState, useEffect, useRef } from "react";
import { Row, Col } from "bootstrap-4-react";
import { reset, addArticle } from "../features/articles/articleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Editor } from "@tinymce/tinymce-react";
import LoadingSpinner from "../common/Loader";

function AddArticles() {
  const editorRef = useRef(null);
  const [content, setContent] = useState();

  const [formData, setFormData] = useState({
    title: "",

    status: "published",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  );
  const { title, status } = formData;
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
    e.preventDefault();

    const data = {
      title,
      content,
      status,
    };

    dispatch(addArticle(data));
    console.log(data);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Row className="mb-5">
        <Col className="mx-auto col-sm-12 col-md-3">
          <h1 className="text-primary border-bottom">Dashboard</h1>
          <h5 className="text-primary  mb-4">Add New Article</h5>
        </Col>
      </Row>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            {" "}
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              placeholder="Title"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <Editor
              apiKey={`${process.env.REACT_APP_TINY_MCE_API_KEY}`}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(newText) => setContent(newText)}
            />
          </div>
          <div className="form-group">
            {" "}
            <select
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={onChange}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onSubmit={onSubmit}
            >
              {isLoading ? "...loading" : "Add Article"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddArticles;
