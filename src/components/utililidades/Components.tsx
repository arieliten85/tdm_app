import { Spinner } from "react-bootstrap";

export const NotFoundData = () => {
  return (
    <div className="flex-center-column p2" style={{ height: "100vh" }}>
      <h1
        className=" text-center mt-5 p-3 text-white "
        style={{
          backgroundColor: "#c69b739e",
          textTransform: "uppercase",
          fontSize: "15px",
        }}
      >
        sin resultados
      </h1>
    </div>
  );
};

export const ShowSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-50">
      <Spinner />
    </div>
  );
};
