webpackJsonp([1],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_cryptocompare_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_absolute_drag_absolute_drag__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pdf_annotate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_pdf_annotate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_pdf_annotate__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











//declare let global: any;
/// https://www.sitepoint.com/custom-pdf-rendering/
var ListPage = (function () {
    function ListPage(navCtrl, navParams, cryptoCompareService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cryptoCompareService = cryptoCompareService;
        this.DOCUMENT_ID = "blockusign/pdf1.txt";
        this.UI = __WEBPACK_IMPORTED_MODULE_9_pdf_annotate___default.a;
        this.containerId = "pageContainer1";
        this.canvasId = "canvas1";
        this.fileName = "blockusign/pdf1.pdf";
        this.selectedElement = null;
        this.prevElement = null;
        this.currentX = 0;
        this.currentY = 0;
    }
    ListPage.prototype.ionViewDidLoad = function () {
        //let pdfData = this.loadPDFData(); // loads pdf data from localStorage, make sure you uploaded it from home.js
        var _this = this;
        blockstack.getFile(this.fileName, { decrypt: true }).then(function (data) {
            _this.pdfBuffer = data;
            var pdfData = new Uint8Array(_this.pdfBuffer);
            _this.loadPdf(pdfData); // loads the pdf to the screen with the text layers
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
    };
    ListPage.prototype.clear = function () {
        this.vc.svgDrawer.cleanHTML();
        this.vc.svgDrawer.cleanDrawArea();
        this.vc.svgDrawer.updateMetrics();
        localStorage.removeItem('svg');
    };
    ListPage.prototype.ionViewWillLeave = function () {
        $(".dropzone").unbind();
    };
    ListPage.prototype.loadPdf = function (pdfData) {
        var _this = this;
        var loadingTask = __WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf___default.a.getDocument({ data: pdfData });
        loadingTask.promise.then(function (pdf) {
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');
                var scale = 1.0;
                var viewport = page.getViewport(scale);
                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById('canvas1');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext)
                    .then(function () {
                    // Get text-fragments
                    return page.getTextContent();
                }).then(function (textContent) {
                    // Create div which will hold text-fragments
                    var textLayerDiv = document.createElement("div");
                    // Set it's class to textLayer which have required CSS styles
                    textLayerDiv.setAttribute("class", "textLayer");
                    // Append newly created div in `div#page-#{pdf_page_number}`
                    var div = document.getElementById("" + _this.containerId);
                    div.appendChild(textLayerDiv);
                    // Create new instance of TextLayerBuilder class
                    var textLayer = new TextLayerBuilder({
                        textLayerDiv: textLayerDiv,
                        pageIndex: page.pageIndex,
                        viewport: viewport
                    });
                    // Set text-fragments
                    textLayer.setTextContent(textContent);
                    // Render text-fragments
                    textLayer.render();
                    // overlay
                    _this.overLay();
                    // load svg
                    _this.loadSvg();
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    };
    ListPage.prototype.loadPDFData = function () {
        var base64pdfData = localStorage.getItem("pdfStr");
        function base64ToUint8Array(base64) {
            var raw = atob(base64);
            var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
            for (var i = 0, len = raw.length; i < len; ++i) {
                uint8Array[i] = raw.charCodeAt(i);
            }
            return uint8Array;
        }
        return base64ToUint8Array(base64pdfData);
    };
    ListPage.prototype.setupAnnotations = function (page, viewport, canvas, $annotationLayerDiv) {
        var canvasOffset = $(canvas).offset();
        var promise = page.getAnnotations().then(function (annotationsData) {
            viewport = viewport.clone({
                dontFlip: true
            });
            for (var i = 0; i < annotationsData.length; i++) {
                var data = annotationsData[i];
                var annotation = __WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf___default.a.Annotation.fromData(data);
                if (!annotation || !annotation.hasHtml()) {
                    continue;
                }
                var element = annotation.getHtmlElement(page.commonObjs);
                data = annotation.getData();
                var rect = data.rect;
                var view = page.view;
                rect = __WEBPACK_IMPORTED_MODULE_8_pdfjs_dist_build_pdf___default.a.Util.normalizeRect([
                    rect[0],
                    view[3] - rect[1] + view[1],
                    rect[2],
                    view[3] - rect[3] + view[1]
                ]);
                element.style.left = (canvasOffset.left + rect[0]) + 'px';
                element.style.top = (canvasOffset.top + rect[1]) + 'px';
                element.style.position = 'absolute';
                var transform = viewport.transform;
                var transformStr = 'matrix(' + transform.join(',') + ')';
                CustomStyle.setProp('transform', element, transformStr);
                var transformOriginStr = -rect[0] + 'px ' + -rect[1] + 'px';
                CustomStyle.setProp('transformOrigin', element, transformOriginStr);
                if (data.subtype === 'Link' && !data.url) {
                    // In this example,  I do not handle the `Link` annotations without url.
                    // If you want to handle those links, see `web/page_view.js`.
                    continue;
                }
                $annotationLayerDiv.append(element);
            }
        });
        return promise;
    };
    ListPage.prototype.setActiveToolbarItem = function (type, button) {
        var active = document.querySelector('.toolbar button.active');
        if (active) {
            active.classList.remove('active');
        }
        if (button) {
            button.classList.add('active');
        }
        if (this.tooltype !== type) {
            localStorage.setItem(this.DOCUMENT_ID + "/tooltype", type);
        }
        this.tooltype = type;
        this.UI.UI.enableRect(type);
    };
    ListPage.prototype.handleToolbarClick = function (e) {
        if (e.target.nodeName === 'BUTTON') {
            this.setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
        }
    };
    ListPage.prototype.handleClearClick = function (e) {
        if (confirm('Are you sure you want to throw your work away?')) {
            localStorage.removeItem(this.DOCUMENT_ID + "/annotations");
            this.page1.innerHTML = '';
        }
    };
    ListPage.prototype.setupToolBar = function () {
        this.tooltype = localStorage.getItem(this.DOCUMENT_ID + "/tooltype") || 'area';
        if (this.tooltype) {
            this.setActiveToolbarItem(this.tooltype, document.querySelector(".toolbar button[data-tooltype=" + this.tooltype + "]"));
        }
    };
    ListPage.prototype.handleDragStart = function (e) {
        //log("handleDragStart");
        e.style.opacity = '0.4'; // this ==> e.target is the source node.
    };
    ;
    ListPage.prototype.overLay = function () {
    };
    ListPage.prototype.saveSvg = function () {
        var svg = $(".dragOn-drawArea").html();
        if (svg) {
            localStorage.setItem("svg", svg);
        }
    };
    ListPage.prototype.loadSvg = function () {
        var innerHtml = localStorage.getItem("svg");
        if (innerHtml) {
            this.vc.svgDrawer.addHTML(innerHtml);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__directives_absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__directives_absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__directives_absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */]) === "function" && _a || Object)
    ], ListPage.prototype, "vc", void 0);
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Block-U-Sign</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="centerMe">\n    <!-- <button ion-button class="clear" title="Clear" (click)="handleClearClick()">×</button> -->\n\n    <!-- <img class="draggable draggable-droppable" height="45px" draggable="true" src="./../../assets/imgs/sign.png" /> -->\n    \n    \n    \n\n    <button ion-button (click)="saveSvg()">Save</button>\n    <button ion-button (click)="clear()">Clear</button>\n    <button ion-button (click)="loadSvg()">Load</button>\n\n    <img id="sigImg" height="45px" absolute-drag class="draggable draggable-droppable" draggable="true" src="./../../assets/imgs/sign.png" />\n    \n\n    <!-- <svg class="annotationLayer"  class="dropzone resizable" id="svg-dropzone" viewBox="0 0 612 792" width="800" height="600"> </svg>-->\n\n\n\n    \n\n    <div class="page" id="pageContainer1" data-page-number="1" style="position: relative;">\n\n      <div id="canvasWrapper" style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px">\n        <canvas id="canvas1" width="612" height="792" style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px"></canvas>\n      </div>\n      <svg id="svg-dropzone" class="dropzone resizable" draggable="true" viewBox="0 0 612 792" width="612" height="792" xmlns="http://www.w3.org/2000/svg"\n          style="position: absolute; \n                  left: 0px; \n                  top:0px;\n                  z-index: 200000;\n                  width: 612;\n                  padding: 0px 0px 0px 0px; \n                  margin: 0px 0px 0px 0px;\n                  height: 792">\n      </svg>\n      <div class="textLayer"></div>\n    </div>\n\n\n  </div>\n\n\n  <svg  class="annotationLayer" xmlns="http://www.w3.org/2000/svg">\n\n  </svg>\n\n</ion-content>'/*ion-inline-end:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/pages/list/list.html"*/,
            styles: ['list.scss']
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_cryptocompare_service__["a" /* CryptoCompareService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_cryptocompare_service__["a" /* CryptoCompareService */]) === "function" && _d || Object])
    ], ListPage);
    return ListPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 139;

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pdf_annotate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pdf_annotate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_pdf_annotate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_global_service__ = __webpack_require__(246);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//declare let $: any;
var $ = document.querySelectorAll.bind(document);
/// Pdf js basic example - https://jsfiddle.net/pdfjs/cq0asLqz/?utm_source=website&utm_medium=embed&utm_campaign=cq0asLqz
/// Annotations sample - http://jsfiddle.net/seikichi/RuDvz/2/
var HomePage = (function () {
    function HomePage(navCtrl, loadingCtrl, globalService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globalService = globalService;
        this.isLoggedIn = false;
        this.loginState = "Login";
        this.fileName = "blockusign/pdf1.pdf";
        var s = globalService.GaiUrl;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.showProfile();
        this.ekUpload();
        this.setupDiscordMenu();
    };
    HomePage.prototype.login = function () {
        var origin = window.location.origin;
        blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
    };
    HomePage.prototype.next = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__list_list__["a" /* ListPage */]);
    };
    HomePage.prototype.logout = function () {
        blockstack.signUserOut(window.location.origin);
    };
    HomePage.prototype.showProfile = function () {
        if (blockstack.isUserSignedIn()) {
            var profile = blockstack.loadUserData();
            this.name = profile.username;
            this.isLoggedIn = true;
            this.loginState = "[Logout]";
        }
        else if (blockstack.isSignInPending()) {
            blockstack.handlePendingSignIn().then(function (userData) {
                window.location = window.location.origin;
            });
        }
        else {
            this.login();
        }
    };
    HomePage.prototype.saveFile = function () {
        blockstack.putFile(this.fileName, this.pdfBuffer, { encrypt: true }).then(function (data) {
        });
    };
    HomePage.prototype.getFile = function () {
        var _this = this;
        blockstack.getFile(this.fileName, { decrypt: true }).then(function (data) {
            _this.pdfBuffer = data;
        });
    };
    HomePage.prototype.loadFile = function () {
        var _this = this;
        var fileInput = document.getElementById('file-upload');
        var firstFile = fileInput.files[0];
        var startByte = 0;
        var endByte = firstFile.size;
        var opt_startByte = startByte.toString();
        var opt_stopByte = endByte.toString();
        var files = document.getElementById('file-upload').files;
        if (!files.length) {
            alert('Please select a file!');
            return;
        }
        var file = files[0];
        var start = parseInt(opt_startByte) || 0;
        var stop = parseInt(opt_stopByte) || file.size - 1;
        var reader = new FileReader();
        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                // document.getElementById('byte_content').textContent = evt.target.result;
                // document.getElementById('byte_range').textContent =
                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                //         ' of ', file.size, ' byte file'].join('');
            }
            var filename = fileInput.files[0].name;
            //localStorage.setItem("FileName", filename);
        };
        var blob = file.slice(start, stop + 1);
        //reader.readAsBinaryString(blob);
        reader.onload = function (evt) {
            var arraybuffer = evt.target.result;
            _this.pdfBuffer = arraybuffer;
            _this.saveFile();
            var pdfData = new Uint8Array(arraybuffer);
            _this.savePdfAsString(pdfData);
            _this.createPdf(pdfData);
        };
        reader.readAsArrayBuffer(blob);
    };
    HomePage.prototype.createPdf = function (pdfData) {
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        var pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        __WEBPACK_IMPORTED_MODULE_4_pdf_annotate___default.a.setStoreAdapter(new __WEBPACK_IMPORTED_MODULE_4_pdf_annotate___default.a.LocalStoreAdapter());
        var loadingTask = pdfjsLib.getDocument({ data: pdfData });
        loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded');
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');
                var scale = 1.5;
                var viewport = page.getViewport(scale);
                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.then(function () {
                    console.log('Page rendered');
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    };
    HomePage.prototype.savePdfAsString = function (pdf) {
        this.largeuint8ArrToString(pdf, function (strPdf) {
            var base64StringPdf = btoa(strPdf);
            //localStorage.setItem("pdfStr", base64StringPdf);
        });
    };
    HomePage.prototype.getPdfFromString = function (base64PdfString) {
        // decode base64 string, remove space for IE compatibility
        var binary = atob(base64PdfString.replace(/\s/g, ''));
        var len = binary.length;
        var arraybuffer = new ArrayBuffer(len);
        var pdfData = new Uint8Array(arraybuffer);
    };
    HomePage.prototype.largeuint8ArrToString = function (uint8arr, callback) {
        var bb = new Blob([uint8arr]);
        var f = new FileReader();
        f.onload = function (e) {
            callback(e.target.result);
        };
        f.readAsBinaryString(bb);
    };
    // File Upload https://codepen.io/mattsince87/pen/yadZXv?editors=0010#0
    HomePage.prototype.ekUpload = function () {
        var self = this;
        function Init() {
            console.log("Upload Initialised");
            var fileSelect = document.getElementById('file-upload'), fileDrag = document.getElementById('file-drag'), submitButton = document.getElementById('submit-button');
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
            var xhr = new XMLHttpRequest(), fileInput = document.getElementById('class-roster-file'), pBar = document.getElementById('file-progress'), fileSizeLimit = 2048; // In MB
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
                }
                else {
                    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
                }
            }
        }
        // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
        else {
            document.getElementById('file-drag').style.display = 'none';
        }
    };
    HomePage.prototype.setupDiscordMenu = function () {
        $(".focusable, .button").forEach(function (el) {
            // blur only on mouse click
            // for accessibility, keep focus when keyboard focused
            el.addEventListener("mousedown", function (e) { return e.preventDefault(); });
            el.setAttribute("tabindex", "0");
        });
        $(".server").forEach(function (el) {
            el.addEventListener("click", function () {
                var activeServer = $(".server.active")[0];
                activeServer.classList.remove("active");
                activeServer.removeAttribute("aria-selected");
                el.classList.add("active");
                el.setAttribute("aria-selected", true);
            });
        });
        $(".channel-text").forEach(function (el) {
            el.addEventListener("click", function () {
                $(".channel-text.active")[0].classList.remove("active");
                el.classList.add("active");
            });
        });
        // focus/blur on channel header click
        $(".channels-header")[0].addEventListener("click", function (e) {
            e.preventDefault();
            var focused = document.activeElement === e.target;
            focused ? e.target.blur() : e.target.focus();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/pages/home/home.html"*/'<ion-content class="discord">\n  <!-- https://codepen.io/thesbros/pen/vxpMPp -->\n  <main class="container">\n    <aside class="servers">\n      <div class="servers-collection">\n        <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">\n          <div class="server-icon">\n            <svg>\n              <use xlink:href="#icon-friends" />\n            </svg>\n          </div>\n        </div>\n      </div>\n\n      <div class="servers-collection">\n        <div class="server focusable unread" role="button" aria-label="Discord Developers unread">\n          <div class="server-icon">\n            <img src="https://cdn.discordapp.com/icons/41771983423143937/edc44e98a690a1f76c5ddec68a0a6b9e.png" />\n          </div>\n        </div>\n      </div>\n\n      <div class="servers-collection">\n        <div class="server focusable active" role="button" aria-label="My Server" aria-selected="true">\n          <div class="server-icon">\n            <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png" />\n          </div>\n        </div>\n      </div>\n    </aside>\n\n\n\n    <aside class="channels">\n      <header class="channels-header focusable">\n        <h3 role="header" class="channels-header-name" style="padding-right: 10px;">blockusign</h3>\n        <button ion-button style="padding: 10px 10px 10px 10px; background: green; height: 45px;"> NEW + </button>\n        <svg role="button" aria-label="Dropdown" class="channels-header-dropdown">\n          <use xlink:href="#icon-dropdown" />\n        </svg>\n      </header>\n\n      <section class="channels-list">\n\n        <header class="channels-list-header focusable">\n          <span>Documents</span>\n        </header>\n\n        <ul class="channels-list-text">\n          <li class="channel focusable channel-text active">\n            <span class="channel-name">blockusign nda.pdf</span>\n            <button class="button" role="button" aria-label="Invite">\n              <svg>\n                <use xlink:href="#icon-invite" />\n              </svg>\n            </button>\n            <button class="button" role="button" aria-label="settings">\n              <svg>\n                <use xlink:href="#icon-channel-settings" />\n              </svg>\n            </button>\n          </li>\n\n          <li class="channel focusable channel-text">\n            <span class="channel-name">my photo release form.pdf</span>\n            <button class="button" role="button" aria-label="Invite">\n              <svg>\n                <use xlink:href="#icon-invite" />\n              </svg>\n            </button>\n            <button class="button" role="button" aria-label="settings">\n              <svg>\n                <use xlink:href="#icon-channel-settings" />\n              </svg>\n            </button>\n          </li>\n\n          <li class="channel focusable channel-text">\n            <span class="channel-name">may lease.pdf</span>\n            <button class="button" role="button" aria-label="Invite">\n              <svg>\n                <use xlink:href="#icon-invite" />\n              </svg>\n            </button>\n            <button class="button" role="button" aria-label="settings">\n              <svg>\n                <use xlink:href="#icon-channel-settings" />\n              </svg>\n            </button>\n          </li>\n\n          <li class="channel focusable channel-text">\n            <span class="channel-name">escrow agreement.pdf</span>\n            <button class="button" role="button" aria-label="Invite">\n              <svg>\n                <use xlink:href="#icon-invite" />\n              </svg>\n            </button>\n            <button class="button" role="button" aria-label="settings">\n              <svg>\n                <use xlink:href="#icon-channel-settings" />\n              </svg>\n            </button>\n          </li>\n\n        </ul>\n\n        <header class="channels-list-header focusable">\n          <span>Templates</span>\n        </header>\n\n        <ul class="channels-list-text">\n          <li class="channel focusable channel-text ">\n            <span class="channel-name">COMING SOON</span>\n          </li>\n        </ul>\n\n        <header class="channels-list-header focusable">\n          <span>Analytics</span>\n        </header>\n        <ul class="channels-list-text">\n          <li class="channel focusable channel-text ">\n            <span class="channel-name">COMING SOON</span>\n          </li>\n        </ul>\n      </section>\n\n\n\n      <footer class="channels-footer">\n        <img class="avatar" alt="Avatar" src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png" />\n        <div class="channels-footer-details">\n          <span class="username">\n            <a (click)="logout()" style="float:right">{{name}} {{ loginState }} </a>\n          </span>\n          <span class="tag">#0001</span>\n        </div>\n        <!-- <div class="channels-footer-controls button-group">\n              <button role="button" aria-label="Mute" class="button button-mute"><svg><use xlink:href="#icon-mute" /></svg></button>\n              <button role="button" aria-label="Deafen" class="button button-deafen"><svg><use xlink:href="#icon-deafen" /></svg></button>\n              <button role="button" aria-label="Settings" class="button button-settings"><svg><use xlink:href="#icon-settings" /></svg></button>\n            </div> -->\n      </footer>\n    </aside>\n\n    <div class="vert-container">\n      <menu type="toolbar" class="menu">\n        <h2 class="menu-name">document signing process </h2>\n        <span style="padding-left: 10px; font-size: small">2/5 steps completed</span>\n      </menu>\n\n      <section class="chat" style="width: auto;">\n\n\n\n        <ion-grid>\n          <ion-row>\n\n\n            <ion-col col-12>\n\n              <!-- <ion-badge style="float:right">\n                        <ion-icon name="notifications" item-start></ion-icon>\n                      </ion-badge> -->\n              <!-- <button ion-button (click)="login()" style="float:right"  >Login</button> -->\n\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <!-- <ion-fab left top menuToggle>\n                  <button ion-fab color="light" color="primary">\n                    <ion-icon name="menu"></ion-icon>\n                  </button>\n                </ion-fab> -->\n\n\n\n\n        <ion-grid>\n\n          <ion-row>\n            <ion-col width-100>\n              <br/>\n              <div class="steps-wrapper">\n                <br/>\n                <ul class="steps">\n                  <li class="step active">\n                    <div class="step-info">\n                      <span class="step-name">Upload</span>\n                    </div>\n                  </li>\n\n                  <li class="step completed">\n                    <div class="step-info">\n                      <span class="step-name">Annotate</span>\n                    </div>\n                  </li>\n                  <li class="step">\n                    <div class="step-info">\n                      <span class="step-name">Email</span>\n                    </div>\n                  </li>\n                  <li class="step">\n                    <div class="step-info">\n                      <span class="step-name">Sign</span>\n                    </div>\n                  </li>\n                  <li class="step">\n                    <div class="step-info">\n                      <span class="step-name">Review</span>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n\n              <br/>\n              <br/>\n            </ion-col>\n          </ion-row>\n\n          <ion-row>\n            <ion-col width-100>\n              <div class="centerMe">\n                <!-- Upload  -->\n                <form id="file-upload-form" class="uploader">\n                  <input id="file-upload" type="file" name="fileUpload" accept="*" />\n\n                  <label for="file-upload" id="file-drag">\n                    <img id="file-image" src="#" alt="Preview" class="hidden">\n                    <div id="start">\n                      <i class="fa fa-download" aria-hidden="true"></i>\n                      <div>Select a PDF</div>\n                      <div id="notimage" class="hidden">Please select an image</div>\n                      <span id="file-upload-btn" class="btn btn-primary">Select a file</span>\n                    </div>\n                    <div id="response" class="hidden">\n                      <div id="messages"></div>\n                      <progress class="progress" id="file-progress" value="0">\n                        <span>0</span>%\n                      </progress>\n                    </div>\n                  </label>\n                </form>\n\n\n\n                <!-- <label class="item item-input"> -->\n                <!-- <input type="file" id="files" name="file" (submit)="loadFile()" /> -->\n                <!-- </label> -->\n\n\n\n                <!-- <div class="preview-img">\n                                <img id="myImage" width="150" height="150" size="30" /> </div> -->\n\n\n                <!-- <span class="readBytesButtons">\n                                        <button data-startbyte="0" data-endbyte="4">1-5</button>\n                                        <button data-startbyte="5" data-endbyte="14">6-15</button>\n                                        <button data-startbyte="6" data-endbyte="7">7-8</button>\n                                        <button>entire file</button>\n                                      </span> -->\n                <!-- <div id="byte_range"></div>\n                                      <div id="byte_content"></div> -->\n\n                <button ion-button (click)="next()" style="margin-left: 50px; padding: 10px 10px 10px 10px; background: green; height: 45px;">\n                  Next &nbsp;\n                  <ion-icon name="arrow-forward"></ion-icon>\n                </button>\n                <!-- <button ion-button (click)="saveFile()">Save File</button>\n                            <button ion-button (click)="getFile()">Get File</button> -->\n\n\n              </div>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <div class="centerMe">\n                <br/>\n                <canvas id="the-canvas"></canvas>\n              </div>\n\n            </ion-col>\n          </ion-row>\n\n\n\n        </ion-grid>\n\n      </section>\n    </div>\n  </main>\n</ion-content>\n\n\n<!-- ICONS -->\n<svg id="icon-friends" viewBox="-289 382 32 27.1">\n  <style id="style3">\n    .st0 {\n      fill: #FFFFFF;\n    }\n\n    .st1 {\n      opacity: 0.6;\n    }\n  </style>\n  <g id="g4145" fill="#fff">\n    <path id="path5" d="M-273 409.1c-4.1 0-6.8-.6-7.9-1.7-.5-.6-.6-1.1-.6-1.3 0-.7.1-2.9.6-3.8.1-.3.5-1 4.5-2.4-1.6-1.4-2.6-4-2.6-7.1 0-4.2 2.3-7 5.9-7.1h.1c3.6.1 5.9 2.8 5.9 7.1 0 3.1-1 5.7-2.6 7.1 4 1.4 4.4 2.1 4.5 2.4.4.9.5 3.1.6 3.8 0 .2 0 .7-.6 1.3-1.1 1.1-3.7 1.7-7.8 1.7zm0-2c5.1 0 6.2-.9 6.4-1.1-.1-1.1-.2-2.3-.3-2.7-.6-.4-2.9-1.3-4.8-1.9l-.7-.2-.1-2 .7-.3c1.7-.6 2.8-3.1 2.8-6.1 0-3.1-1.5-5-3.9-5.1-2.5 0-4 2-4 5.1 0 3 1.1 5.5 2.8 6.1l.7.3-.1 2-.7.2c-1.9.6-4.2 1.5-4.8 1.9-.1.4-.3 1.6-.3 2.7.1.2 1.3 1.1 6.3 1.1z"\n      class="st0" />\n    <g id="g7" class="st1" opacity=".6">\n      <path id="path9" d="M-257 402.4c0-.7-.1-2.9-.6-3.8-.1-.3-.5-1-4.5-2.4 1.6-1.4 2.6-4 2.6-7.1 0-4.2-2.3-7-5.9-7.1h-.1c-1.9 0-3.5.8-4.5 2.2.6.3 1.2.6 1.8 1 .7-.8 1.6-1.3 2.8-1.3 2.4 0 3.9 2 3.9 5.1 0 3-1.1 5.5-2.8 6.1l-.7.3.1 2 .7.2c1.9.6 4.3 1.5 4.8 1.9.1.4.3 1.6.3 2.7-.2.2-1 .8-3.8 1 .1.6.2 1.2.2 2 2.5-.2 4.2-.8 5-1.6.7-.5.7-1 .7-1.2z"\n        class="st0" />\n      <path id="path11" d="M-287 402.3c.1-1.1.2-2.3.3-2.7.6-.4 2.9-1.3 4.8-1.9l.7-.2.1-2-.7-.3c-1.6-.6-2.8-3.1-2.8-6.1 0-3.1 1.5-5 4-5.1 1.2 0 2.1.5 2.8 1.3.5-.4 1.1-.8 1.8-1-1-1.4-2.6-2.2-4.5-2.2h-.1c-3.6 0-5.9 2.8-5.9 7.1 0 3.1 1 5.7 2.6 7.1-4 1.4-4.4 2.1-4.5 2.4-.4.9-.5 3.1-.6 3.8 0 .2 0 .7.6 1.3.8.9 2.5 1.4 5.1 1.6 0-.7.1-1.4.2-2-2.9-.3-3.7-.9-3.9-1.1z"\n        class="st0" />\n    </g>\n  </g>\n</svg>\n\n<svg id="icon-mute" viewBox="0 0 16 16">\n  <path fill="#5D6063" d="M12.5,8v1c0,2.2-1.8,4-4,4h-1c-2.2,0-4-1.8-4-4V8h-1v1 c0,2.8,2.2,5,5,5v1H7c-0.3,0-0.5,0.2-0.5,0.5C6.5,15.8,6.7,16,7,16h2c0.3,0,0.5-0.2,0.5-0.5C9.5,15.2,9.3,15,9,15H8.5v-1 c2.8,0,5-2.2,5-5V8H12.5z M8,12c1.9,0,3.5-1.6,3.5-3.5v-5C11.5,1.6,9.9,0,8,0C6.1,0,4.5,1.6,4.5,3.5v5C4.5,10.4,6.1,12,8,12z M5.5,3.5C5.5,2.1,6.6,1,8,1c1.4,0,2.5,1.1,2.5,2.5v5C10.5,9.9,9.4,11,8,11c-1.4,0-2.5-1.1-2.5-2.5V3.5z"\n  />\n</svg>\n\n<svg id="icon-deafen" viewBox="0 0 16 16">\n  <path fill="#5D6063" d="M15.9,9C16,8.7,16,8.3,16,8c0-4.4-3.6-8-8-8C3.6,0,0,3.6,0,8 c0,0.3,0,0.7,0.1,1h0C0,9.2,0,9.3,0,9.5v4C0,14.3,0.7,15,1.5,15h2C4.3,15,5,14.3,5,13.5v-4C5,8.7,4.3,8,3.5,8h-2 C1.3,8,1.2,8,1,8.1C1,8.1,1,8,1,8c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7c0,0,0,0.1,0,0.1C14.8,8,14.7,8,14.5,8h-2C11.7,8,11,8.7,11,9.5 v4c0,0.8,0.7,1.5,1.5,1.5h2c0.8,0,1.5-0.7,1.5-1.5v-4C16,9.3,16,9.2,15.9,9L15.9,9z M1.5,9h2C3.8,9,4,9.2,4,9.5v4 C4,13.8,3.8,14,3.5,14h-2C1.2,14,1,13.8,1,13.5v-4C1,9.2,1.2,9,1.5,9z M15,13.5c0,0.3-0.2,0.5-0.5,0.5h-2c-0.3,0-0.5-0.2-0.5-0.5 v-4C12,9.2,12.2,9,12.5,9h2C14.8,9,15,9.2,15,9.5V13.5z"\n  />\n</svg>\n\n<svg id="icon-settings" viewBox="0 0 16 16">\n  <path fill="#5D6063" d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"\n  />\n</svg>\n\n<svg id="icon-dropdown" viewBox="0 0 18 18">\n  <style>\n    .dd {\n      stroke: #ABADAF;\n      stroke-width: 2px;\n      stroke-dashoffset: 1;\n      stroke-dasharray: inherit\n    }\n  </style>\n  <path class="dd" stroke="#FFF" d="M4.5 4.5l9 9" stroke-linecap="round"></path>\n  <path class="dd" stroke="#FFF" d="M13.5 4.5l-9 9" stroke-linecap="round"></path>\n</svg>\n\n<svg id="icon-invite" viewBox="0 0 16 16">\n  <path fill="#fff" d="M6.3,3.4L8,1.7v9.8C8,11.8,8.2,12,8.5,12C8.8,12,9,11.8,9,11.5V1.7l1.7,1.7c0.2,0.2,0.5,0.2,0.7,0c0.2-0.2,0.2-0.5,0-0.7L8.9,0.2c0,0,0,0,0-0.1C8.8,0,8.6,0,8.5,0c0,0,0,0,0,0c0,0,0,0,0,0C8.4,0,8.2,0,8.1,0.1c0,0,0,0,0,0.1L5.6,2.7c-0.2,0.2-0.2,0.5,0,0.7C5.8,3.5,6.1,3.5,6.3,3.4z M14,4h-1.5v1h1C13.8,5,14,5.2,14,5.5v9c0,0.3-0.2,0.5-0.5,0.5h-10C3.2,15,3,14.8,3,14.5v-9C3,5.2,3.2,5,3.5,5h1V4H3C2.4,4,2,4.4,2,5v10c0,0.6,0.4,1,1,1h11c0.6,0,1-0.4,1-1V5C15,4.4,14.6,4,14,4z"\n  />\n</svg>\n\n<svg id="icon-channel-settings" viewBox="0 0 16 16">\n  <path fill="#fff" d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"\n  />\n</svg>'/*ion-inline-end:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__services_global_service__["a" /* GlobalService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCompareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var CryptoCompareService = (function () {
    function CryptoCompareService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.baseUrl = "https://www.cryptocompare.com/api/data";
        this.apiUrl = window.apiUrl; //http://localhost:5000 http://popbot2.azurewebsites.net
        this.currency = "BTC";
        this.aggregate = "1";
    }
    CryptoCompareService.prototype.getTopCoins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, coinRefResponse, coinsRef, topCoins;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.coinmarketcap.com/v1/ticker/?limit=377";
                        return [4 /*yield*/, this.http.get(url).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.http.get("https://min-api.cryptocompare.com/data/all/coinlist").toPromise()];
                    case 2:
                        coinRefResponse = _a.sent();
                        coinsRef = coinRefResponse.json().Data;
                        topCoins = {};
                        response.json().forEach(function (element) {
                            var coinData = coinsRef[element.symbol];
                            if (coinData) {
                                coinData.rank = element.rank;
                                topCoins[element.symbol] = coinData;
                            }
                            else {
                                console.error("Cannot find " + element.symbol);
                            }
                        });
                        return [2 /*return*/, topCoins];
                }
            });
        });
    };
    CryptoCompareService.prototype.getSocialStats = function (coinId, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var api, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!coinId)
                            coinId = 306304;
                        if (!limit)
                            limit = 337;
                        api = "/socialstatshistohour/?aggregate=1&id=" + coinId + "&limit=" + limit;
                        this.url = this.baseUrl + api;
                        return [4 /*yield*/, this.http.get(this.url).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CryptoCompareService.prototype.getCoins = function (coinLimit, histPriceLimit, socialLimit, currency, aggregate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currency = currency;
                        this.aggregate = aggregate;
                        if (!coinLimit)
                            coinLimit = 10;
                        if (!histPriceLimit)
                            histPriceLimit = 24;
                        if (!socialLimit)
                            socialLimit = 24;
                        return [4 /*yield*/, this.http.get(this.apiUrl + "/api/coins?coinLimit=" + coinLimit + "&histPriceLimit=" + histPriceLimit + "&socialLimit=" + socialLimit + "&currency=" + this.currency + "&aggregate=" + this.aggregate).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CryptoCompareService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Jsonp */]])
    ], CryptoCompareService);
    return CryptoCompareService;
}());

//# sourceMappingURL=cryptocompare.service.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbsoluteDragDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AbsoluteDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var AbsoluteDragDirective = (function () {
    function AbsoluteDragDirective(element, renderer, domCtrl) {
        this.element = element;
        this.renderer = renderer;
        this.domCtrl = domCtrl;
    }
    AbsoluteDragDirective.prototype.ngAfterViewInit = function () {
        this.dragOn();
        // this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        // this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        // this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
        // let hammer = new window['Hammer'](this.element.nativeElement);
        // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
        // hammer.on('pan', (ev) => {
        //   this.handlePan(ev);
        // });
    };
    AbsoluteDragDirective.prototype.handlePan = function (ev) {
        var _this = this;
        var newLeft = ev.center.x;
        var newTop = ev.center.y;
        this.domCtrl.write(function () {
            _this.renderer.setElementStyle(_this.element.nativeElement, 'left', newLeft + 'px');
            _this.renderer.setElementStyle(_this.element.nativeElement, 'top', newTop + 'px');
        });
    };
    AbsoluteDragDirective.prototype.dragOn = function () {
        try {
            this.svgDrawer = dragOn(document.querySelector(".dropzone"), {
                listenTo: '.draggable'
            });
        }
        catch (e) { }
        // target elements with the "resizable" class
        // interact('.resizable')
        //   .resizable({
        //     // preserveAspectRatio: true,
        //     edges: {
        //       left: true,
        //       right: true,
        //       bottom: true,
        //       top: true
        //     }
        //   })
        //   .on('resizemove', (event) => {
        //     svgDrawer.updateMetrics();
        //     var target = event.target,
        //       x = (parseFloat(target.getAttribute('data-x')) || 0),
        //       y = (parseFloat(target.getAttribute('data-y')) || 0);
        //     // update the element's style
        //     target.style.width = event.rect.width + 'px';
        //     target.style.height = event.rect.height + 'px';
        //     // translate when resizing from top or left edges
        //     x += event.deltaRect.left;
        //     y += event.deltaRect.top;
        //     target.style.webkitTransform = target.style.transform =
        //       'translate(' + x + 'px,' + y + 'px)';
        //     target.setAttribute('data-x', x);
        //     target.setAttribute('data-y', y);
        //   });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('startLeft'),
        __metadata("design:type", Object)
    ], AbsoluteDragDirective.prototype, "startLeft", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('startTop'),
        __metadata("design:type", Object)
    ], AbsoluteDragDirective.prototype, "startTop", void 0);
    AbsoluteDragDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[absolute-drag]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* DomController */]])
    ], AbsoluteDragDirective);
    return AbsoluteDragDirective;
}());

//# sourceMappingURL=absolute-drag.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalService = (function () {
    function GlobalService() {
        this.GaiUrl = "http://21312";
    }
    GlobalService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], GlobalService);
    return GlobalService;
}());

//# sourceMappingURL=global.service.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(395);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_charts__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_coin_service__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_global_service__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_cryptocompare_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_slack_service__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_absolute_drag_absolute_drag__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_14__directives_absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_9_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* JsonpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10__services_coin_service__["a" /* CoinService */],
                __WEBPACK_IMPORTED_MODULE_12__services_cryptocompare_service__["a" /* CryptoCompareService */],
                __WEBPACK_IMPORTED_MODULE_13__services_slack_service__["a" /* SlackService */],
                __WEBPACK_IMPORTED_MODULE_11__services_global_service__["a" /* GlobalService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: '1). Upload PDF', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: '2). Annotate PDF', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
        // global vars
        if (window.location.host.includes("localhost")) {
            window.apiUrl = "http://localhost:5000";
        }
        else {
            window.apiUrl = "";
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/app/app.html"*/'<ion-menu [content]="content" scroll="false" >\n  \n\n  <ion-content scroll="false">\n    <ion-list scroll="false">\n      <button scroll="false" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/Nick/Desktop/code/blockusign/BlockUSign.Ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 487:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 489:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 252,
	"./af.js": 252,
	"./ar": 253,
	"./ar-dz": 254,
	"./ar-dz.js": 254,
	"./ar-kw": 255,
	"./ar-kw.js": 255,
	"./ar-ly": 256,
	"./ar-ly.js": 256,
	"./ar-ma": 257,
	"./ar-ma.js": 257,
	"./ar-sa": 258,
	"./ar-sa.js": 258,
	"./ar-tn": 259,
	"./ar-tn.js": 259,
	"./ar.js": 253,
	"./az": 260,
	"./az.js": 260,
	"./be": 261,
	"./be.js": 261,
	"./bg": 262,
	"./bg.js": 262,
	"./bm": 263,
	"./bm.js": 263,
	"./bn": 264,
	"./bn.js": 264,
	"./bo": 265,
	"./bo.js": 265,
	"./br": 266,
	"./br.js": 266,
	"./bs": 267,
	"./bs.js": 267,
	"./ca": 268,
	"./ca.js": 268,
	"./cs": 269,
	"./cs.js": 269,
	"./cv": 270,
	"./cv.js": 270,
	"./cy": 271,
	"./cy.js": 271,
	"./da": 272,
	"./da.js": 272,
	"./de": 273,
	"./de-at": 274,
	"./de-at.js": 274,
	"./de-ch": 275,
	"./de-ch.js": 275,
	"./de.js": 273,
	"./dv": 276,
	"./dv.js": 276,
	"./el": 277,
	"./el.js": 277,
	"./en-au": 278,
	"./en-au.js": 278,
	"./en-ca": 279,
	"./en-ca.js": 279,
	"./en-gb": 280,
	"./en-gb.js": 280,
	"./en-ie": 281,
	"./en-ie.js": 281,
	"./en-nz": 282,
	"./en-nz.js": 282,
	"./eo": 283,
	"./eo.js": 283,
	"./es": 284,
	"./es-do": 285,
	"./es-do.js": 285,
	"./es-us": 286,
	"./es-us.js": 286,
	"./es.js": 284,
	"./et": 287,
	"./et.js": 287,
	"./eu": 288,
	"./eu.js": 288,
	"./fa": 289,
	"./fa.js": 289,
	"./fi": 290,
	"./fi.js": 290,
	"./fo": 291,
	"./fo.js": 291,
	"./fr": 292,
	"./fr-ca": 293,
	"./fr-ca.js": 293,
	"./fr-ch": 294,
	"./fr-ch.js": 294,
	"./fr.js": 292,
	"./fy": 295,
	"./fy.js": 295,
	"./gd": 296,
	"./gd.js": 296,
	"./gl": 297,
	"./gl.js": 297,
	"./gom-latn": 298,
	"./gom-latn.js": 298,
	"./gu": 299,
	"./gu.js": 299,
	"./he": 300,
	"./he.js": 300,
	"./hi": 301,
	"./hi.js": 301,
	"./hr": 302,
	"./hr.js": 302,
	"./hu": 303,
	"./hu.js": 303,
	"./hy-am": 304,
	"./hy-am.js": 304,
	"./id": 305,
	"./id.js": 305,
	"./is": 306,
	"./is.js": 306,
	"./it": 307,
	"./it.js": 307,
	"./ja": 308,
	"./ja.js": 308,
	"./jv": 309,
	"./jv.js": 309,
	"./ka": 310,
	"./ka.js": 310,
	"./kk": 311,
	"./kk.js": 311,
	"./km": 312,
	"./km.js": 312,
	"./kn": 313,
	"./kn.js": 313,
	"./ko": 314,
	"./ko.js": 314,
	"./ky": 315,
	"./ky.js": 315,
	"./lb": 316,
	"./lb.js": 316,
	"./lo": 317,
	"./lo.js": 317,
	"./lt": 318,
	"./lt.js": 318,
	"./lv": 319,
	"./lv.js": 319,
	"./me": 320,
	"./me.js": 320,
	"./mi": 321,
	"./mi.js": 321,
	"./mk": 322,
	"./mk.js": 322,
	"./ml": 323,
	"./ml.js": 323,
	"./mr": 324,
	"./mr.js": 324,
	"./ms": 325,
	"./ms-my": 326,
	"./ms-my.js": 326,
	"./ms.js": 325,
	"./mt": 327,
	"./mt.js": 327,
	"./my": 328,
	"./my.js": 328,
	"./nb": 329,
	"./nb.js": 329,
	"./ne": 330,
	"./ne.js": 330,
	"./nl": 331,
	"./nl-be": 332,
	"./nl-be.js": 332,
	"./nl.js": 331,
	"./nn": 333,
	"./nn.js": 333,
	"./pa-in": 334,
	"./pa-in.js": 334,
	"./pl": 335,
	"./pl.js": 335,
	"./pt": 336,
	"./pt-br": 337,
	"./pt-br.js": 337,
	"./pt.js": 336,
	"./ro": 338,
	"./ro.js": 338,
	"./ru": 339,
	"./ru.js": 339,
	"./sd": 340,
	"./sd.js": 340,
	"./se": 341,
	"./se.js": 341,
	"./si": 342,
	"./si.js": 342,
	"./sk": 343,
	"./sk.js": 343,
	"./sl": 344,
	"./sl.js": 344,
	"./sq": 345,
	"./sq.js": 345,
	"./sr": 346,
	"./sr-cyrl": 347,
	"./sr-cyrl.js": 347,
	"./sr.js": 346,
	"./ss": 348,
	"./ss.js": 348,
	"./sv": 349,
	"./sv.js": 349,
	"./sw": 350,
	"./sw.js": 350,
	"./ta": 351,
	"./ta.js": 351,
	"./te": 352,
	"./te.js": 352,
	"./tet": 353,
	"./tet.js": 353,
	"./th": 354,
	"./th.js": 354,
	"./tl-ph": 355,
	"./tl-ph.js": 355,
	"./tlh": 356,
	"./tlh.js": 356,
	"./tr": 357,
	"./tr.js": 357,
	"./tzl": 358,
	"./tzl.js": 358,
	"./tzm": 359,
	"./tzm-latn": 360,
	"./tzm-latn.js": 360,
	"./tzm.js": 359,
	"./uk": 361,
	"./uk.js": 361,
	"./ur": 362,
	"./ur.js": 362,
	"./uz": 363,
	"./uz-latn": 364,
	"./uz-latn.js": 364,
	"./uz.js": 363,
	"./vi": 365,
	"./vi.js": 365,
	"./x-pseudo": 366,
	"./x-pseudo.js": 366,
	"./yo": 367,
	"./yo.js": 367,
	"./zh-cn": 368,
	"./zh-cn.js": 368,
	"./zh-hk": 369,
	"./zh-hk.js": 369,
	"./zh-tw": 370,
	"./zh-tw.js": 370
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 549;

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoinService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var CoinService = (function () {
    function CoinService(http) {
        this.http = http;
        this.baseUrl = "https://min-api.cryptocompare.com/data/histohour?fsym=";
        this.coin = "IOT";
        this.symbol = "IOT";
        this.params = "&tsym=USD&limit=60&aggregate=3&e=CCCAGG";
        this.url = "";
    }
    CoinService.prototype.getCoin = function (coin) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.coin = coin;
                        this.url = this.baseUrl + this.coin + this.params;
                        return [4 /*yield*/, this.http.get(this.url).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CoinService.prototype.getAllCoins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get("https://min-api.cryptocompare.com/data/all/coinlist").toPromise()];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    CoinService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], CoinService);
    return CoinService;
}());

//# sourceMappingURL=coin.service.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SlackService = (function () {
    function SlackService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        this.baseUrl = window.apiUrl + "/api/slack"; //"https://hooks.slack.com/services/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";
    }
    SlackService.prototype.sendAlert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/" + msg).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlackService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Jsonp */]])
    ], SlackService);
    return SlackService;
}());

//# sourceMappingURL=slack.service.js.map

/***/ })

},[371]);
//# sourceMappingURL=main.js.map