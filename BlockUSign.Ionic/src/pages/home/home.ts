import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { prototype } from 'long';
import __pdfjs from 'pdfjs-dist/build/pdf';
import PDFJSAnnotate from 'pdf-annotate';
declare let window: any;
declare let PDFView: any;
declare let canvas: any;
declare let TextEncoder: any;
declare let FileReader: any;

/// Pdf js basic example - https://jsfiddle.net/pdfjs/cq0asLqz/?utm_source=website&utm_medium=embed&utm_campaign=cq0asLqz
/// Annotations sample - http://jsfiddle.net/seikichi/RuDvz/2/
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

    }

    ionViewDidLoad() {
    
    }

    loadFile(){
        let fileInput: any = document.getElementById('files');   
        let firstFile = fileInput.files[0];

        let startByte = 0;
        let endByte = firstFile.size;
        let opt_startByte = startByte.toString();
        let opt_stopByte = endByte.toString();
        let files = (<any>document).getElementById('files').files;
        if (!files.length) {
            alert('Please select a file!');
            return;
        }
        let file = files[0];
        let start = parseInt(opt_startByte) || 0;
        let stop = parseInt(opt_stopByte) || file.size - 1;

        let reader = new FileReader();
        // If we use onloadend, we need to check the readyState.
        reader.onloadend = (evt: any)=> {
            if (evt.target.readyState == FileReader.DONE) {  
                // document.getElementById('byte_content').textContent = evt.target.result;
                // document.getElementById('byte_range').textContent =
                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                //         ' of ', file.size, ' byte file'].join('');
            }
            let filename = fileInput.files[0].name;
            localStorage.setItem("FileName", filename);
        };

        let blob = file.slice(start, stop + 1);
        //reader.readAsBinaryString(blob);
        reader.onload = (evt: any) => {
            let arraybuffer = evt.target.result;
            let pdfData = new Uint8Array(arraybuffer);
            this.savePdfAsString(pdfData);
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

        loadingTask.promise.then( (pdf) => {
            console.log('PDF loaded');
            let pageNumber = 1;
            pdf.getPage(pageNumber).then( (page) => {
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
                renderTask.then( ()=> {
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
            localStorage.setItem("pdfStr", base64StringPdf);
        });
    }

    getPdfFromString(base64PdfString){
        // decode base64 string, remove space for IE compatibility
        let binary = atob(base64PdfString.replace(/\s/g, ''));
        let len = binary.length;
        let arraybuffer = new ArrayBuffer(len);
        let pdfData = new Uint8Array(arraybuffer);
    }

    largeuint8ArrToString(uint8arr, callback) {
        let bb = new Blob([uint8arr]);
        let f = new FileReader();
        f.onload =  (e: any)=> {
            callback(e.target.result);
        };
        f.readAsBinaryString(bb);
    }

}


