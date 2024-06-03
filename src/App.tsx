import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DetailsContainer } from "./components/details/detailsContainer/DetailsContainer";
import { WhatsAppButton } from "./components/whatsAppButton/WhatsAppButton";
import { Navigation } from "./components/navigation/Navigation";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<DetailsContainer />} />
      </Routes>

      <WhatsAppButton />
    </div>
  );
}

export default App;
