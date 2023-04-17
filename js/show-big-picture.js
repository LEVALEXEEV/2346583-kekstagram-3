import {escKeydownHandler, anotherAreaClickHandler} from './util.js';

let onBigPictureEscKeydown;
let onAnotherAreaClick;
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureComments = bigPictureSection.querySelector('.comments-count');
const bigPictureCloseButton = bigPictureSection.querySelector('.big-picture__cancel');
const authorComment = bigPictureSection.querySelector('.social__caption');


export function onPictureClick(evt) {
  const element = evt.target.closest('.picture');
  if (element) {
    const image = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes').textContent;
    const comments = element.querySelector('.picture__comments').textContent;

    bigPictureImg.src = image.src;
    bigPictureImg.style.transform = image.style.transform;
    bigPictureImg.classList = image.classList;
    bigPictureImg.style.filter = image.style.filter;

    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments;
    authorComment.textContent = image.alt;

    bigPictureSection.classList.remove('hidden');
    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    onBigPictureEscKeydown = escKeydownHandler(document, closeBigPicture);
    onAnotherAreaClick = anotherAreaClickHandler(document, '.big-picture', closeBigPicture);

    const commentForm = document.querySelector('.social__footer');
    const sentButton = commentForm.querySelector('.social__footer-btn');
    sentButton.addEventListener('click', (evt) => {
      const newComment = document.querySelector('.social__comment').cloneNode(true);
      const avatar = newComment.querySelector('.social__picture');
      avatar.src = document.querySelector('.social__footer').querySelector('.social__picture').src;
      const commentText = newComment.querySelector('.social__text');
      commentText.textContent = commentForm.querySelector('.social__footer-text').value;
      document.querySelector('.social__comments').append(newComment);
    })
  }
}

function closeBigPicture() {
  bigPictureSection.classList.add('hidden');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.removeEventListener('click', onAnotherAreaClick);
}
