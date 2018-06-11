import { Component, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { NavController, NavParams, IonicPage, Segment, LoadingController } from 'ionic-angular';
import { CryptoCompareService } from '../../services/cryptocompare.service'
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
import { MyApp } from '../../app/app.component';
declare let CustomStyle: any;
declare var $: any;
declare var window: any;
declare let TextLayerBuilder: any;
declare let canvas: any;
declare let scale: any;
declare let rotation: any;
declare var blockstack: any;
declare let Event: any;
declare let dragOn: any;
declare let interact: any;
declare let getQueryParam: any;


/**
 * Generated class for the BlockPdfComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'block-pdf',
  templateUrl: 'block-pdf.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockPdfComponent {

  //@ViewChild(AbsoluteDragDirective) vc: AbsoluteDragDirective;
  svgDrawer;

  @Input() showToolBar = 0;
  @Input() locked = false;
  @Input() showSignature: 0;
  @Input() showSignHere: 0;
  @Input() showButtons: 0;
  @Input() marginTop = '130px';

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
  currPage = 1; //Pages are 1-based not 0-based
  numPages = 0;
  thePDF = null;  
  pdfBuffer: any;
  selectedElement = null;
  prevElement = null;
  currentX = 0;
  currentY = 0;
  yourName: string;
  allowResize = false;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    private changeDetector: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    public loadingCtrl: LoadingController
  ) {
    console.log('====> constructor');

  }


  ngOnInit() {
    console.log('====> ngOnInit');
    $(document).ready(() => {

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

      this.init();
    });

  }

  ngOnDestroy() {
    console.log("====> ngOnDestroy");

  }

  init() {
    

    this.svgDrawer = dragOn(document.querySelector(".dropzone"), {
      listenTo: '.draggable'
    });

    let docData = getQueryParam('docData');
    if (docData) {
      this.loading.dismiss();
      return;
    }

    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        this.getFile();
        // @todo in side menu highlight selected doc
      });
    }
    else if (this.documentService.currentDoc.guid) {
      this.documentService.setCurrentDoc(this.documentService.currentDoc.guid);
      this.getFile();
    }
    else {
      let guid = this.navParams.get("guid");
      this.documentService.setCurrentDoc(guid);
      this.getFile();
    }

    this.yourName = blockstack.loadUserData().profile.name;
  }


  async getFile() {

    let data = await this.documentService.getDocument(this.documentService.currentDoc.guid + ".pdf", this.documentService.currentDoc.documentKey);
    this.pdfBuffer = data;

    let pdfData = new Uint8Array(this.pdfBuffer);

    this.loadPdf(pdfData); // loads the pdf to the screen with the text layers

  }

  back() {
    
    this.navCtrl.push("HomePage");
  }

  next() {
    this.navCtrl.push("EmailPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  clear() {
    this.svgDrawer.cleanHTML();
    this.svgDrawer.cleanDrawArea();
    this.svgDrawer.updateMetrics();
    localStorage.removeItem('svg');
  }

  loadPdf(pdfData) {

    let loadingTask = pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then((pdf) => {

      this.numPages = pdf.numPages;
      this.thePDF = pdf;
      
      let viewer = document.getElementById('canvasWrapper');
      let page;
      for (page = 1; page <= pdf.numPages; page++) {
        let canvas = document.createElement("canvas");
        viewer.appendChild(canvas);
        this.renderPage(page, canvas);
      }

      this.loadSvg(1);

      this.loading.dismiss();

    }, (reason) => {

      // PDF loading error
      console.error(reason);

    });

  }


  renderPage(pageNumber, canvas) {
    this.thePDF.getPage(pageNumber).then(function (page) {
      let viewport = page.getViewport(1);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
     
      // Render PDF page into canvas context
      let renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };

      let renderTask = page.render(renderContext).then(() => {

          // Get text-fragments
          return page.getTextContent();
        }).then((textContent) => {
          // Create div which will hold text-fragments
          let textLayerDiv = document.createElement("div");

          // Set it's class to textLayer which have required CSS styles
          textLayerDiv.setAttribute("class", "textLayer");

          // Append newly created div in `div#page-#{pdf_page_number}`
          //let div = document.getElementById(`${this.containerId}`);
          let div = document.getElementById(`canvasWrapper`);
          div.appendChild(textLayerDiv);



          //Create new instance of TextLayerBuilder class
          let textLayer = new TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewport
          });

          // Set text-fragments
          textLayer.setTextContent(textContent);

          // Render text-fragments
          textLayer.render();

        });

    });
  }

  handleClearClick(e) {

    if (confirm('Are you sure you want to throw your work away?')) {
      //localStorage.removeItem(`${this.DOCUMENT_ID}/annotations`);
      this.page1.innerHTML = '';
    }

  }

  handleDragStart(e) {
    //log("handleDragStart");
    e.style.opacity = '0.4'; // this ==> e.target is the source node.
  };

  // set the overlay dimensionss
  overLay(page: any) {

    let h = this.numPages * 792;

    $("#svg-dropzone").css("width", "612");
    $("#svg-dropzone").css("height", h);
    $("#svg-dropzone").attr("width", "612");
    $("#svg-dropzone").attr("height", h);
    $("#svg-dropzone").attr("viewBox", "0 0 612 " + h);
  }

  async saveSvg() {
   
    let svg = "";
    $(".dragOn-drawArea").each(function () {
      let el = $(this);
      if (el.html() !== "") {
        svg = svg + el.html();
      }
    });

    
    await this.documentService.saveAnnotations(this.documentService.currentDoc.guid, svg);

    await this.documentService.addMessage(this.documentService.currentDoc.guid, 'Updated annotation');

  }

  async loadSvg(page: any) {
  
    // overlay
    this.overLay(page);

    let json = await this.documentService.getAnnotations(this.documentService.currentDoc.guid);
    let innerHtml = null;
    if (json) {
      innerHtml = json.annotations;
    }

    if (innerHtml) {
      this.svgDrawer.addHTML(innerHtml, this.locked);
    }

  }

}
