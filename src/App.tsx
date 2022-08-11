import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// Components
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { MakeReviewPage } from "./pages/MakeReviewPage";

import { ReviewPage } from "./pages/ReviewPage";

// CSS
import "./styles/App.scss";
import { MoviePage } from "./pages/MoviePage";

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/homepage/action");
  }, []);
  return <h1>Loading...</h1>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/review/:review_id" element={<ReviewPage />} />
          <Route
            path="/make_review/:movieName/:movieProfilePicture"
            element={<MakeReviewPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage/:category_id" element={<HomePage />} />
          <Route path="/movie/:movie_id" element={<MoviePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
