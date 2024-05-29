import "bootstrap/dist/css/bootstrap.min.css";

import "../src/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import { NavBar01 } from "./components/navBar01/NavBar01";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <NavBar01 />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
