import { Component, ViewChild, ChangeDetectorRef, Output} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DocumentService } from './../../services/document.service';
import { timingSafeEqual } from 'crypto';
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
    private change: ChangeDetectorRef
  ) {
    
  }

  ionViewDidLoad() {
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    this.init();
  }

  async init(){
    
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
    this.saveVideo(blob);
    blob = new Uint8Array(blob);
    console.log('calculating hash of this blob: ', blob);
    this.videoHash = this.documentService.genHash(blob);
    this.change.detectChanges();
    
  }


  saveVideo(blob){
    this.documentService.saveVideo(blob);
  }


  async getVideo(){
    

    var self = this;

    // var FILE = 'test.webm';
    var NUM_CHUNKS = 5;
    var video = document.querySelector('video');
    

    var mediaSource = new MediaSource();
    
    
    video.src = window.URL.createObjectURL(mediaSource);
    
    mediaSource.addEventListener('sourceopen', function() {
      var sourceBuffer =
          mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp9"');
      console.log(sourceBuffer);
    
      log('MediaSource readyState: ' + this.readyState);
    
      get('', function(uInt8Array) {
        var file = new Blob([uInt8Array], {
          type: 'video/webm'
        });
        var chunkSize = Math.ceil(file.size / NUM_CHUNKS);
    
        log('Number of chunks: ' + NUM_CHUNKS);
        log('Chunk size: ' + chunkSize + ', total size: ' + file.size);
    
        // Slice the video into NUM_CHUNKS and append each to the media element.
        var i = 0;
    
        (function readChunk_(i) { // eslint-disable-line no-shadow
          var reader = new FileReader();
    
          // Reads aren't guaranteed to finish in the same order they're started in,
          // so we need to read + append the next chunk after the previous reader
          // is done (onload is fired).
          reader.onload = function(e:any) {
            sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
            log('Appending chunk: ' + i);
            if (i === NUM_CHUNKS - 1) {
              sourceBuffer.addEventListener('updateend', function() {
                if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
                  mediaSource.endOfStream();
                }
              });
            } else {
              if (video.paused) {
                video.play(); // Start playing after 1st chunk is appended.
              }
              readChunk_(++i);
            }
          };
    
          var startByte = chunkSize * i;
          var chunk = file.slice(startByte, startByte + chunkSize);
    
          reader.readAsArrayBuffer(chunk);
        })(i); // Start the recursive call by self calling.
      });
    }, false);
    
    mediaSource.addEventListener('sourceended', function() {
      log('MediaSource readyState: ' + this.readyState);
    }, false);
    
    async function get(url, callback) {
      // var xhr = new XMLHttpRequest();
      // xhr.open('GET', url, true);
      // xhr.responseType = 'arraybuffer';
      // xhr.send();
    
      // xhr.onload = function() {
      //   if (xhr.status !== 200) {
      //     alert('Unexpected status code ' + xhr.status + ' for ' + url);
      //     return false;
      //   }
      //   callback(new Uint8Array(xhr.response));
      // };

      var vid = await self.documentService.getVideo();

      callback(vid);
    }
    
    function log(message) {
      console.log(message);
      //document.getElementById('data').innerHTML += message + '<br /><br />';
    }
    
  
  }

}
