import "../src/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./utils/ScrollToTop";
import { Home } from "./pages/Home";
import { WhatsAppButton } from "./components/whatsAppButton/WhatsAppButton";
import { Navigation } from "./components/navigation/Navigation";
import { Nosotros } from "./components/nosotros/Nosotros";
import { Footer } from "./components/footer/Footer";
import { HowBuy } from "./components/howBuy/HowBuy";
import { Gallery } from "./components/galery/Gallery";

import { Productos } from "./pages/Productos";
import { DetailsContainer } from "./components/details/detailsContainer/DetailsContainer";

export function App() {
  return (
    <div className="app">
      <ScrollToTop>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetailsContainer />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/comoComprar" element={<HowBuy />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/search" element={<Productos />} />
        </Routes>

        <Footer />
        <WhatsAppButton />
      </ScrollToTop>
    </div>
  );
}
