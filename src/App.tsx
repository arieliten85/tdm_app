import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DetailsContainer } from "./components/details/detailsContainer/DetailsContainer";
import { WhatsAppButton } from "./components/whatsAppButton/WhatsAppButton";
import { Navigation } from "./components/navigation/Navigation";
import { Nosotros } from "./components/nosotros/Nosotros";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<DetailsContainer />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
