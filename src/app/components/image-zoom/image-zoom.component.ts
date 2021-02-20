import { Component, Input  } from '@angular/core';

@Component({
  selector: 'image-zoom',
  templateUrl: './image-zoom.component.html',
})
export class ImageZoomComponent{
  @Input('src') src: string;
  @Input('xPos') xPos: number;
  @Input('yPos') yPos: number;

  constructor() {
    this.xPos = 50;
    this.yPos = 50;
}



}
