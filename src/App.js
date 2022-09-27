import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AddArticles from "./pages/addArticle";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReadArticle from "./pages/readArticle";
import Register from "./pages/Register";
import UpdateArticle from "./pages/updateArticle";
import UpdateProfile from "./pages/updateProfile";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/articles/add" element={<AddArticles />} />
            <Route path="/dashboard/articles/:uuid" element={<ReadArticle />} />
            <Route path="/articles/view/:slug" element={<ReadArticle />} />
            <Route
              path="/dashboard/articles/update/:uuid"
              element={<UpdateArticle />}
            />
            <Route
              path="/dashboard/profile/update/"
              element={<UpdateProfile />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
