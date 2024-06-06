// HowBuy.js

import "./howBuy.scss";

export const HowBuy = () => {
  return (
    <div className="how-buy-container">
      <h2>Cómo Comprar en Nuestra Página</h2>
      <p>
        Comprar en nuestra página es muy sencillo. Sigue estos pasos y pronto
        estarás disfrutando de tus productos favoritos:
      </p>
      <ol>
        <li>
          <strong>Paso 1:</strong> Encuentra tu Producto: Utiliza nuestra barra
          de búsqueda o navega por las categorías para encontrar el producto que
          deseas comprar. ¡Tenemos una amplia variedad para ti!
        </li>
        <li>
          <strong>Paso 2:</strong> Selecciona la Cantidad: Una vez que
          encuentres el producto que te gusta, selecciona la cantidad que deseas
          comprar. ¡Puedes elegir la cantidad que más se ajuste a tus
          necesidades!
        </li>
        <li>
          <strong>Paso 3:</strong> Haz tu Compra: Cuando estés listo/a para
          comprar, simplemente haz clic en el botón "Comprar". Esto te
          redirigirá directamente a WhatsApp, donde podrás enviar un mensaje a
          nuestra vendedora.
        </li>
        <li>
          <strong>Paso 4:</strong> Envía tu Mensaje: Una vez en WhatsApp, se
          generará automáticamente un mensaje con un saludo a nuestra vendedora,
          junto con los detalles del producto que deseas comprar. Esto incluirá
          el título, el precio por unidad, la cantidad seleccionada y el precio
          total.
        </li>
        <li>
          <strong>Paso 5:</strong> Espera la Confirmación: Una vez que hayas
          enviado tu mensaje, nuestra vendedora revisará tu solicitud y te
          informará sobre la disponibilidad de stock. ¡Estamos aquí para
          ayudarte en todo momento!
        </li>
      </ol>
    </div>
  );
};
