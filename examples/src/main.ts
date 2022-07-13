import { Application, filters, Sprite, Texture } from 'pixi.js';
import './style.css';
import { MiguUI, UIElement } from '../../src/index';
import coffee from '../coffee.png';
async function load(){
  const app = new Application({resizeTo: window});
  document.body.appendChild(app.view);

  app.stage.filters = [new filters.FXAAFilter()];

  const ui = new MiguUI(app.stage, app.view);
  const element = new UIElement({
    anchor: 'bottom right',
    color: 0xff0000,  
    radius: 20, 
    border: {
      color: 0x0000ff, 
      thickness: 10
    },
    padding: 20
  });
  const texture = await Texture.fromURL(coffee);
  element.setContent(new Sprite(texture));
  ui.addElement(element);

  window.addEventListener('resize', resize);

  function resize(){
    app.resize();
    ui.update();
  }

  document.addEventListener('fullscreenchange', resize);
}

load();