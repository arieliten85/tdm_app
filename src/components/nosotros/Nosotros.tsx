import "./nosotros.scss";
import { FaHome, FaEnvelope } from "react-icons/fa";

export const Nosotros = () => {
  return (
    <div className="nosotros-container ">
      <section className="quienes-somos">
        <h1>¿Quiénes Somos?</h1>
        <p>
          Todo Dulce Mary comenzó como un pequeño hobby de María, una apasionada
          de la repostería desde su niñez. María, conocida cariñosamente como
          Mary, siempre disfrutó horneando tortas y cosas dulces para su
          familia. Lo que empezó como una simple diversión en su cocina, poco a
          poco se transformó en una pasión que no podía ignorar. A lo largo de
          los años, Mary perfeccionó sus habilidades, asistiendo a talleres y
          cursos de repostería, experimentando con nuevas recetas y técnicas.
          Cada creación suya estaba hecha con la máxima dedicación, amor y
          utilizando solo los mejores productos. Su compromiso con la calidad y
          el detalle pronto empezó a llamar la atención, y lo que era un
          pasatiempo se convirtió en una demanda constante de sus deliciosos
          postres. En 2010, decidió dar un paso más y fundó Todo Dulce Mary, una
          pastelería que refleja su amor por el arte de la repostería. Desde
          entonces, ha dedicado cada día a crear dulces que no solo deleitan el
          paladar sino que también tocan el corazón de quienes los prueban. Su
          reputación se construyó sobre la base de ingredientes frescos, sabores
          auténticos y una presentación impecable. Todo Dulce Mary se destaca
          por su sabor inigualable y por sus tortas personalizadas, diseñadas
          para hacer cada celebración única y especial. Con años de trayectoria,
          Mary ha transformado Todo Dulce Mary en un referente destacado en el
          ámbito de la repostería, siempre innovando y adaptándose a las nuevas
          tendencias, pero sin perder nunca la esencia de lo artesanal y lo
          casero. Cada torta y cada creación es una obra de amor, pensada para
          hacer de tus momentos especiales, momentos inolvidables. Hoy, Todo
          Dulce Mary sigue siendo un lugar donde se respira la pasión por la
          repostería.
        </p>
      </section>
      <section className="contacto">
        <h2>Contacto</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.492447162654!2d-58.38375948426091!3d-34.70900598043167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd2b3f15e0a7%3A0xf1d2b74df0840d1!2sRio%20de%20Janeiro%202678%2C%20B1824BFS%20Lan%C3%BAs%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1680581222463!5m2!1sen!2sus"
          title="Google Map"
          className="map"
          allowFullScreen
          loading="lazy"
        ></iframe>

        <div className="contact-info">
          <div className="contact-item">
            <FaHome className="icon" />
            <span>Rio de Janeiro 2678, Lanus Oeste</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>tododulcemary@gmail.com</span>
          </div>
        </div>
      </section>
    </div>
  );
};
