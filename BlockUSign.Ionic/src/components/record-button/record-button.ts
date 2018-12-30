import { Component, ViewChild } from '@angular/core';
import { wrappedError } from '@angular/core/src/error_handler';


@Component({
  selector: 'record-button',
  templateUrl: 'record-button.html'
})
export class RecordButtonComponent {


  timer = 20;
  isRecording = false;
  @ViewChild('wrapper') wrapper: any;
  @ViewChild('circ') circ: any;
  @ViewChild('rect') rect: any;
  interval = null;

  constructor() {


  }

  ionViewDidLoad() {
    this.init();
  }

  init() {
    this.rect.nativeElement.style.display = "none";
  }



  toggleRecord() {
   
    
    if (this.isRecording) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isRecording = false;
      this.rect.nativeElement.style.display = "none";
      this.circ.nativeElement.style.animation = "";
    } else {

      let i = 0;
      this.interval = setInterval( ()=> {
        if (i % 2 == 0) {
          this.rect.nativeElement.style.display = "none";
        }
        else {
          this.rect.nativeElement.style.display = "";
        }
        i++;

        console.log("inter");

      }, 700)
      this.isRecording = true;
      this.rect.nativeElement.style.display = "";
      this.circ.nativeElement.style.animation = "countdown " + this.timer + "s linear infinite forwards";
    }

  }

  stop(){
    this.isRecording = false;
    this.toggleRecord();

  }


}
