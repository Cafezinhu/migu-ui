import { UIPoint } from "./UIPoint";

export type Anchor = 'top left'   |  'top'   | 'top right' | 
                     'left'       | 'center' | 'right'     | 
                    'bottom left' | 'bottom' | 'bottom right';

export function anchorToPosition(anchor: Anchor): UIPoint{
    switch(anchor){
        case 'top left':
            return {x: 0, y: 0};
        case 'top':
            return {x: 0.5, y: 0};
        case 'top right':
            return {x: 1, y: 0};
        case 'left':
            return {x: 0, y: 0.5};
        case 'center':
            return {x: 0.5, y: 0.5};
        case 'right':
            return {x: 1, y: 0.5};
        case 'bottom left':
            return {x: 0, y: 1};
        case 'bottom':
            return {x: 0.5, y: 1};
        case 'bottom right':
            return {x: 1, y: 1};
   }
}