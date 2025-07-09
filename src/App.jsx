import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import StatsPage from "./components/StatsPage";
import RedirectPage from "./components/RedirectPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path=":shortcode" element={<RedirectPage />} />
    </Routes>
  </Router>
);

export default App;