import { Component, ViewChild, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AnnotatePage } from '../annotate/annotate';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { prototype } from 'long';
import __pdfjs from 'pdfjs-dist/build/pdf';
import PDFJSAnnotate from 'pdf-annotate';
import { GlobalService } from '../../services/global.service';
import { DocumentService } from '../../services/document.service';
import { AlertController } from 'ionic-angular';
import { unescapeIdentifier } from '@angular/compiler';
import { FeatureProvider } from './../../providers/feature/feature';
declare let window: any;
declare let PDFView: any;
declare let canvas: any;
declare let TextEncoder: any;
declare let FileReader: any;
declare let blockstack: any;
declare let document: any;
declare let jsPDF: any;
declare let $: any;
declare let sjcl: any;
import { ModalController } from 'ionic-angular';
import { FeaturesModalPage } from './../features-modal/features-modal';
import { FeedComponent } from '../../components/feed/feed';
let blobStream = require('blob-stream');
let canvas2pdf = require('canvas2pdf');
let Filters = require('./../../utils/filters');
declare let pdfkit: any;
import Shepherd from 'shepherd.js';

//const $ = document.querySelectorAll.bind(document);

/// Pdf js basic example - https://jsfiddle.net/pdfjs/cq0asLqz/?utm_source=website&utm_medium=embed&utm_campaign=cq0asLqz
/// Annotations sample - http://jsfiddle.net/seikichi/RuDvz/2/

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    name: string;
    isLoggedIn = false;
    loginState = "Login";
    fileName = "blockusign/pdf1.pdf";
    profile: any;
    pdfBuffer: any;
    canvasCamera: any;
    cameraContext: any;
    loading;
    isSpinning = false;
    isGraphite = false;
    showCamera = true;
    hasCameraBeenClicked = false;

    @ViewChild("fileUploadForm") fileUploadForm: ElementRef;
    @ViewChild("fileUpload") fileUpload: ElementRef;
    @ViewChild("fileDrag") fileDrag: ElementRef;
    @ViewChild("fileImage") fileImage: ElementRef;
    @ViewChild("start") start: ElementRef;
    @ViewChild("fileUploadBtn") fileUploadBtn: ElementRef;
    @ViewChild("fileProgress") fileProgress: ElementRef;
    @ViewChild("theCanvas") theCanvas: ElementRef;
    @ViewChild("messages") messages: ElementRef;
    @ViewChild("spinner") spinner: ElementRef;
    @ViewChild("videoCamera") videoCamera: ElementRef;
    @ViewChild("cameraCanvas") cameraCanvas: ElementRef;
    @ViewChild("feed") feed: FeedComponent;

    
    
    constructor(
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        public globalService: GlobalService, 
        public documentService: DocumentService, 
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public featureService: FeatureProvider,
        public modal: ModalController,
        private change: ChangeDetectorRef,
    ) {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 12000
          });
    }

    async ionViewDidLoad() {

        console.log('blockusign-test');

        let intent = this.navParams.get('intent');
        if ( this.navParams.get('intent') ){
            if (intent == 'upload'){
               
                document.getElementById('file-upload').click();
                
                //document.getElementById('globalLoading').style.display = "";
                // document.getElementById('file-upload').click();
            }
        }

        this.spinHide();
        
        this.ekUpload();
        
        try{
            if (localStorage.getItem('graphitePdf')){
                this.isGraphite = true;
            }
        }
        catch(e){}


        //let docs = await this.documentService.getDocumentsIndex(true)
        //this.testPublicKeyFile();
        this.checkNewFeatures();



    }

    startProductTour(){
       

        let tour = new Shepherd.Tour({
            defaultStepOptions: {
              classes: 'shadow-md bg-purple-dark',
              scrollTo: true
  
            },
           
          });

          tour.addStep('welcome', {
            title: 'Welcome',
            text: "Welcome to Blockusign,  let's take a tour!",
            attachTo: 'center',
            advanceOn: '.docs-link click',
            buttons: [
                {
                    text: 'Exit',
                    action: tour.cancel
                },
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
          });

          
          tour.addStep('one', {
            title: '1) Upload',
            text: 'Upload a PDF to your own encrypted storage bucket',
            attachTo: '.step:nth-child(1) top',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Next',
                action: tour.next
                }
            ]
          });

          tour.addStep('two', {
            title: '2) Annotate',
            text: 'Drop a "sign here" annotation or emoji 😄😄😄 on the document ',
            attachTo: '.step:nth-child(2) bottom',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Next',
                action: tour.next
                }
            ]
          });

          tour.addStep('three', {
            title: '3) Send',
            text: 'Email your signer. Or send them a link. If you are a solo signer just skip this step.',
            attachTo: '.step:nth-child(3) bottom',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Next',
                action: tour.next
                }
            ]
          });

          tour.addStep('four', {
            title: '4) Sign',
            text: 'Your signer will land here to sign the document',
            attachTo: '.step:nth-child(4) bottom',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Next',
                action: tour.next
                }
            ]
          });

          tour.addStep('five', {
            title: '5) Review',
            text: 'Both parties can review the document. You also can record a video proof here',
            attachTo: '.step:nth-child(5) bottom',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Next',
                action: tour.next
                }
            ]
          });

          tour.addStep('six', {
            title: '6) Stamp',
            text: 'Both parties can stamp the document with our Digital Notary Service',
            attachTo: '.step:nth-child(6) bottom',
            advanceOn: '.docs-link click',
            buttons: [
                {
                text: 'Done',
                action: tour.next
                }
            ]
          });
          
        tour.start();

    }

    async checkNewFeatures(){
        try {
            let newFeatures = await this.featureService.getFeaturesToShow();
            let hasTakenTour = localStorage.getItem('hasTakenTour');


            if (!hasTakenTour) {
                localStorage.setItem('hasTakenTour', 'true');
                this.startProductTour();
            } else { 
                if (newFeatures.length > 0){
                    const modal = this.modal.create(FeaturesModalPage, null, { enableBackdropDismiss: false });
                    modal.present();
    
                    if (newFeatures.length > 1){
                        // you are a new user and need to take a product tour
                    }
                   
                }
            }

        } catch(e){
            console.error('could not load new features')
        }

        
       
       
    }

    next() {

        //this.navCtrl.push(AnnotatePage)
        //this.navCtrl.setRoot(ListPage);
        this.navCtrl.push("AnnotatePage", {
            guid: this.documentService.currentDoc.guid
        });
    }

    async saveFile(fileName) {
        this.spinShow();
        let documentList = await this.documentService.addDocument(fileName, this.pdfBuffer);
        this.spinHide();
        this.next();
    }

    async getFile() {
        let data = this.documentService.getDocument(this.fileName, this.documentService.currentDoc.documentKey);
        this.pdfBuffer = data;
    }

    loadFile() {

        setTimeout(()=>{
            document.getElementById('globalLoading').style.display = "";
        }, 300);

        this.loading.present();

        //let fileInput: any = document.getElementById('file-upload');
        let fileInput = this.fileUpload.nativeElement;
        let firstFile = fileInput.files[0];

        let startByte = 0;
        let endByte = firstFile.size;
        let opt_startByte = startByte.toString();
        let opt_stopByte = endByte.toString();
        let files = fileInput.files;
        if (!files.length) {
            alert('Please select a file!');
            this.loading.dismiss();
            setTimeout(()=>{
                document.getElementById('globalLoading').style.display = "none";
            }, 300);
            return;
        }

        let fileSize = firstFile.size / 1024 / 1024; // in MB
        if (fileSize > 3) {
            document.getElementById('globalLoading').style.display = "none";
            alert('Sorry, we are working on supporting larger file sizes :) Please select a smaller document under 3MB');
            this.loading.dismiss();
            setTimeout(()=>{
                document.getElementById('globalLoading').style.display = "none";
            }, 300);
           return;
        } 

        let file = files[0];
        let start = parseInt(opt_startByte) || 0;
        let stop = parseInt(opt_stopByte) || file.size - 1;
        let filename = "";
        let reader = new FileReader();
        // If we use onloadend, we need to check the readyState.
        reader.onloadend = (evt: any) => {
            if (evt.target.readyState == FileReader.DONE) {
                // document.getElementById('byte_content').textContent = evt.target.result;
                // document.getElementById('byte_range').textContent =
                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                //         ' of ', file.size, ' byte file'].join('');
            }
            filename = fileInput.files[0].name;
            this.newDocModal(filename);
            //localStorage.setItem("FileName", filename);
        };

        let blob = file.slice(start, stop + 1);
        //reader.readAsBinaryString(blob);
        reader.onload = (evt: any) => {
            let arraybuffer = evt.target.result;
            this.pdfBuffer = arraybuffer;
            //this.saveFile();
            let pdfData = new Uint8Array(arraybuffer);
            //this.savePdfAsString(pdfData);
            this.createPdf(pdfData);
        };
        reader.readAsArrayBuffer(blob);
    }

    createPdf(pdfData) {
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        let pdfjsLib = window['pdfjs-dist/build/pdf'];

        pdfjsLib.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        PDFJSAnnotate.setStoreAdapter(new PDFJSAnnotate.LocalStoreAdapter());

        let loadingTask = pdfjsLib.getDocument({ data: pdfData });

        loadingTask.promise.then((pdf) => {
            console.log('PDF loaded');
            let pageNumber = 1;
            pdf.getPage(pageNumber).then((page) => {
                console.log('Page loaded');
                let scale = 1.5;
                let viewport = page.getViewport(scale);

                // Prepare canvas using PDF page dimensions
                // let canvas: any = document.getElementById('the-canvas');
                let canvas: any = this.theCanvas.nativeElement;
                let context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                let renderTask = page.render(renderContext);
                renderTask.then(() => {
                    console.log('Page rendered');
                    this.loading.dismiss();
                    try{
                        document.getElementById('globalLoading').style.display = "none";
                    }
                    catch(e){}
                });
            });

        }, (reason) => {
            // PDF loading error
            console.error(reason);
            this.loading.dismiss();
            document.getElementById('globalLoading').style.display = "none";
        });
    }

    savePdfAsString(pdf) {
        this.largeuint8ArrToString(pdf, (strPdf) => {
            let base64StringPdf = btoa(strPdf);
            //localStorage.setItem("pdfStr", base64StringPdf);
        });
    }

    getPdfFromString(base64PdfString) {
        // decode base64 string, remove space for IE compatibility
        let binary = atob(base64PdfString.replace(/\s/g, ''));
        let len = binary.length;
        let arraybuffer = new ArrayBuffer(len);
        let pdfData = new Uint8Array(arraybuffer);
    }

    largeuint8ArrToString(uint8arr, callback) {
        let bb = new Blob([uint8arr]);
        let f = new FileReader();
        f.onload = (e: any) => {
            callback(e.target.result);
        };
        f.readAsBinaryString(bb);
    }

    // File Upload https://codepen.io/mattsince87/pen/yadZXv?editors=0010#0
    ekUpload() {
        let self = this;
        

        function fileDragHover(e) {
            // var fileDrag = document.getElementById('file-drag');
            let fileDrag = self.fileDrag.nativeElement;

            e.stopPropagation();
            e.preventDefault();

            fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
        }


        function fileSelectHandler(e) {

           

            // Fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // Cancel event and hover styling
            fileDragHover(e);


            // Process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                // parseFile(f);
                self.loadFile();
                

            }
        }

        // Output
        function output(msg) {
            // Response
            // var m = document.getElementById('messages');
            let m = this.message.nativeElement;
            m.innerHTML = msg;
        }


        function setProgressMaxValue(e) {
            // var pBar = document.getElementById('file-progress');
            let pBar = this.fileProgress.nativeElement;

            if (e.lengthComputable) {
                pBar.max = e.total;
            }
        }

        function updateFileProgress(e) {
            //var pBar = document.getElementById('file-progress');
            let pBar = this.fileProgress.nativeElement;
            if (e.lengthComputable) {
                pBar.value = e.loaded;
            }
        }

        // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
            console.log("Upload Initialised");

            // var fileSelect = document.getElementById('file-upload'),
            //    fileDrag = document.getElementById('file-drag'),
            //    submitButton = document.getElementById('submit-button');
            let fileSelect = this.fileUpload.nativeElement,
                fileDrag = this.fileDrag.nativeElement;
                //submitButton = this.

            fileSelect.addEventListener('change', fileSelectHandler, false);

            // Is XHR2 available?
            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // File Drop
                fileDrag.addEventListener('dragover', fileDragHover, false);
                fileDrag.addEventListener('dragleave', fileDragHover, false);
                fileDrag.addEventListener('drop', fileSelectHandler, false);
            }
        } else {
           this.fileDrag.nativeElement.style.display = 'none';
        }
    }



    newDocModal(fileName) {

        let alert = this.alertCtrl.create({
            title: 'Document Name',
            inputs: [
                {
                    name: 'fileName',
                    placeholder: '',
                    value: fileName
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: data => {

                        // save here
                        $('.pdfSelectTxt').text('Select a PDF');
                        this.saveFile(data.fileName.replace("'",""));

                        if (true == true) {
                            // logged in!
                        } else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }


    cameraModal() {

        let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'Double tap the screen to take a picture of the document',
            buttons: [
                {
                    text: 'Ok',
                    handler: data  => {
                       
                        this.takePicture();
                      
       

                        if (true == true) {
                            // logged in!
                        } else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    async initCamera() {

        
        // rear camera selection - https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
        // https://www.html5rocks.com/en/tutorials/getusermedia/intro/
        // @todo check rear camera logic on all phones
        let devices = await navigator.mediaDevices.enumerateDevices();;

        // find back camera
        var rearCamera = devices.find((device) => { return (device.kind === 'videoinput' && device.label.includes('back')) });
        let mediaOptions: any;

        if (rearCamera) {
            mediaOptions = {
                deviceId: { exact: rearCamera.deviceId }
            };
        }
        else {
            mediaOptions = true;
        }


        let mediaConfig = {
            video: mediaOptions
        };

        let playStream = function (video, src) {
            video.src = src;
            video.play();
        };

        let process = (video) => {
            let mediaDevices = navigator.mediaDevices;
            mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                var videoTracks = stream.getVideoTracks();
                console.log('Got stream with constraints:', mediaConfig);
                console.log('Using video device: ' + videoTracks[0].label);
                // stream.onended = function() {
                //   console.log('Stream ended');
                // };
                window.stream = stream; // make variable available to console
                video.srcObject = stream;
            }).catch(function (err) {
                // alert(err);
                alert("Not support get stream from camera!");
            });
        };
        process(this.videoCamera.nativeElement);
        this.canvasCamera = this.cameraCanvas.nativeElement;
        this.cameraContext = this.canvasCamera.getContext("2d");
       
    }

    snapClick(){
        setTimeout( ()=>{
            this.change.detectChanges();
            if (this.hasCameraBeenClicked == false){
                this.hasCameraBeenClicked = true;
                document.exitFullscreen();
                this.cameraContext.drawImage(this.videoCamera.nativeElement, 0, 0, 612, 792);
                this.loadFromImage();
            }
        },250);
        
    }

    savePDF() {
        try {
            this.canvasCamera = $("#canvasCamera")[0];
            var imgData = this.canvasCamera.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'mm', [297, 210]);
            pdf.addImage(imgData, 'JPEG', 5, 5);
            var namefile = prompt("insert name of file");
            pdf.save(namefile + ".pdf");
        } catch (e) {
            alert("Error description: " + e.message);
        }

    }


    testPublicKeyFile() {
        const myPublicKey = blockstack.getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey);
        const yourPublicKey = "02563f0f1d5c5429fa8fdb3d8fc4b0464dac70b07cd8249f0ef17bcf2c93ed7469";

        if (blockstack.loadUserData().profile.name == "nick tee") {

            // write for you
            this.testPutFile(yourPublicKey);
            // write for me
            this.testPutFile(myPublicKey).then(() => {
                // read for me
                this.testGetFile(myPublicKey);
            });
        }

        if (blockstack.loadUserData().profile.name == "Demo User BlockSign") {
            // read for me
            this.testGetFile(myPublicKey);
        }

    }

    loadFileFromGraphite() {
        let blob =  localStorage.getItem('graphitePdf');
        let fileName = localStorage.getItem('graphiteName')
        localStorage.setItem("FileName", fileName);
        let pdfData = this.base64ToUint8Array(blob);
        this.pdfBuffer = pdfData.buffer;
        this.savePdfAsString(pdfData);
        this.createPdf(pdfData);
        localStorage.removeItem('graphitePdf');
        localStorage.removeItem('graphiteName');
        this.saveFile(localStorage.getItem("FileName"));
    }

    async takePicture(){
        try{
            //this.showCamera = true;
            //await this.change.detectChanges();
            this.videoCamera.nativeElement.requestFullscreen();
        } catch(e) {};
        this.initCamera();
    }

    async loadFromImage(){
        
        // get image from camera capture
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        let imgUrl = this.cameraCanvas.nativeElement.toDataURL();
        image.src = imgUrl;
        let stream = new blobStream();
       
        let ctx = new canvas2pdf.PdfContext(stream);
        image.onload =  () => {


            //let filterData = Filters.filterImage(Filters.grayscale, image);

            //ctx.putImageData(filterData, 0, 0);

            ctx.drawImage(image, 0, 0);

            // greyscale

            // sharpen

            // threshold

            ctx.stream.on('finish', async ()=> {
                this.videoCamera.nativeElement.pause();
                let blob= ctx.stream.toBlob('application/pdf');
                this.blobToBase64(blob, (base64)=>{
                    let pdfData = this.base64ToUint8Array(base64);
                    this.pdfBuffer = pdfData.buffer;
                    this.savePdfAsString(pdfData);
                    this.createPdf(pdfData);
                    this.hasCameraBeenClicked = false;
                    this.newDocModal("untitled-" + Date.now() );
                    window.stream.stop();
                })
            });
            ctx.end();
        }; 
    }


    testPutFile(publicKey): Promise<any> {
        const encryptOptions = { encrypt: publicKey };
        const path = "testFile.json";
        let fileContent = "{stuff: 'from nicktee.id'}";

        // put and encrypt the file
        return blockstack.putFile(path, fileContent, encryptOptions)
            .then((publicURL) => {
                console.log("testPublicKeyFile ===> " + publicURL);
            });
    }

    testGetFile(publicKey): Promise<any> {
        const decryptOptions = {
            decrypt: true
        };
        let fullReadUrl = "../../hub/18kTskBpTh1mznsypu1fhJ27dxbC1SwXEK/testFile.json";

        return blockstack.getFile(fullReadUrl, decryptOptions).then(readContent => {
            console.log("testPublicKeyFile ===> " + readContent);
        });
    }

    loadBar(){
        this.loading.present();
    }

    spinHide(){
        this.isSpinning = false;
    }

    spinShow(){
        this.isSpinning = true;
    }

    base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }

    async blobToBase64(blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    };

}

