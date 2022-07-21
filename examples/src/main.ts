import { Application, filters, Sprite, Texture } from 'pixi.js';
import './style.css';
import { Button, MiguUI } from '../../src/index';
import coffee from '../coffee.png';
import google from '../google.png';
import { Viewport } from 'pixi-viewport';
async function load(){
  const app = new Application({resizeTo: window});
  document.body.appendChild(app.view);

  const viewport = new Viewport({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight,
    //@ts-ignore
    interaction: app.renderer.plugins.interaction
  });

  viewport.drag().wheel();

  app.stage
  .addChild(viewport);

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

  viewport.addChild(new Sprite(await Texture.fromURL(coffee)));

  window.addEventListener('resize', resize);

  function resize(){
    app.resize();
    ui.update();
  }

  document.addEventListener('fullscreenchange', resize);
}

load();