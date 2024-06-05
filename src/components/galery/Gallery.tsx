import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./galery.scss";
import "../../styles/index.scss";
import { imagesData } from "../../api/galeria";

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOptionalImages, setSelectedOptionalImages] = useState<
    string[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string>("");

  const openModal = (
    imageUrl: string,
    desc: string,
    optionalImages: string[]
  ) => {
    setSelectedImage(imageUrl);
    setSelectedDescription(desc);
    setSelectedOptionalImages([imageUrl, ...optionalImages]);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedOptionalImages([]);
    setShowModal(false);
  };

  const handleOptionalImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <>
      <h1 className="text-center fs-1">Galería</h1>

      <div className="gallery flex-center-column">
        <section
          className="
        gallery-item
        grid-column-mobile
        p-1 
      
        
        
        "
        >
          {imagesData.map((image) => (
            <div
              className="image-container"
              key={image.id}
              onClick={() =>
                openModal(
                  image.mainImage.src,
                  image.mainImage.description,
                  image.optionalImages.map((optImage) => optImage.src)
                )
              }
            >
              <img src={image.mainImage.src} />
            </div>
          ))}
        </section>
      </div>

      <Modal
        className="modal-gallery"
        show={showModal}
        onHide={closeModal}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage || ""}
            alt="Selected Image"
            style={{ width: "100%", height: "350px" }}
          />
          <p className="description">{selectedDescription}</p>
          <div className="optional-images">
            {selectedOptionalImages.map((optionalImage, index) => (
              <img
                key={index}
                src={optionalImage}
                alt={`Optional Image ${index + 1}`}
                style={{
                  width: "50px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => handleOptionalImageClick(optionalImage)}
              />
            ))}
          </div>
          <div className="button-container">
            <Button className="button" onClick={closeModal}>
              Consultar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
