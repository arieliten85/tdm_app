import { Spinner } from "react-bootstrap";

export const NotFoundData = () => {
  return (
    <h1
      className=" text-center   p-3 text-white "
      style={{
        backgroundColor: "#e6762bee",
        textTransform: "uppercase",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      No tenemos resultados para tu búsqueda. Por favor, intentá con otros
      filtros.
    </h1>
  );
};

export const ShowSpinner = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner className="fs-3" />
    </div>
  );
};
