import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DocumentService } from './../../services/document.service';
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

  stream: MediaStream;
  private recordRTC: any;
  videoHash = null;
  isRecording = false;
  isStopped = true;
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
    private change: ChangeDetectorRef
  ) {
    
  }

  ionViewDidLoad() {
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      //audioBitsPerSecond: 128000,
      //videoBitsPerSecond: 128000,
      //bitsPerSecond: 128000, // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.clearRecordedData();
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
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

  async calculateVideoHash(blob){
    this.videoHash = "calculating...";
    this.change.detectChanges();
    blob = await new Response(blob).arrayBuffer();
    blob = new Uint8Array(blob);
    console.log('calculating hash of this blob: ', blob);
    this.videoHash = this.documentService.genHash(blob);
    this.change.detectChanges();
  }

}
