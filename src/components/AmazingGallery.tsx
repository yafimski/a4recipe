import {
  faChevronLeft,
  faChevronRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { allPossibleIngredients } from "../utils/data";
import Modal from "react-modal";

interface AmazingGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

function AmazingGallery({ isOpen, onClose }: AmazingGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((currIdx) => (currIdx + 1) % allPossibleIngredients.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((currIdx) =>
      currIdx === 0 ? allPossibleIngredients.length - 1 : currIdx - 1
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    },
    [nextImage, prevImage]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  Modal.setAppElement(document.getElementById("root")!);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className="modal-container"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal-content">
        <button type="button" className="close-modal-button" onClick={() => onClose()}>
          <FontAwesomeIcon icon={faClose} className="text-2xl" />
        </button>
        <span className="modal-image-title">{allPossibleIngredients[currentIndex]}</span>
        <img
          src={`../src/assets/ingredients/${allPossibleIngredients[
            currentIndex
          ].toLowerCase()}.webp`}
          alt={`${allPossibleIngredients[currentIndex]}`}
          className="modal-image"
        />
        <div className="modal-nav-buttons">
          <button type="button" className="nav-button prev" onClick={prevImage}>
            <FontAwesomeIcon icon={faChevronLeft} className="text-3xl ml-4" />
          </button>
          <button type="button" className="nav-button next" onClick={nextImage}>
            <FontAwesomeIcon icon={faChevronRight} className="text-3xl ml-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AmazingGallery;
