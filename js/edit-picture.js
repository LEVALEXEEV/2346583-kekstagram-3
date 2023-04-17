
const valueField = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
let selectedEffect = 'none';

export function onEffectButtonClick(evt) {
  selectedEffect = evt.target.value;
  setEffect(selectedEffect);
}

export function setEffect(effect) {
  selectedEffect = effect;
  preview.className = '';
  preview.classList.add(`effects__preview--${selectedEffect}`);

}

export const onControlSmallerButtonClick = () => {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) - 25;
  if (percent >= 25) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '25%';
  }
};

export const onControlBiggerButtonClick = () => {
  let percent = valueField.value;
  percent = parseInt(percent.slice(0, -1), 10) + 25;

  if (percent <= 100) {
    setPictureScale(percent);
    valueField.value = `${percent}%`;
  } else {
    valueField.value = '100%';
  }
};

export function setPictureScale(value) {
  preview.style.transform = `scale(${value/100})`;
}
