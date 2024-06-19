import '../src/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './utils/ScrollToTop';
import { Home } from './pages/Home';
import { WhatsAppButton } from './components/whatsAppButton/WhatsAppButton';
import { Navigation } from './components/navigation/Navigation';
import { Nosotros } from './components/nosotros/Nosotros';
import { Footer } from './components/footer/Footer';
import { HowBuy } from './components/howBuy/HowBuy';
import { Gallery } from './components/galery/Gallery';

import { DetailsContainer } from './components/details/detailsContainer/DetailsContainer';
import { ProductosPage } from './pages/ProductosPage';
import { SearchPage } from './pages/SearchPage';

export function App() {
  return (
    <div className="app">
      <ScrollToTop>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/:categoria" element={<ProductosPage />} />
          <Route path="/productos/:title" element={<DetailsContainer />} />

          <Route path="/galeria" element={<Gallery />} />
          <Route path="/comoComprar" element={<HowBuy />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

        <Footer />
        <WhatsAppButton />
      </ScrollToTop>
    </div>
  );
}
