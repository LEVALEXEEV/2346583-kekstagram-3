import { onPictureClick } from "./show-big-picture.js";

const createPictureFromData = ({url, description, comments, likes}, pictureTemplate) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureComments = pictureElement.querySelector('.picture__comments');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureImage.src = url;
  pictureImage.alt = description;
  pictureComments.textContent = comments;
  pictureLikes.textContent = likes;

  return pictureElement;
}



export const displayData = (data) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) fragment.append(createPictureFromData(data[i], pictureTemplate));
  const container = document.querySelector('.pictures');
  container.append(fragment);
  container.addEventListener('click', onPictureClick);
}

export function addPicture(information) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picture = pictureTemplate.cloneNode(true);
  const pictureImage = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');
  pictureComments.textContent = 0;
  pictureLikes.textContent = 0;

  pictureImage.src = information.src;
  pictureImage.alt = `${information.description} ${information.hashtags}`;
  pictureImage.style.transform = information.scale;
  pictureImage.classList.add(information.class);
  pictureImage.style.filter = information.filter;
  document.querySelector('.pictures').append(picture);
}
