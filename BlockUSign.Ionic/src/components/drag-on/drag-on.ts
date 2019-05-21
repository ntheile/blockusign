import { Component } from '@angular/core';
import interact from 'interactjs';

/**
 * Generated class for the DragOnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drag-on',
  templateUrl: 'drag-on.html'
})
export class DragOnComponent {

  text: string;

  constructor() {
    console.log('Hello DragOnComponent Component');
    this.text = 'DragOn';
  }

  ionViewDidLoad(){
    (function() {

      function init() {
        var startPos = null;
    
        interact('.draggable').draggable({
          snap: {
            targets: [startPos],
            range: Infinity,
            relativePoints: [ { x: 0.5, y: 0.5 } ],
            endOnly: true
          },
          onstart: function (event) {
              var rect = interact.getElementRect(event.target);
    
              // record center point when starting the very first a drag
              startPos = {
                x: rect.left + rect.width  / 2,
                y: rect.top  + rect.height / 2
              }
    
            event.interactable.draggable({
              snap: {
                targets: [startPos]
              }
            });
          },
          // call this function on every dragmove event
          onmove: function (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
            // translate the element
            target.style.webkitTransform =
            target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';
    
            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.classList.add('getting--dragged');
          },
          onend: function (event) {
            event.target.classList.remove('getting--dragged')
          }
        });
    
        interact('.droppable:not(.caught--it)').dropzone({
          accept: '.draggable',
          overlap: .5,
    
          ondropactivate: function (event) {
            event.target.classList.add('can--drop');
          },
          ondragenter: function (event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement  = event.target,
                dropRect         = interact.getElementRect(dropzoneElement),
                dropCenter       = {
                  x: dropRect.left + dropRect.width  / 2,
                  y: dropRect.top  + dropRect.height / 2
                };
    
            event.draggable.draggable({
              snap: {
                targets: [dropCenter]
              }
            });
    
            // feedback the possibility of a drop
            dropzoneElement.classList.add('can--catch');
            draggableElement.classList.add('drop--me');
          },
          ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('can--catch', 'caught--it');
            event.relatedTarget.classList.remove('drop--me');
          },
          ondrop: function (event) {
            console.log("Index of dropped node: " + (event.target));
            console.log("Index of dragged node: " + getNodeIndex(event.relatedTarget.parentNode));
            //event.relatedTarget.textContent = 'Dropped';
            console.log("Dropped!");
            console.log("related target: " + event.relatedTarget.parentNode);
            console.log(event.draggable);
            event.target.classList.add('caught--it');
          },
          ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('can--drop');
            event.target.classList.remove('can--catch');
          }
        });
      }
    
      function getNodeIndex(node) {
        var index = 0;
        while ( (node = node.previousSibling) ) {
          if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            index++;
          }
        }
        return index;
      }
    
      function eleHasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
      }
    
      window.onload = function() {
        init();
      }
    
    })();
    
  }

}
