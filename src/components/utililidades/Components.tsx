import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFoundData = () => {
  return (
    <div className=" mt-3">
      <h1
        className=" text-center p-3 text-white "
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
    </div>
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

interface TitleCategory {
  title: string;
}
export const TitleCategory = ({ title }: TitleCategory) => {
  return (
    <>
      <div className="title-category-container">
        <div className="line"></div>
        <h1>{title}</h1>
      </div>
    </>
  );
};

export const AllProductsButton = () => {
  return (
    <>
      <Link to={"/productos"}>
        <div className="allProductsButton">
          <Button className="button">Todos los productos</Button>
        </div>
      </Link>
    </>
  );
};
