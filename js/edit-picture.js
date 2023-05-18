
import {EFFECTS} from './data.js';

const preview = document.querySelector('.img-upload__preview img');
const sliderBlock = document.querySelector('.img-upload__effect-level');
const slider = sliderBlock.querySelector('.effect-level__slider');
const sliderValue = sliderBlock.querySelector('.effect-level__value');
let selectedEffect = 'none';

export function createSlider() {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  slider.noUiSlider.on('update', () => {
    const value = slider.noUiSlider.get();
    sliderValue.value = value;
    const effect = EFFECTS[selectedEffect];
    setPictureEffect(effect, value);
  });

  sliderBlock.classList.add('hidden');
}

function changeSliderEffect() {
  const effect = EFFECTS[selectedEffect];
  if (effect.name === 'none') {
    setPictureEffect(effect);
    sliderValue.value = 0;
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
    slider.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max
      },
      start: effect.max,
      step: effect.step
    });
  }
}

export function destroySlider() {
  slider.noUiSlider.destroy();
}

export function onEffectButtonClick(evt) {
  selectedEffect = evt.target.value;
  setEffect(selectedEffect);
}

export function setEffect(effect) {
  selectedEffect = effect;
  preview.className = '';
  preview.classList.add(`effects__preview--${selectedEffect}`);
  changeSliderEffect();
}

export function setPictureEffect(effect, value = 0) {
  if (effect.name === 'none') {
    preview.style.filter = '';
  } else {
    preview.style.filter = `${effect.filter}(${value}${effect.size})`;
  }
}


const valueField = document.querySelector('.scale__control--value');

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
