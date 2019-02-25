import { Component, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef, AfterViewInit, OnDestroy, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NavController, NavParams, IonicPage, Segment, LoadingController, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { CryptoCompareService } from '../../services/cryptocompare.service'
import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';
import { DocumentService } from '../../services/document.service';
import { EmailService } from '../../services/email.service';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
// import PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import worker from 'pdfjs-dist/build/pdf.worker.entry';
import PDFAnnotate from 'pdf-annotate';
import annotations from './annotations';
import mockViewport from './mockViewport'
import { MyApp } from '../../app/app.component';
import * as _ from 'underscore';
//import { EmojiPopoverPage } from '../../app/emoji.popover.page';
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
declare let WebFont: any;

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
export class BlockPdfComponent implements OnInit, AfterViewInit, OnDestroy {

  //@ViewChild(AbsoluteDragDirective) vc: AbsoluteDragDirective;
  svgDrawer;

  @Input() showToolBar:any = 0;
  @Input() locked = false;
  @Input() showSignature: 0;
  @Input() showSignHere: 0;
  @Input() showButtons: 0;
  @Input() marginTop = '0px';
  @Input() marginBottom = '130px';
  @ViewChild('sigText') sigTextElement: ElementRef; 
  @ViewChild("fileUploadForm") fileUploadForm: ElementRef;
  @ViewChild("canvasWrapper") canvasWrapper: ElementRef;
  @ViewChild("svgDropZone") svgDropZone: ElementRef;
  // @ViewChild("editableEl") editableEl: ElementRef;
  scale = 2; // 150 DPI - legacy = 1
  canvasWidth = "750px"; // legacy = 612 X 792

  


  public data: any;
  public DOCUMENT_ID = "blockusign/pdf1.txt"; // @TODO not being used, delete in furture
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
  fullToolbar = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    private changeDetector: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    private renderer: Renderer2,
    public toastCntrl: ToastController,
    private emailService: EmailService,
  ) {
    console.log('====> constructor');
    
  }


  ngOnInit() {
    console.log('====> ngOnInit');
    $(document).ready(() => {
      
      this.setCursorFocus(200);

      pdfjsLib.GlobalWorkerOptions.workerSrc = location.origin + "/assets/pdf.worker.js"


      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 12000
      });
      this.loading.present();

      this.init();

    });

  }

  ngAfterViewInit(){
  //   this.renderer.listen(this.sigTextElement.nativeElement, 'keyup', () => {
  //     if(this.sigTextElement.nativeElement.innerHTML == ""){
  //       this.sigTextElement.nativeElement.innerHTML = "[Enter name]"
  //     }  
  //  }); 
    
  }

  registerEmojiEvent(){

    $(document).ready( () =>{
      
      $(document).on("click", ".emoji-picker2", function (e) {
        e.stopPropagation();
        $('.intercom-composer-emoji-popover2').toggleClass("active");
      });
  
      $(document).click(function (e) {
        if ($(e.target).attr('class') != '.intercom-composer-emoji-popover2' && $(e.target).parents(".intercom-composer-emoji-popover2").length == 0) {
          $(".intercom-composer-emoji-popover2").removeClass("active");
        }
      });
  
      $(document).on("click", ".intercom-emoji-picker-emoji", function (e) {
        if (e.target.className == "intercom-emoji-picker-emoji p2"){
          let existing = $(".emojiDiv2").html();
          let emo = $(this).html();
          this.yourName = existing + emo;
          $(".emojiDiv2").html(this.yourName);
         
        }
      });
  
      $('.intercom-composer-popover-input2').on('input', function () {
        var query = this.value;
        if (query != "") {
          $(".intercom-emoji-picker-emoji:not([title*='" + query + "'])").hide();
        }
        else {
          $(".intercom-emoji-picker-emoji").show();
        }
      });

      
    });
   
  }

  registerFontSelector(){
    var fontsArr = ['Cedarville Cursive', 'Roboto', 'Arial', 'Serif', 'Lobster', 'Lato', 'Patua One', 'Oswald', 'Yellowtail', 'Bangers', 'Abril Fatface', 'Alfa Slab One', 'Raleway', 'Montserrat', 'Lora', 'Titillium Web'];

    var $fontSelector = $('.font-selector select');
    var $fontSize = $('.font-size');
    var $bold = $('.bold');
    var $preview = $('.emojiDiv2');

    $fontSelector.on('change', function() {
      $(this).css({
        fontFamily: $(this).val()
      });
      $preview.css({
        fontFamily: $(this).val()
      });
    });

    $fontSize.on('change', function() {
      $preview.css('font-size', $(this).val() + 'px');
    });

    $bold.on('click', function() {
      if ($preview.css('font-weight') == '400') {
        $preview.css('font-weight', 'bold');
        $bold.css('background-color', 'black');
      }
      else{
        $preview.css('font-weight', 'normal');
        $bold.css('background-color', 'transparent');
      }
      
    });



    _.forEach(fontsArr, function(fontName, index){
      var $option = $('<option style="font-family:'+fontName+'">'+fontName+'</option>');
      $fontSelector.append($option);
    });

    $fontSelector.trigger('change');

    WebFont.load({
      google: {
        families: fontsArr
      }
    });


  }

  setCursorFocus(time) {
    if (window.innerWidth > 630){ // setting focus on mobile is annoying
      setTimeout(function(){ 
        let el = $(".editSigContent").first()
        el.focus();
      }, time);
    }
  }

  registerColorPicker(){
    $('#spectrum').spectrum({
      showPalette: true,
      color: '#008000',
      palette: [
          ['#008000', '#000000', '#454cad'],
          ['#D50000', '#FF4081', '#AA00FF'],
          ['#6200EA', '#304FFE', '#2962FF'],
          ['#0091EA', '#00B8D4', '#00BFA5'],
          ['#00C853', '#64DD17', '#AEEA00'],
          ['#FFD600', '#FFAB00', '#FF6D00'],
          ['#DD2C00', '#3E2723', '#616161']
      ]
    });

    $('#spectrum').on('change.spectrum', (e, tinycolor) => {
      setTimeout( () => {
        $('.emojiDiv2').attr("fill",$('#spectrum').spectrum('get').toHexString() );
        return false;
      }, 100);
    });

    const el = $('.sp-replacer:first');
    el.css('background-color', 'transparent');
    el.css('border', 'none');
  }

  destroyEmojiEvents(){
    $(document).off("click", ".emoji-picker2");
    $(document).off("click");
    $('.intercom-composer-popover-input2').off('input');
  }


  ngOnDestroy() {
    console.log("====> ngOnDestroy");
   
  }

  init() {
    
    this.registerFontSelector();
    this.registerColorPicker();

    this.svgDrawer = dragOn(document.querySelector(".dropzone"), {
      listenTo: '.draggable'
    });

    let docData = getQueryParam('docData');
    if (docData) {
      this.loading.dismiss();
      this.setCursorFocus(3000);
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

    if (this.yourName == null || this.yourName == "" || this.yourName == undefined){
      this.yourName = "[Edit Name]"
    }

  }


  async getFile() {

    if (this.isOldDoc()){
      this.scale = 1;
      this.canvasWidth = "612px";
    }
    $(this.canvasWrapper.nativeElement).css('width', this.canvasWidth);
    
    let data = await this.documentService.getDocument(this.documentService.currentDoc.guid + ".pdf", this.documentService.currentDoc.documentKey);
    this.pdfBuffer = data;

    let pdfData = new Uint8Array(this.pdfBuffer);

    this.loadPdf(pdfData); // loads the pdf to the screen with the text layers

    if (this.documentService.currentDoc.isCompleted){
      console.log('This document is locked ' + this.documentService.currentDoc.guid);
      this.locked = true;
      this.showToolBar = false;
    }

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
    //localStorage.removeItem('svg');

    let toast = this.toastCntrl.create({
      message: 'Cleared!',
      duration: 2000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

  }

  loadPdf(pdfData) {

    let loadingTask = pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then((pdf) => {

      this.numPages = pdf.numPages;
      this.thePDF = pdf;
      
      // let viewer = document.getElementById('canvasWrapper');
      let viewer = this.canvasWrapper.nativeElement;
      let page;
      for (page = 1; page <= pdf.numPages; page++) {
        let canvas = document.createElement("canvas");
        viewer.appendChild(canvas);
        this.renderPage(page, canvas);
      }

      setTimeout( ()=>{
        this.loadSvg(1);
      }, 500 );
     

      this.loading.dismiss();
      this.setCursorFocus(3000);

    }, (reason) => {

      // PDF loading error
      console.error(reason);
      this.loading.dismiss();
      this.setCursorFocus(3000);
    });

  }


  renderPage(pageNumber, canvas) {
    this.thePDF.getPage(pageNumber).then( (page) => {
      let viewport = page.getViewport(this.scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      //this.canvasWrapper.nativeElement.style.width = Math.floor(viewport.width/scale) + 'pt';
      //this.canvasWrapper.nativeElement.style.height = Math.floor(viewport.height/scale) + 'pt';
     
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
          // let div = document.getElementById(`${this.containerId}`);
          // let div = document.getElementById(`canvasWrapper`);
          let div = this.canvasWrapper.nativeElement;
          div.appendChild(textLayerDiv);

          //Create new instance of TextLayerBuilder class
          let textLayer = new TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewport
          });

          // Set text-fragments
          // textLayer.setTextContent(textContent);

          // Render text-fragments
          // textLayer.render();

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
    
    // one canvas per pdf page
    let childrenCavases = this.canvasWrapper.nativeElement.getElementsByTagName("canvas");
    let oneCanvas = childrenCavases[0];
    let w = oneCanvas.offsetWidth;
    let h = this.numPages * oneCanvas.offsetHeight;
    // pdf page break pixels
    h = h + (this.numPages * 4);

    $(this.svgDropZone.nativeElement).css("width", w);
    $(this.svgDropZone.nativeElement).css("height", h);
    $(this.svgDropZone.nativeElement).attr("width", w);
    $(this.svgDropZone.nativeElement).attr("height", h);
    $(this.svgDropZone.nativeElement).attr("viewBox", "0 0 " + w + " " + h);
  }

  async saveSvg() {

    // if it's locked then do not save
    if (this.documentService.currentDoc.isCompleted){
      return;
    }

   
    let svg = "";
    $(".dragOn-drawArea").each(function () {
      let el = $(this);
      if (el.html() !== "") {
        svg = svg + el.html();
      }
    });

    
    await this.documentService.saveAnnotations(this.documentService.currentDoc.guid, svg);

    let toast = this.toastCntrl.create({
      message: 'Saved!',
      duration: 2000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

    await this.documentService.addMessage(this.documentService.currentDoc.guid, 'Updated annotation');
    
    // if on e-sign page give user option to send email to owner
    if (!this.showSignHere){
      this.presentEmail();
    }
   
    return true;
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

  public editSignature(){
    
    let sig;
    let alert = this.alertCtrl.create({
      title: 'Please enter a new Signature',
      message: '',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'sig',
          placeholder: 'signature',
          value: sig
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
            this.yourName = data.sig;

            if (this.yourName == null || this.yourName == "" || this.yourName == undefined){
              this.yourName = "[Edit Name]";
              
            }

            $(".emojiDiv2").html(this.yourName);

          }
        }
      ]
    });
    alert.present();
  
  }

  presentPopover(myEvent) {
    // let popover = this.popoverCtrl.create(EmojiPopoverPage, {  });
    // popover.present({
    //   ev: myEvent
    // });
  }

  async presentEmail(){

    let ownerEmail = "";
    let me = blockstack.loadUserData().username;

    try{
      let collaborators  = await this.documentService.getCollaborators(this.documentService.currentDoc.guid);
      if (collaborators){
        let notMe = collaborators.filter(f=>f.userId != me);
        ownerEmail = notMe[(notMe.length - 1)].email;
      }
    } catch(e){
      console.error('error getting collaborators in block-pdf.ts', e);
    }
    

    let alert = this.alertCtrl.create({
      title: 'Success!',
      message: 'Thanks for signing! Do you want to notify the owner stating that you signed the document? This will kick off the process to "Seal the Deal" ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Send',
          handler:  data => {
          
            if (data.email){
              let link = this.genLink();
      
              let fileName = this.documentService.currentDoc.fileName;
              let subject = me + " has signed the document - " + fileName;
              let content = "Please review here: <br/><br/><a href='" + link + "' >"+fileName+"</a> ";
              content = content + "<br/><br/>Thanks, <br/>Blockusign";
              this.emailService.sendEmail(data.email, subject, content);
            } else{
              return false;
            }          
          }
        }
      ],
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          value: ownerEmail
        }
      ],
    });
    alert.present();
  }

  genLink(){
    let documentLink = window.location.origin + "/#/review/" + this.documentService.currentDoc.guid;
    return documentLink;
  }

  clearPlaceHolder(e){
    if (this.yourName == "[Edit Name]"){
      this.yourName = "";
      $('.emojiDiv2').html("&nbsp;")
      $(e.currentTarget).focus();
    }
  }

  onKey(e){
    if(this.sigTextElement.nativeElement.textContent == "" ){
      this.sigTextElement.nativeElement.innerHTML = "&nbsp;";
    }
  }

  isOldDoc(){
    let now: any = 1537401377458; // Date.now();
    
    let docCreated:any = this.documentService.currentDoc.createdAt;
    return (  docCreated < now );
  }

  toggleToolbar(){
    if (this.fullToolbar == false){
      this.fullToolbar = true;
    } else{
      this.fullToolbar = false;
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   //console.log('resize ', event.target);
  //   // event.target.innerWidth;
  //   let childrenCavases = this.canvasWrapper.nativeElement.getElementsByTagName("canvas");
  //   let oneCanvas = childrenCavases[0];
  //   let w = oneCanvas.offsetWidth;
  //   let h = this.numPages * oneCanvas.offsetHeight;
  //   console.log('resize', w, h);
  //   // $(this.svgDropZone.nativeElement).css("width", this.canvasWidth.toString());
  //   // $(this.svgDropZone.nativeElement).css("height", h);
  //   // $(this.svgDropZone.nativeElement).attr("width", this.canvasWidth.toString());
  //   // $(this.svgDropZone.nativeElement).attr("height", h);
  //   // $(this.svgDropZone.nativeElement).attr("viewBox", "0 0 " + this.canvasWidth.toString() + " " + h);

  // }

 
 
}
