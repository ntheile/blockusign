import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, IonicPage, Segment } from 'ionic-angular';
import { CryptoCompareService } from '../../services/cryptocompare.service'
//import { HomePage } from '../home/home';
import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';
import { DocumentService } from '../../services/document.service';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import PDFAnnotate from 'pdf-annotate';
import annotations from './annotations';
import mockViewport from './mockViewport'
//import { SignPage } from '../sign/sign';
//import { EmailPage } from '../email/email';
import { MyApp } from '../../app/app.component';

declare let CustomStyle: any;
declare var $: any;
//const $ = document.querySelectorAll.bind(document);
declare var window: any;
declare let TextLayerBuilder: any;
declare let canvas: any;
declare let scale: any;
declare let rotation: any;
declare var blockstack: any;
declare let Event: any;

/**
 * Generated class for the BlockPdfComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'block-pdf',
  templateUrl: 'block-pdf.html'
})
export class BlockPdfComponent {

  @ViewChild(AbsoluteDragDirective) vc: AbsoluteDragDirective;
  
  @Input() showToolBar = 0;
  @Input() showSignature: 0;
  @Input() showSignHere: 0;
  @Input() showButtons: 0;

  public data: any;
  public DOCUMENT_ID = "blockusign/pdf1.txt"; // @TODO not being used, delete in furture
  public scale: any;
  public rotation: any;
  public UI = PDFAnnotate;
  public page1: any;
  public page2: any;
  public tooltype: any;
  public containerId: string = "pageContainer1";
  public canvasId: string = "canvas1";
  //fileName = "blockusign/pdf1.pdf";
  pdfBuffer: any;
  selectedElement = null;
  prevElement = null;
  currentX = 0;
  currentY = 0;
  yourName: string;
  allowResize = false;

  constructor(
    public navCtrl:         NavController, 
    public navParams:       NavParams,
    public documentService: DocumentService
  ) {
      console.log('====> constructor');
    
  }


  ngOnInit() {
    console.log('====> ngOnInit');
    this.init();
  }

  ngOnDestroy() {
    console.log("====> ngOnDestroy");
  }

  init(){
    $(".dropzone").unbind();
    //let pdfData = this.loadPDFData(); // loads pdf data from localStorage, make sure you uploaded it from home.js

    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        this.getFile();
        // @todo in side menu highlight selected doc
      });
    }
    else {
      let guid = this.navParams.get("guid");
      this.documentService.setCurrentDoc(guid);
      this.getFile();
    }

    this.yourName = blockstack.loadUserData().profile.name;
  }


  getFile() {

    blockstack.getFile(this.documentService.currentDoc.guid + ".pdf", { decrypt: true }).then((data) => {
      this.pdfBuffer = data;

      let pdfData = new Uint8Array(this.pdfBuffer);

      this.loadPdf(pdfData); // loads the pdf to the screen with the text layers

      //this.setupToolBar();

      //this.page1 = document.querySelector(`#${this.containerId} .annotationLayer`);
      //this.page2 = document.querySelector('#pageContainer2 .annotationLayer');

      //PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      //PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());

      // Promise.all([
      //   PDFAnnotate.getAnnotations(this.DOCUMENT_ID, 1),
      //   //PDFAnnotate.getAnnotations(this.DOCUMENT_ID, 2)
      // ]).then(([ann1, ann2]) => {

      //   let RENDER_OPTIONS = {
      //     documentId: this.DOCUMENT_ID,
      //     pdfDocument: pdfData,
      //     scale: 1,
      //     rotate: 0
      //   };

      //   PDFAnnotate.render(this.page1, mockViewport(this.page1), ann1);
      //   //PDFAnnotate.render(this.page2, mockViewport(this.page2), ann2);

      // });

    });
  }

  back() {
    //this.navCtrl.push(ListPage);
    //this.navCtrl.push("HomePage");
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.push("HomePage");
  }

  next() {
    this.navCtrl.push("EmailPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  clear() {
    this.vc.svgDrawer.cleanHTML();
    this.vc.svgDrawer.cleanDrawArea();
    this.vc.svgDrawer.updateMetrics();
    localStorage.removeItem('svg');
  }


  ionViewWillLeave() {
    //$(".dropzone").unbind();
  }

  loadPdf(pdfData) {

    let loadingTask = pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then((pdf) => {

      let pageNumber = 1;
      pdf.getPage(pageNumber).then((page) => {
        console.log('Page loaded');

        let scale = 1;
        let viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        let canvas = document.getElementById('canvas1');
        let context = (<any>canvas).getContext('2d');
        (<any>canvas).height = viewport.height;
        (<any>canvas).width = viewport.width;



        // Render PDF page into canvas context
        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        let renderTask = page.render(renderContext)
          .then(() => {

            // Get text-fragments
            return page.getTextContent();
          }).then((textContent) => {
            // Create div which will hold text-fragments
            let textLayerDiv = document.createElement("div");

            // Set it's class to textLayer which have required CSS styles
            textLayerDiv.setAttribute("class", "textLayer");

            // Append newly created div in `div#page-#{pdf_page_number}`
            let div = document.getElementById(`${this.containerId}`);
            div.appendChild(textLayerDiv);



            // Create new instance of TextLayerBuilder class
            let textLayer = new TextLayerBuilder({
              textLayerDiv: textLayerDiv,
              pageIndex: page.pageIndex,
              viewport: viewport
            });

            // Set text-fragments
            textLayer.setTextContent(textContent);




            // Render text-fragments
            textLayer.render();



            // load svg
            this.loadSvg(page);

          });
      });

    }, (reason) => {

      // PDF loading error
      console.error(reason);

    });

  }

  // loadPDFData() {

  //   let base64pdfData = localStorage.getItem("pdfStr");
  //   function base64ToUint8Array(base64) {
  //     let raw = atob(base64);
  //     let uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
  //     for (var i = 0, len = raw.length; i < len; ++i) {
  //       uint8Array[i] = raw.charCodeAt(i);
  //     }
  //     return uint8Array;
  //   }
  //   return base64ToUint8Array(base64pdfData);

  // }

  // setupAnnotations(page, viewport, canvas, $annotationLayerDiv) {

  //   let canvasOffset = $(canvas).offset();
  //   let promise = page.getAnnotations().then((annotationsData) => {
  //     viewport = viewport.clone({
  //       dontFlip: true
  //     });
  //     for (let i = 0; i < annotationsData.length; i++) {
  //       let data = annotationsData[i];
  //       let annotation = PDFJS.Annotation.fromData(data);
  //       if (!annotation || !annotation.hasHtml()) {
  //         continue;
  //       }
  //       let element = annotation.getHtmlElement(page.commonObjs);
  //       data = annotation.getData();
  //       let rect = data.rect;
  //       let view = page.view;
  //       rect = PDFJS.Util.normalizeRect([
  //         rect[0],
  //         view[3] - rect[1] + view[1],
  //         rect[2],
  //         view[3] - rect[3] + view[1]
  //       ]);
  //       element.style.left = (canvasOffset.left + rect[0]) + 'px';
  //       element.style.top = (canvasOffset.top + rect[1]) + 'px';
  //       element.style.position = 'absolute';

  //       let transform = viewport.transform;
  //       let transformStr = 'matrix(' + transform.join(',') + ')';
  //       CustomStyle.setProp('transform', element, transformStr);
  //       let transformOriginStr = -rect[0] + 'px ' + -rect[1] + 'px';
  //       CustomStyle.setProp('transformOrigin', element, transformOriginStr);

  //       if (data.subtype === 'Link' && !data.url) {
  //         // In this example,  I do not handle the `Link` annotations without url.
  //         // If you want to handle those links, see `web/page_view.js`.
  //         continue;
  //       }
  //       $annotationLayerDiv.append(element);
  //       $annotationLayerDiv.append($("#signature"));
  //     }

  //   });

  //   return promise;

  // }

  // setActiveToolbarItem(type, button) {

  //   let active = document.querySelector('.toolbar button.active');
  //   if (active) {
  //     active.classList.remove('active');
  //   }
  //   if (button) {
  //     button.classList.add('active');
  //   }
  //   if (this.tooltype !== type) {
  //     localStorage.setItem(`${this.DOCUMENT_ID}/tooltype`, type);
  //   }
  //   this.tooltype = type;
  //   this.UI.UI.enableRect(type);

  // }


  // handleToolbarClick(e) {

  //   if (e.target.nodeName === 'BUTTON') {
  //     this.setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
  //   }

  // }

  handleClearClick(e) {

    if (confirm('Are you sure you want to throw your work away?')) {
      //localStorage.removeItem(`${this.DOCUMENT_ID}/annotations`);
      this.page1.innerHTML = '';
    }

  }

  // setupToolBar() {
  //   this.tooltype = localStorage.getItem(`${this.DOCUMENT_ID}/tooltype`) || 'area';
  //   if (this.tooltype) {
  //     this.setActiveToolbarItem(this.tooltype, document.querySelector(`.toolbar button[data-tooltype=${this.tooltype}]`));
  //   }

  // }

  handleDragStart(e) {
    //log("handleDragStart");
    e.style.opacity = '0.4'; // this ==> e.target is the source node.
  };

  // set the overlay dimensionss
  overLay(page: any) {

    let dimensions = page.pageInfo.view[0] + " " + page.pageInfo.view[1] + " " + page.pageInfo.view[2] + " " + page.pageInfo.view[3];
    $("#svg-dropzone").css("width", "612");
    $("#svg-dropzone").css("height", "792");
    $("#svg-dropzone").attr("width", "612");
    $("#svg-dropzone").attr("height", "792");
    $("#svg-dropzone").attr("viewBox", dimensions);
  }

  async saveSvg() {
    //let svg = $(".dragOn-drawArea").last().html();

    let svg = "";
    $(".dragOn-drawArea").each(function () {
      let el = $(this);
      if (el.html() !== "") {
        svg = svg + el.html();
      }
    });

    //if (svg){
    //localStorage.setItem("svg", svg);
    await this.documentService.saveAnnotations(this.documentService.currentDoc.guid, svg);

    await this.documentService.addMessage(this.documentService.currentDoc.guid, 'Updated annotation');

    //}
  }

  async loadSvg(page: any) {
    //let innerHtml = localStorage.getItem("svg");

    // overlay
    this.overLay(page);

    let json = await this.documentService.getAnnotations(this.documentService.currentDoc.guid);
    let innerHtml = null;
    if (json) {
      innerHtml = json.annotations;
    }

    if (innerHtml) {
      this.vc.svgDrawer.addHTML(innerHtml);
    }


  }

}
