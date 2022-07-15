import { DisplayObject, Graphics } from "pixi.js";
import { Anchor, anchorToPoint } from "./types/Anchor";
import { UIPoint } from "./types/UIPoint";

export type UIElementOptions = {
    relativePositionToAnchor?: UIPoint;
    anchor?: Anchor;
    color: number;
    alpha?: number;
    height?: number;
    width?: number;
    radius?: number;
    border?: Border;
    gap?: number;
    contentDirection?: 'column' | 'row';
    crossAlignment?: 'start' | 'center' | 'end';
    padding?: {
        vertical: {
            top: number;
            bottom: number;
        } | number;
        horizontal:{
            left: number;
            right: number;
        } | number;
    } | number;
}

export type Border = {
    color: number;
    thickness: number;
}

export class UIElement extends Graphics{
    options: UIElementOptions;
    content: DisplayObject[] = [];

    constructor(options?: UIElementOptions){
        super();
        this.options = options;
        this.draw();
        
        if(!options.anchor) 
            this.options.anchor = 'top left';
        if(!options.relativePositionToAnchor) 
            this.options.relativePositionToAnchor = {x: 0, y: 0};
        if(!options.contentDirection)
            this.options.contentDirection = 'column';
        if(!options.crossAlignment)
            options.crossAlignment = 'center';
        if(!options.gap)
            options.gap = 0;
    }

    addContent(children: DisplayObject[]){
        this.addChild(...children);
        this.content.push(...children);
        this.draw();
    }
    
    draw(){
        if(!this.options) return;
        let offset = 0;
        const {contentDirection, crossAlignment, gap} = this.options;

        const padding = this.options.padding;
        let width = this.options.width ? this.options.width : 0;
        let height = this.options.height ? this.options.height : 0;

        let topPadding = 0;
        let leftPadding = 0;
        if(padding){
            if(typeof padding == 'number'){
                height = height + padding * 2;
                width = width + padding * 2;
                topPadding = padding;
                leftPadding = padding;
            }else{
                if(typeof padding.horizontal == 'number'){
                    width += padding.horizontal * 2;
                    leftPadding = padding.horizontal;
                }else{
                    width +=  padding.horizontal.left + padding.horizontal.right;
                    leftPadding = padding.horizontal.left;
                }

                if(typeof padding.vertical == 'number'){
                    height += padding.vertical * 2;
                    topPadding = padding.vertical;
                }else{
                    height += padding.vertical.top + padding.vertical.bottom;
                    topPadding = padding.vertical.top;
                }
            }
        }

        this.alpha = this.options.alpha ? this.options.alpha : 1;

        const radius = this.options.radius;

        const border = this.options.border;

        let crossDirectionSize = 0;
        
        this.content.forEach((element, index) => {
            const gapping = index != 0 ? gap : 0;
            const contentBounds = element.getLocalBounds();
            if(contentDirection == 'column'){
                height += contentBounds.height + gapping;
                if(crossDirectionSize < contentBounds.width)
                    crossDirectionSize = contentBounds.width;
            }else{
                width += contentBounds.width + gapping;
                if(crossDirectionSize < contentBounds.height)
                    crossDirectionSize = contentBounds.height;
            }

            if(contentDirection == 'row'){
                if(crossAlignment == 'center')
                    element.pivot = anchorToPoint('left', contentBounds);
                else if(crossAlignment == 'end')
                    element.pivot = anchorToPoint('bottom left', contentBounds);
            }else{
                if(crossAlignment == 'center')
                    element.pivot = anchorToPoint('top', contentBounds);
                else if(crossAlignment == 'end')
                    element.pivot = anchorToPoint('top right', contentBounds);
            }
        });

        if(contentDirection == 'column')
            width += crossDirectionSize;
        else
            height += crossDirectionSize;

        const borderThickness = border ? border.thickness : 0;
        let lastPoint: UIPoint = {x: borderThickness + leftPadding, y: borderThickness + topPadding};

        if(contentDirection == 'row'){
            if(crossAlignment == 'center')
                lastPoint.y += crossDirectionSize / 2;
            else if(crossAlignment == 'end')
                lastPoint.y += crossDirectionSize;
        }else{
            if(crossAlignment == 'center')
                lastPoint.x += crossDirectionSize / 2;
            else if(crossAlignment == 'end')
                lastPoint.x += crossDirectionSize;
        }

        this.content.forEach((element, index) => {
            const gapping = index != 0 ? gap : 0;
            element.x = lastPoint.x;
            element.y = lastPoint.y;

            const bounds = element.getBounds();

            if(contentDirection == 'row'){
                lastPoint.x = element.x + bounds.width + gapping;
                element.x += gapping;
            }else{
                lastPoint.y = element.y + bounds.height + gapping;
                element.y += gapping;
            }
        });
        

        if(border){
            offset = border.thickness;
            
            this.beginFill(border.color);
            this.drawRoundedRect(0, 0,
                width + offset * 2,
                height + offset*2,
                radius ? radius + border.thickness : 0
            );
            this.endFill();
        }

        this.beginFill(this.options.color);
        this.drawRoundedRect(offset, offset, 
            width, 
            height, 
            radius ? radius : 0
        );
        this.endFill();
    }
}