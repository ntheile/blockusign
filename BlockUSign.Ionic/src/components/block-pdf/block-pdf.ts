import { Component, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef, AfterViewInit, OnDestroy, OnInit, ElementRef, Renderer2, HostListener, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
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
import Shepherd from 'shepherd.js';

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

  @Input() showToolBar: any = 0;
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
  flag;
  mouseEndEventDeviceSpecific = "mouseup";

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

      if (this.isMobile()){
        this.mouseEndEventDeviceSpecific = "touchend"
      }

      this.init();
      
    });

  }

  ngAfterViewInit() {
    //   this.renderer.listen(this.sigTextElement.nativeElement, 'keyup', () => {
    //     if(this.sigTextElement.nativeElement.innerHTML == ""){
    //       this.sigTextElement.nativeElement.innerHTML = "[Enter name]"
    //     }  
    //  }); 


  }

  registerEmojiEvent() {

    $(document).ready(() => {

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
        if (e.target.className == "intercom-emoji-picker-emoji p2") {
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

  registerFontSelector() {
    var fontsArr = ['Cedarville Cursive', 'Roboto', 'Arial', 'Serif', 'Lobster', 'Lato', 'Patua One', 'Oswald', 'Yellowtail', 'Bangers', 'Abril Fatface', 'Alfa Slab One', 'Raleway', 'Montserrat', 'Lora', 'Titillium Web'];

    var $fontSelector = $('.font-selector select');
    var $fontSize = $('.font-size');
    var $bold = $('.bold');
    var $preview = $('.emojiDiv2');

    $fontSelector.on('change', function () {
      $(this).css({
        fontFamily: $(this).val()
      });
      $preview.css({
        fontFamily: $(this).val()
      });
    });

    $fontSize.on('change', function () {
      $preview.css('font-size', $(this).val() + 'px');
    });

    $bold.on('click', function () {
      if ($preview.css('font-weight') == '400') {
        $preview.css('font-weight', 'bold');
        $bold.css('background-color', 'black');
      }
      else {
        $preview.css('font-weight', 'normal');
        $bold.css('background-color', 'transparent');
      }

    });



    _.forEach(fontsArr, function (fontName, index) {
      var $option = $('<option style="font-family:' + fontName + '">' + fontName + '</option>');
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
    if (window.innerWidth > 630) { // setting focus on mobile is annoying
      setTimeout(function () {
        let el = $(".editSigContent").first()
        el.focus();
      }, time);
    }
  }

  registerColorPicker() {
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
      setTimeout(() => {
        $('.emojiDiv2').attr("fill", $('#spectrum').spectrum('get').toHexString());
        return false;
      }, 100);
    });

    const el = $('.sp-replacer:first');
    el.css('background-color', 'transparent');
    el.css('border', 'none');
  }

  destroyEmojiEvents() {
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

    $(document).ready( ()=>{
        this.registerAnnotationEventHandlers();
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

    if (this.yourName == null || this.yourName == "" || this.yourName == undefined) {
      this.yourName = "[Edit Name]"
    }

  }

  registerAnnotationEventHandlers(){
    this.svgDrawer.currentEl.addEventListener('annotationDropped', (e) => { 
      let el = e.detail;
      console.log('annotationDropped', e);
      this.generateSigningInstructionInstance(el, {'click': true} );
    }, false);
  }


  async getFile() {

    if (this.isOldDoc()) {
      this.scale = 1;
      this.canvasWidth = "612px";
    }
    $(this.canvasWrapper.nativeElement).css('width', this.canvasWidth);

    let data = await this.documentService.getDocument(this.documentService.currentDoc.guid + ".pdf", this.documentService.currentDoc.documentKey);
    this.pdfBuffer = data;

    let pdfData = new Uint8Array(this.pdfBuffer);

    this.loadPdf(pdfData); // loads the pdf to the screen with the text layers

    if (this.documentService.currentDoc.isCompleted) {
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

      setTimeout(() => {
        this.loadSvg(1);
      }, 500);


      this.loading.dismiss();
      this.setCursorFocus(3000);


      // if route is e-Sign
      let routeName = this.navCtrl.getActive();
      if ( window.location.href.includes('#/sign') ) {
        this.startSignWizard();
      }


    }, (reason) => {

      // PDF loading error
      console.error(reason);
      this.loading.dismiss();
      this.setCursorFocus(3000);
    });

  }


  renderPage(pageNumber, canvas) {
    this.thePDF.getPage(pageNumber).then((page) => {
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
    h = h + (this.numPages * 30.5);

    $(this.svgDropZone.nativeElement).css("width", w);
    $(this.svgDropZone.nativeElement).css("height", h);
    $(this.svgDropZone.nativeElement).attr("width", w);
    $(this.svgDropZone.nativeElement).attr("height", h);
    $(this.svgDropZone.nativeElement).attr("viewBox", "0 0 " + w + " " + h);
  }

  async saveSvg() {

    // if it's locked then do not save
    if (this.documentService.currentDoc.isCompleted) {
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
    if (!this.showSignHere) {
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
      if ( window.location.href.includes('#/annotate') ) {
        this.createSigningInstructionsPopOver();
      }
    }

  }

  createSigningInstructionsPopOver() {
    // add click event for popup annotation help
    setTimeout(()=>{
      let annotations = this.svgDrawer.drawArea.children;
      for (let annotation of annotations) {
       this.generateSigningInstructionInstance(annotation, null);
      }
    }, 2000);
  }

  generateSigningInstructionInstance(annotation, options){

    annotation.addEventListener(this.mouseEndEventDeviceSpecific, (el) => {

      let altText = "[ Add signing instructions here ... ]";
      try {
        altText = el.srcElement.attributes["alt"].value;
      } catch (e) { }

      let tour2 = new Shepherd.Tour({
        defaultStepOptions: {
          classes: 'shadow-md bg-purple-dark',
          scrollTo: false
        }
      });
      tour2.addStep(`step`, {
        title: '',
        text: altText,
        attachTo: `[x="${el.srcElement.x.baseVal.value}"][y="${el.srcElement.y.baseVal.value}"] top`,
        advanceOn: '.docs-link click',
        buttons: [
          {
            text: 'Delete',
            events: {
              'click': function (e) {
                console.log('delete', tour2);
                let el = tour2.steps[0];
                el.target.remove();
                $('.ion-page').off('click');
                return tour2.complete();
              }
            }
          },
          {
            text: 'Ok',
            events: {
              'click': function (e) {
                console.log('complete', tour2);
                let el = tour2.steps[0];
                console.log(el.options.text);
                $(el.target).attr('alt', ($(".shepherd-text")[0]).innerHTML);
                $('.ion-page').off('click');
                return tour2.complete();
              }
            }
          }
        ],
      });

      $('.ion-page').click(((e)=> {
        console.log('blur', e.target.classList);
        if ( e.target.classList.contains('shepherd-target') || e.target.classList.contains('shepherd-text') || 
          e.target.classList.contains('tippy-tooltip')  ||  e.target.classList.contains('tippy-content') || e.target.classList.contains('shepherd-footer') ){
          return;
        }
        // if focus is not on shepard then close
        tour2.complete();
        $('.ion-page').off('click');
      }));

      tour2.start();
     
      $(".shepherd-text").attr("contenteditable", "true");
      $(".shepherd-text").focus();
     
      
    });

    if (options){
      if(options.click){
        // yeah she dirty
        setTimeout( ()=>{
          this.simulateTriggerMouseEvent(annotation, this.mouseEndEventDeviceSpecific);
        }, 500);
      }
    }

  }

  simulateTriggerMouseEvent (node, eventType) {
    let clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent (clickEvent);
  }


  public editSignature() {

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

            if (this.yourName == null || this.yourName == "" || this.yourName == undefined) {
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

  async presentEmail() {

    let ownerEmail = "";
    let me = blockstack.loadUserData().username;

    try {
      let collaborators = await this.documentService.getCollaborators(this.documentService.currentDoc.guid);
      if (collaborators) {
        let notMe = collaborators.filter(f => f.userId != me);
        ownerEmail = notMe[(notMe.length - 1)].email;
      }
    } catch (e) {
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
          handler: data => {

            if (data.email) {
              let link = this.genLink();

              let fileName = this.documentService.currentDoc.fileName;
              let subject = me + " has signed the document - " + fileName;
              let content = "Please review here: <br/><br/><a href='" + link + "' >" + fileName + "</a> ";
              content = content + "<br/><br/>Thanks, <br/>Blockusign";
              this.emailService.sendEmail(data.email, subject, content);
            } else {
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

  genLink() {
    let documentLink = window.location.origin + "/#/review/" + this.documentService.currentDoc.guid;
    return documentLink;
  }

  clearPlaceHolder(e) {
    if (this.yourName == "[Edit Name]") {
      this.yourName = "";
      $('.emojiDiv2').html("&nbsp;")
      $(e.currentTarget).focus();
    }
  }

  onKey(e) {
    if (this.sigTextElement.nativeElement.textContent == "") {
      this.sigTextElement.nativeElement.innerHTML = "&nbsp;";
    }
  }

  isOldDoc() {
    let now: any = 1537401377458; // Date.now();

    let docCreated: any = this.documentService.currentDoc.createdAt;
    return (docCreated < now);
  }

  toggleToolbar() {
    if (this.fullToolbar == false) {
      this.fullToolbar = true;
    } else {
      this.fullToolbar = false;
    }
  }

  startSignWizard() {

    setTimeout(() => {
      let annotationsCount = $("g").children().length;
      let tour2 = new Shepherd.Tour({
        defaultStepOptions: {
          classes: 'shadow-md bg-purple-dark',
          scrollTo: true,
          scrollToHandler: function (el) {
            if (el) {
              $(".block-pdf-page > .scroll-content")[0].scrollTo(el.x.baseVal.value, el.y.baseVal.value, { duration: 2000 });
            }
          }
        },
      });
      for (let i = 1; i <= annotationsCount; i++) {
        let el = $('g').children()[i - 1];
        if (el.nodeName == "image") {
          let text = $(el).attr('alt');
          if (text) {
            if (text == "<p>[ Add signing instructions here ... ]</p>") {
              text = "Sign here please";
            }
            tour2.addStep(`step${i}`, {
              title: '',
              text: text,
              attachTo: `g > image:nth-child(${i}) top`,
              advanceOn: '.docs-link click',
              buttons: [
                {
                  text: 'Exit',
                  events: {
                    'click': function (e) {
                      return tour2.complete();
                    }
                  }
                },
                {
                  text: 'Next',
                  action: tour2.next
                }
              ]
            });
          }
          
        }
      }
      tour2.start();
    }, 1000);
  }

  // device detection
  isMobile(){
    let isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
    }
    return isMobile;
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
