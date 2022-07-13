import { Application, filters, Sprite, Texture } from 'pixi.js';
import './style.css';
import { MiguUI, UIElement } from '../../src/index';
import coffee from '../coffee.png';
async function load(){
  const app = new Application({width: window.innerWidth, height: window.innerHeight});
  document.body.appendChild(app.view);

  app.stage.filters = [new filters.FXAAFilter()];

  const ui = new MiguUI(app.stage, {width: app.view.width, height: app.view.height});
  const element = new UIElement({
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
  ui.addChild(element);

  window.addEventListener('resize', resize);

  function resize(){
    app.view.height = window.innerHeight;
    app.view.width = window.innerWidth;
  }
}

load();