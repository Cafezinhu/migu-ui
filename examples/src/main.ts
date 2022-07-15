import { Application, filters, Sprite, Texture } from 'pixi.js';
import './style.css';
import { Button, MiguUI } from '../../src/index';
import coffee from '../coffee.png';
import google from '../google.png';
async function load(){
  const app = new Application({resizeTo: window});
  document.body.appendChild(app.view);

  app.stage.filters = [new filters.FXAAFilter()];

  const ui = new MiguUI(app.stage, app.view);
  const element = new Button({
    anchor: 'left',
    contentDirection: 'column',
    crossAlignment: 'center',
    gap: 20,
    color: 0xff0000,  
    radius: 20, 
    border: {
      color: 0x0000ff, 
      thickness: 10
    },
    padding: 20,
    onClick: () => console.log('clicked!')
  });
  const coffeeTexture = await Texture.fromURL(coffee);
  const googleTexture = await Texture.fromURL(google);
  element.addContent([new Sprite(coffeeTexture), new Sprite(googleTexture)]);
  ui.addElement(element);

  window.addEventListener('resize', resize);

  function resize(){
    app.resize();
    ui.update();
  }

  document.addEventListener('fullscreenchange', resize);
}

load();