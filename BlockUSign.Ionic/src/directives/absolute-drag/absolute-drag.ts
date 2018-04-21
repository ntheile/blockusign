import { Directive, Input, ElementRef, Renderer, Output } from '@angular/core';
import { DomController } from 'ionic-angular';
declare let dragOn: any;
declare let interact: any;

/**
 * Generated class for the AbsoluteDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[absolute-drag]' // Attribute selector
})
export class AbsoluteDragDirective {


  @Input('startLeft') startLeft: any;
  @Input('startTop') startTop: any;
  public svgDrawer : any;

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {
  
  }

  ngAfterViewInit() {
 

    this.dragOn();

    // this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    // this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    // this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

    // let hammer = new window['Hammer'](this.element.nativeElement);
    // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

    // hammer.on('pan', (ev) => {
    //   this.handlePan(ev);
     
    // });

}

handlePan(ev){

    let newLeft = ev.center.x;
    let newTop = ev.center.y;

    this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    });

}

dragOn() {

  try{
    this.svgDrawer  = dragOn(document.querySelector(".dropzone"), {
      listenTo: '.draggable'
    });

   
  }
  catch(e){}
  


  // target elements with the "resizable" class
  // interact('.resizable')
  //   .resizable({
  //     // preserveAspectRatio: true,
  //     edges: {
  //       left: true,
  //       right: true,
  //       bottom: true,
  //       top: true
  //     }
  //   })
  //   .on('resizemove', (event) => {

  //     svgDrawer.updateMetrics();

  //     var target = event.target,
  //       x = (parseFloat(target.getAttribute('data-x')) || 0),
  //       y = (parseFloat(target.getAttribute('data-y')) || 0);

  //     // update the element's style
  //     target.style.width = event.rect.width + 'px';
  //     target.style.height = event.rect.height + 'px';

  //     // translate when resizing from top or left edges
  //     x += event.deltaRect.left;
  //     y += event.deltaRect.top;

  //     target.style.webkitTransform = target.style.transform =
  //       'translate(' + x + 'px,' + y + 'px)';

  //     target.setAttribute('data-x', x);
  //     target.setAttribute('data-y', y);
  //   });





}


}
