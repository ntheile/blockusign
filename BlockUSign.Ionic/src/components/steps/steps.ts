import { Component } from '@angular/core';

/**
 * Generated class for the StepsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'steps',
  templateUrl: 'steps.html'
})
export class StepsComponent {

  text: string;

  constructor() {
    console.log('Hello StepsComponent Component');
    this.text = 'Steps go here';
  }

}
