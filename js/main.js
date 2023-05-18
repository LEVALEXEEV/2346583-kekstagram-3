import { displayData } from "./display-data.js";
import { loadPictures } from "./api.js";
import { submitForm } from "./validation.js";
import { closeImageUploadModal } from "./upload-picture.js";
import './upload-picture.js';



loadPictures(
  (photos) => {
    displayData(photos);
  },
  () => {
    showErrorMessage();
  }
);

submitForm(closeImageUploadModal);
