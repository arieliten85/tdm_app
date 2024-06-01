import "bootstrap/dist/css/bootstrap.min.css";

import "../src/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import { NavBar01 } from "./components/navBar01/NavBar01";
import Home from "./pages/Home";

import { DetailsContainer } from "./components/details/detailsContainer/DetailsContainer";
import { WhatsAppButton } from "./components/whatsAppButton/WhatsAppButton";

function App() {
  return (
    <div className="app">
      <NavBar01 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<DetailsContainer />} />
      </Routes>

      <WhatsAppButton />
    </div>
  );
}

export default App;
