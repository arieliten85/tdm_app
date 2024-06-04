import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { phoneNumber } from "../../api/whatapp";
import { Link } from "react-router-dom";

export const WhatsAppButton = () => {
  return (
    <Link to={`https://wa.me/${phoneNumber}`} target="_blank">
      <div
        className="whatsapp-icon position-fixed   p-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#25d366",
          color: "white",
          fontSize: "20px",
          borderRadius: "50px",
          bottom: "90px",
          right: "15px",
          height: "50px",
          width: "50px",
        }}
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "32px" }} />
      </div>
    </Link>
  );
};
