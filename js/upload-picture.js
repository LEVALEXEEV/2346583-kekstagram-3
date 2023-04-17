import {pristine} from "./validation.js";
import {onEffectButtonClick, setEffect, setPictureScale, onControlSmallerButtonClick, onControlBiggerButtonClick} from './edit-picture.js';

const pictureUploadForm = document.querySelector('#upload-select-image');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const pictureUploadOverlay = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureInput = pictureUploadForm.querySelector('#upload-file');
const overlayCloseButton = pictureUploadForm.querySelector('#upload-cancel');
const effects = document.querySelector('.effects__list');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

export function closeImageUploadModal() {
  pictureUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  setEffect('none');
  setPictureScale(100);
  pristine.reset();
  pictureUploadForm.reset();
}

// show modal (when image uploaded)
pictureInput.addEventListener('change', function(evt) {
  pictureUploadOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');

  const uploadedImage = document.querySelector('#upload-file').files[0];
  const fileReader = new FileReader();

  fileReader.onloadend = function() {
    preview.src = fileReader.result;
  };
  fileReader.readAsDataURL(uploadedImage);

  effects.addEventListener('change', onEffectButtonClick);
  scaleSmallerButton.addEventListener('click', onControlSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onControlBiggerButtonClick);
});

// close modal
overlayCloseButton.addEventListener('click', function(evt) {
  closeImageUploadModal();
});
document.addEventListener('keydown', function(evt) {
  if (evt.key == "Escape") closeImageUploadModal();
})
