import { Component, ViewChild, ChangeDetectorRef, Output } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DocumentService } from './../../services/document.service';
import { timingSafeEqual } from 'crypto';
import { RecordButtonComponent } from '../record-button/record-button';
import { LoadingController } from 'ionic-angular';

declare let navigator: any;

/**
 * https://github.com/muaz-khan/RecordRTC
 * https://medium.com/@SumanthShankar/integrate-recordrtc-with-angular-2-typescript-942c9c4ca93f
 */
@Component({
  selector: 'videoRTC',
  templateUrl: 'video.html'
})
export class VideoComponent {

  @ViewChild('video') video: any;
  @ViewChild('source') source: any;
  @ViewChild('instaRecord') instaRecord: any;
  @ViewChild('recordBtn') recordBtn: RecordButtonComponent;


  stream: MediaStream;
  private recordRTC: any;
  videoHash = null;
  isRecording = false;
  isStopped = true;
  rawVideo;
  public mediaConstraints = {
    video: true,
    audio: {
      mandatory: {
        echoCancellation: false,
        googAutoGainControl: false,
        googNoiseSuppression: false,
        googHighpassFilter: false
      },
      optional: [{
        googAudioMirroring: false
      }]
    },
  };



  constructor(
    private documentService: DocumentService,
    private change: ChangeDetectorRef,
    public loading: LoadingController
  ) {

  }

  ionViewDidLoad() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    this.init();
  }

  async init() {
    
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm\;codecs=vp9', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      //audioBitsPerSecond: 128000,
      //videoBitsPerSecond: 128000,
      //bitsPerSecond: 128000, // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.clearRecordedData();
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    // stop recording after x seconds
    setTimeout(()=>{
      if (this.isRecording){
        this.recordBtn.toggleRecord();
        this.toggleRecord();
      }
      // this.video.nativeElement.pause();
    }, (this.recordBtn.timer * 1000) );  


  }


  errorCallback() {
    //handle error here
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    let recordedBlob = recordRTC.getBlob();
    this.calculateVideoHash(recordedBlob);
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    this.isRecording = true;
    this.isStopped = false;
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = true;
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    this.isRecording = false;
    this.isStopped = true;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    let name = this.documentService.currentDoc.fileName.replace('.pdf', '') + '.webm';
    this.recordRTC.save(name);
  }

  async calculateVideoHash(blob) {

    this.videoHash = "calculating...";
    this.change.detectChanges();
    blob = await new Response(blob).arrayBuffer();
    this.saveVideo(blob);
    blob = new Uint8Array(blob);
    console.log('calculating hash of this blob: ', blob);
    this.videoHash = this.documentService.genHash(blob);
    this.change.detectChanges();

  }


  async saveVideo(blob) {
    this.playVideo(blob);
    this.documentService.saveVideo(blob);

  }

  async playVideo(videoArrayBuffer) {
    this.video.nativeElement.srcObject = null;
    let blob = new Blob([videoArrayBuffer], { type: 'video/webm\;codecs=vp9' });
    this.video.nativeElement.src = window.URL.createObjectURL(blob);
  }


  async getVideo(path) {


    
    const loader = this.loading.create({
      content: "Loading video ...",
      duration: 10000
    });
    loader.present();
  
    this.videoHash = "Loading...";
    let vid = await this.documentService.getVideo(path);
    if (vid){
      let blob = new Uint8Array(vid);
      this.videoHash = this.documentService.genHash(blob);

      this.playVideo(vid);
    } 
    else{
      this.videoHash = "No Video";
    }
    loader.dismiss();

  }

  // async setVideoPaused(){
  //   await this.getVideo();
  //   setTimeout(()=>{
  //     this.video.nativeElement.pause();
  //   }, 500);
  
    
  // }

  async toggleRecord(){

    if (this.isRecording){
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }


  
}
