import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ListPage } from '../list/list';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { prototype } from 'long';
import __pdfjs from 'pdfjs-dist/build/pdf';
import PDFJSAnnotate from 'pdf-annotate';
import { GlobalService } from '../../services/global.service';
import { DocumentService } from '../../services/document.service';
import { AlertController } from 'ionic-angular';
declare let window: any;
declare let PDFView: any;
declare let canvas: any;
declare let TextEncoder: any;
declare let FileReader: any;
declare let blockstack: any;
declare let document: any;
//declare let $: any;
const $ = document.querySelectorAll.bind(document);

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

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
        public globalService: GlobalService, public documentService: DocumentService, public alertCtrl: AlertController ) {

    }

    async ionViewDidLoad() {
        this.ekUpload();

        //let docs = await this.documentService.getDocumentsIndex(true)
        
    }

    next(){
        this.navCtrl.push("ListPage");
        //this.navCtrl.setRoot(ListPage);
    }

    async saveFile(fileName) {


        let documentList = await this.documentService.addDocument(fileName, this.pdfBuffer);
        debugger;
        this.next();

        // blockstack.putFile(fileName, this.pdfBuffer, { encrypt: true }).then((data) => {
        //     this.next();
        // });
    }

    getFile() {
        blockstack.getFile(this.fileName, { decrypt: true }).then((data) => {
            this.pdfBuffer = data;
        });
    }

    loadFile() {
        let fileInput: any = document.getElementById('file-upload');
        let firstFile = fileInput.files[0];

        let startByte = 0;
        let endByte = firstFile.size;
        let opt_startByte = startByte.toString();
        let opt_stopByte = endByte.toString();
        let files = (<any>document).getElementById('file-upload').files;
        if (!files.length) {
            alert('Please select a file!');
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
                let canvas: any = document.getElementById('the-canvas');
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
                });
            });

        }, (reason) => {
            // PDF loading error
            console.error(reason);
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
        function Init() {

            console.log("Upload Initialised");

            var fileSelect = document.getElementById('file-upload'),
                fileDrag = document.getElementById('file-drag'),
                submitButton = document.getElementById('submit-button');

            fileSelect.addEventListener('change', fileSelectHandler, false);

            // Is XHR2 available?
            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // File Drop
                fileDrag.addEventListener('dragover', fileDragHover, false);
                fileDrag.addEventListener('dragleave', fileDragHover, false);
                fileDrag.addEventListener('drop', fileSelectHandler, false);
            }
        }

        function fileDragHover(e) {
            var fileDrag = document.getElementById('file-drag');

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
                uploadFile(f);
               
            }
        }

        // Output
        function output(msg) {
            // Response
            var m = document.getElementById('messages');
            m.innerHTML = msg;
        }


        function setProgressMaxValue(e) {
            var pBar = document.getElementById('file-progress');

            if (e.lengthComputable) {
                pBar.max = e.total;
            }
        }

        function updateFileProgress(e) {
            var pBar = document.getElementById('file-progress');

            if (e.lengthComputable) {
                pBar.value = e.loaded;
            }
        }

        function uploadFile(file) {

            var xhr = new XMLHttpRequest(),
                fileInput = document.getElementById('class-roster-file'),
                pBar = document.getElementById('file-progress'),
                fileSizeLimit = 2048; // In MB
            if (xhr.upload) {
                // Check if file is less than x MB
                if (file.size <= fileSizeLimit * 1024 * 1024) {
                    // Progress bar
                    pBar.style.display = 'inline';
                    xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
                    xhr.upload.addEventListener('progress', updateFileProgress, false);

                    // File received / failed
                    xhr.onreadystatechange = function (e) {
                        if (xhr.readyState == 4) {
                            // Everything is good!

                            // progress.className = (xhr.status == 200 ? "success" : "failure");
                            // document.location.reload(true);
                        }
                    };

                    // Start upload
                    xhr.open('POST', document.getElementById('file-upload-form').action, true);
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.setRequestHeader('X-File-Size', file.size);
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                    xhr.send(file);
                } else {
                    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
                }
            }
        }

        // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
            Init();
        } else {
            document.getElementById('file-drag').style.display = 'none';
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
                
                this.saveFile(data.fileName);

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

}


