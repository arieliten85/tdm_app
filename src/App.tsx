import "bootstrap/dist/css/bootstrap.min.css";

import "../src/styles/index.scss";
import { Routes, Route } from "react-router-dom";
import { NavBar01 } from "./components/navBar01/NavBar01";
import Home from "./pages/Home";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { DetailsContainer } from "./components/details/detailsContainer/DetailsContainer";

function App() {
  return (
    <div className="app">
      <NavBar01 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<DetailsContainer />} />
      </Routes>
      <FloatingWhatsApp
        phoneNumber="541162331432"
        style={{ padding: "10px", backgroundColor: "#25d366", width: "100%" }}
        chatboxStyle={{ paddingTop: 10 }}
        accountName="Mari"
        avatar="https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
        chatMessage="¡Hola! ¿En qué puedo ayudarte?"
        chatboxHeight={400}
      />
    </div>
  );
}

export default App;
