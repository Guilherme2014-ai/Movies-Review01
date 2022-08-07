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
import "./App.scss";

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
          <Route path="/make_review/:movieName" element={<MakeReviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage/:category_slug" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
