const {App, detectRussian} = require('../src/app.js');
const Slider = require('../src/slider.component.js');

describe("Detect russian function", () => {
  test("it should return true if string has any russian letter", () => {
    expect(detectRussian('sdjfhrugf')).toEqual(false);
    expect(detectRussian('sdjfffdsdffhrugf')).toEqual(false);
    expect(detectRussian('sdjfhr4254ugf')).toEqual(false);
    expect(detectRussian('sdjапрfhrugf')).toEqual(true);
    expect(detectRussian('павпв')).toEqual(true);
    expect(detectRussian('sdГАgf')).toEqual(true);
    expect(detectRussian('SSJKHFKЛЛЛ')).toEqual(true);
    expect(detectRussian('42445')).toEqual(false);
  });
});

describe("Slider component test", () => {
  document.body.innerHTML='<div id="app"></div>';
  let parent = document.getElementById('app');
  let slider = new Slider(parent);
  let maxCounter = 0;
  slider.onRightMax = () => {
    maxCounter++;
  }

  test("Slider is a class", () => {
    expect(typeof Slider).toEqual('function');
    expect(typeof slider).toEqual('object');
  });

  test("Slider.addSlide should add slide and increment slides length", () => {
    expect(slider.slides.length).toEqual(0);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(1);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(2);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(3);
  });

  test("Slider.clear should delete all slides", () => {
    slider.clear();
    expect(slider.slides.length).toEqual(0);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(1);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(2);
    slider.addSlide('');
    expect(slider.slides.length).toEqual(3);
  });

  test("Set position", () => {
    slider.setPosition(0);
    expect(slider.currentPosition).toEqual(0);
    slider.setPosition(2);
    expect(slider.currentPosition).toEqual(2);
    slider.setPosition(0);
    expect(slider.currentPosition).toEqual(0);
    slider.addSlide('');
    expect(slider.currentPosition).toEqual(0);
  });

  test("right and left buttons and lock flag", () => {
    slider.clear();
    for (let i=0; i<10; i++){
      slider.addSlide('');
    }

    slider.bottomControl.buttons[1].click();
    expect(slider.currentPosition).toEqual(1);

    for (let i=slider.currentPosition; i<slider.getMaxPosition(); i++){
      slider.rightButton.click();
      expect(slider.currentPosition).toEqual(i+1);
    }

    slider.rightButton.click();
    expect(slider.currentPosition).toEqual(slider.getMaxPosition());

    expect(maxCounter).toEqual(1);
    slider.rightButton.click();
    expect(maxCounter).toEqual(1);
    slider.lock = false;
    slider.rightButton.click();
    expect(maxCounter).toEqual(2);
    slider.lock = false;
  });
  
});
