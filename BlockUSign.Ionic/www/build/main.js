webpackJsonp([1],{

/***/ 197:
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
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/annotate/annotate.module": [
		243
	],
	"../pages/email/email.module": [
		393
	],
	"../pages/home/home.module": [
		484
	],
	"../pages/review/review.module": [
		482
	],
	"../pages/sign/sign.module": [
		483
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 242;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotatePageModule", function() { return AnnotatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__annotate__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';

var AnnotatePageModule = (function () {
    function AnnotatePageModule() {
    }
    AnnotatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__annotate__["a" /* AnnotatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__annotate__["a" /* AnnotatePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* BlockStepsComponentModule */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_1__annotate__["a" /* AnnotatePage */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_2__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AnnotatePageModule);
    return AnnotatePageModule;
}());

//# sourceMappingURL=annotate.module.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnotatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_block_chat_block_chat__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/// https://www.sitepoint.com/custom-pdf-rendering/
var AnnotatePage = (function () {
    function AnnotatePage(navCtrl, navParams, documentService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.documentService = documentService;
        this.events = events;
    }
    AnnotatePage.prototype.ionViewWillLeave = function () {
        this.blockChat.ngOnDestroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("blockChat"),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__components_block_chat_block_chat__["a" /* BlockChatComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__components_block_chat_block_chat__["a" /* BlockChatComponent */]) === "function" && _a || Object)
    ], AnnotatePage.prototype, "blockChat", void 0);
    AnnotatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-annotate',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\annotate\annotate.html"*/'<ion-content class="no-overflow-page">\n\n \n\n  <!-- <ion-grid>\n\n    <ion-row>\n\n      <ion-col>\n\n        <block-steps activeStep="2">\n\n        </block-steps>\n\n        <br/>\n\n        <br/>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid> -->\n\n\n\n  <block-steps activeStep="2">\n\n  </block-steps> \n\n        \n\n\n\n  <block-pdf showToolBar="true" showSignHere="true" showButtons="true">\n\n\n\n  </block-pdf>\n\n\n\n  <block-chat #blockChat>\n\n    \n\n  </block-chat>\n\n\n\n</ion-content>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\annotate\annotate.html"*/,
            styles: ['annotate.scss']
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object])
    ], AnnotatePage);
    return AnnotatePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=annotate.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Document; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Message; });
/* unused harmony export Annotation */
/* unused harmony export DocStorageMaps */
/* unused harmony export AnnotationTypes */
/* unused harmony export NameStorageMapping */
var Document = (function () {
    function Document() {
        this.guid = window.guid();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.hasAnnotations = false;
        this.step = "Annotate";
        this.isCompleted = false;
    }
    return Document;
}());

var Log = (function () {
    function Log() {
        this.guid = window.guid();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    return Log;
}());

var Message = (function () {
    function Message() {
        this.guid = window.guid();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    return Message;
}());

// This is an svg representing the annotations
var Annotation = (function () {
    function Annotation() {
    }
    return Annotation;
}());

var DocStorageMaps = (function () {
    function DocStorageMaps() {
    }
    return DocStorageMaps;
}());

// An array of annotation types, so far just signatures, maybe down the line support Number. OpenText etc...
var AnnotationTypes = (function () {
    function AnnotationTypes() {
        return ["Sign"];
    }
    return AnnotationTypes;
}());

var NameStorageMapping = (function () {
    function NameStorageMapping() {
    }
    return NameStorageMapping;
}());

// // Index of documents for searching
// // blockusign/documents.index.json
// [
//     {
//         "guid": "guid",
//         "fileName": "blockusign/nicktee.id/one.pdf", 
//         "createdAt": "", 
//         "updatedAt": "", 
//         "owner": ["nicktee.id", ""], 
//         "signer": ["nicktee.id"], 
//         "hasAnnotations": true,
//         "step": 5,
//         "isCompleted": true
//     },
//     {
//         "guid": "guid",
//         "fileName": "blockusign/nicktee.id/two.pdf", 
//         "createdAt": "", 
//         "updatedAt": "", 
//         "owner": ["nicktee.id", ""], 
//         "signer": ["nicktee.id"], 
//         "hasAnnotations": true,
//         "step": 1,
//         "isCompleted": false
//     }
// ]
// // documents
// // blockusign/guid.pdf
// // documents metadata and annotations
// // blockusign/guid.json
// {
//     annotations: "<img></img><img></img>"
// }
//# sourceMappingURL=models.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockPdfComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retry__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfjs_dist_build_pdf__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pdfjs_dist_build_pdf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pdfjs_dist_build_pdf__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pdf_annotate__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_pdf_annotate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_pdf_annotate__);
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









/**
 * Generated class for the BlockPdfComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var BlockPdfComponent = (function () {
    function BlockPdfComponent(navCtrl, navParams, documentService, changeDetector, viewContainerRef, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.documentService = documentService;
        this.changeDetector = changeDetector;
        this.viewContainerRef = viewContainerRef;
        this.loadingCtrl = loadingCtrl;
        this.showToolBar = 0;
        this.marginTop = '130px';
        this.DOCUMENT_ID = "blockusign/pdf1.txt"; // @TODO not being used, delete in furture
        this.UI = __WEBPACK_IMPORTED_MODULE_8_pdf_annotate___default.a;
        this.containerId = "pageContainer1";
        this.canvasId = "canvas1";
        this.selectedElement = null;
        this.prevElement = null;
        this.currentX = 0;
        this.currentY = 0;
        this.allowResize = false;
        console.log('====> constructor');
    }
    BlockPdfComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('====> ngOnInit');
        $(document).ready(function () {
            _this.loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            _this.loading.present();
            _this.init();
        });
    };
    BlockPdfComponent.prototype.ngOnDestroy = function () {
        console.log("====> ngOnDestroy");
    };
    BlockPdfComponent.prototype.init = function () {
        //$(".dropzone").off();
        //let pdfData = this.loadPDFData(); // loads pdf data from localStorage, make sure you uploaded it from home.js
        var _this = this;
        this.svgDrawer = dragOn(document.querySelector(".dropzone"), {
            listenTo: '.draggable'
        });
        var docData = getQueryParam('docData');
        if (docData) {
            this.loading.dismiss();
            return;
        }
        if (this.navParams.get("guid") && !this.documentService.currentDoc) {
            var guid_1 = this.navParams.get("guid");
            this.documentService.getDocumentsIndex(true).then(function (data) {
                _this.documentService.documentsList = data;
                _this.documentService.setCurrentDoc(guid_1);
                _this.getFile();
                // @todo in side menu highlight selected doc
            });
        }
        else if (this.documentService.currentDoc.guid) {
            this.documentService.setCurrentDoc(this.documentService.currentDoc.guid);
            this.getFile();
        }
        else {
            var guid = this.navParams.get("guid");
            this.documentService.setCurrentDoc(guid);
            this.getFile();
        }
        this.yourName = blockstack.loadUserData().profile.name;
    };
    BlockPdfComponent.prototype.getFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, pdfData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.documentService.getDocument(this.documentService.currentDoc.guid + ".pdf", this.documentService.currentDoc.documentKey)];
                    case 1:
                        data = _a.sent();
                        this.pdfBuffer = data;
                        pdfData = new Uint8Array(this.pdfBuffer);
                        this.loadPdf(pdfData); // loads the pdf to the screen with the text layers
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockPdfComponent.prototype.back = function () {
        //this.navCtrl.push(ListPage);
        //this.navCtrl.push("HomePage");
        //this.navCtrl.setRoot(HomePage);
        this.navCtrl.push("HomePage");
    };
    BlockPdfComponent.prototype.next = function () {
        this.navCtrl.push("EmailPage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    BlockPdfComponent.prototype.clear = function () {
        this.svgDrawer.cleanHTML();
        this.svgDrawer.cleanDrawArea();
        this.svgDrawer.updateMetrics();
        localStorage.removeItem('svg');
    };
    BlockPdfComponent.prototype.loadPdf = function (pdfData) {
        var _this = this;
        var loadingTask = __WEBPACK_IMPORTED_MODULE_7_pdfjs_dist_build_pdf___default.a.getDocument({ data: pdfData });
        loadingTask.promise.then(function (pdf) {
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');
                var scale = 1;
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
                    // load svg
                    _this.loadSvg(page);
                    _this.loading.dismiss();
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    };
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
    BlockPdfComponent.prototype.handleClearClick = function (e) {
        if (confirm('Are you sure you want to throw your work away?')) {
            //localStorage.removeItem(`${this.DOCUMENT_ID}/annotations`);
            this.page1.innerHTML = '';
        }
    };
    // setupToolBar() {
    //   this.tooltype = localStorage.getItem(`${this.DOCUMENT_ID}/tooltype`) || 'area';
    //   if (this.tooltype) {
    //     this.setActiveToolbarItem(this.tooltype, document.querySelector(`.toolbar button[data-tooltype=${this.tooltype}]`));
    //   }
    // }
    BlockPdfComponent.prototype.handleDragStart = function (e) {
        //log("handleDragStart");
        e.style.opacity = '0.4'; // this ==> e.target is the source node.
    };
    ;
    // set the overlay dimensionss
    BlockPdfComponent.prototype.overLay = function (page) {
        var dimensions = page.pageInfo.view[0] + " " + page.pageInfo.view[1] + " " + page.pageInfo.view[2] + " " + page.pageInfo.view[3];
        $("#svg-dropzone").css("width", "612");
        $("#svg-dropzone").css("height", "792");
        $("#svg-dropzone").attr("width", "612");
        $("#svg-dropzone").attr("height", "792");
        $("#svg-dropzone").attr("viewBox", dimensions);
    };
    BlockPdfComponent.prototype.saveSvg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var svg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svg = "";
                        $(".dragOn-drawArea").each(function () {
                            var el = $(this);
                            if (el.html() !== "") {
                                svg = svg + el.html();
                            }
                        });
                        //if (svg){
                        //localStorage.setItem("svg", svg);
                        return [4 /*yield*/, this.documentService.saveAnnotations(this.documentService.currentDoc.guid, svg)];
                    case 1:
                        //if (svg){
                        //localStorage.setItem("svg", svg);
                        _a.sent();
                        return [4 /*yield*/, this.documentService.addMessage(this.documentService.currentDoc.guid, 'Updated annotation')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockPdfComponent.prototype.loadSvg = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var json, innerHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //let innerHtml = localStorage.getItem("svg");
                        // overlay
                        this.overLay(page);
                        return [4 /*yield*/, this.documentService.getAnnotations(this.documentService.currentDoc.guid)];
                    case 1:
                        json = _a.sent();
                        innerHtml = null;
                        if (json) {
                            innerHtml = json.annotations;
                        }
                        if (innerHtml) {
                            this.svgDrawer.addHTML(innerHtml);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], BlockPdfComponent.prototype, "showToolBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], BlockPdfComponent.prototype, "showSignature", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], BlockPdfComponent.prototype, "showSignHere", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], BlockPdfComponent.prototype, "showButtons", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], BlockPdfComponent.prototype, "marginTop", void 0);
    BlockPdfComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'block-pdf',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-pdf\block-pdf.html"*/'<ion-content class="block-pdf-page" >\n\n  \n\n\n\n  <div class="page" id="pageContainer1" \n\n    data-page-number="1" \n\n    style="position:relative;width: 100%; height:100%;overflow-x:auto;overflow-y:auto"\n\n    [style.margin-top]="marginTop">\n\n\n\n    <div id="canvasWrapper" style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;">\n\n      <canvas id="canvas1" style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px"></canvas>\n\n    </div>\n\n    <svg id="svg-dropzone" class="dropzone resizable" xmlns="http://www.w3.org/2000/svg" style="position: absolute; \n\n                  left: 0px; \n\n                  top:0px;\n\n                  z-index: 200000;\n\n                  padding: 0px 0px 0px 0px; \n\n                  margin: 0px 0px 0px 0px;">\n\n\n\n    </svg>\n\n    <div class="textLayer"></div>\n\n  </div>\n\n\n\n  <svg class="annotationLayer" xmlns="http://www.w3.org/2000/svg">\n\n  </svg>\n\n\n\n  <img   *ngIf="!showToolBar"  id="sigImg" height="50px" class="draggable draggable-droppable"  src="./../../assets/imgs/sign.png"\n\n        />\n\n\n\n\n\n<ion-fab *ngIf="showToolBar" top left style="margin-top:1px;background-color:#36393E; opacity: .95;border-radius: 10px" #fab>\n\n  <ion-grid>\n\n    <ion-row justify-content-start align-items-center>\n\n      <ion-col col-auto *ngIf="showSignHere">\n\n        <img id="sigImg" height="50px" class="draggable draggable-droppable"  src="./../../assets/imgs/sign.png"\n\n        />\n\n      </ion-col>\n\n      <ion-col col-auto *ngIf="showSignature">\n\n        <svg xmlns="http://www.w3.org/2000/svg" id="signature" class="draggable draggable-droppable" \n\n          width="200" height="50" viewBox="0 0 200 50" style="clear:both; background:#ffeb8e; border: 1px solid red " opacity="1">\n\n\n\n          <text x="50%" y="50%" width="200" height="50" viewBox="0 0 200 50" alignment-baseline="middle" text-anchor="middle" fill="green"\n\n            font-family="Cedarville Cursive" font-weight="bold" style="font-size: 25px">\n\n            {{ yourName }}\n\n          </text>\n\n\n\n        </svg>\n\n      </ion-col>\n\n      <ion-col col-auto *ngIf="showButtons">\n\n        <img src="./../../assets/imgs/arrows.svg" height="35px">\n\n        <span style="color:#757575; font-family: Cedarville Cursive; font-size: 18px; font-weight: bold">drag</span>\n\n      </ion-col>\n\n      <!-- <ion-col col-auto style="padding-left: 50px;">\n\n        <input id="checkBox" type="checkbox">\n\n        <span style="padding-right: 4px;color:#757575;">Allow Resize</span>\n\n      </ion-col> -->\n\n      <ion-col col-auto style="padding-left: 20px;" *ngIf="showButtons">\n\n        <button ion-fab (click)="saveSvg()" style="position:relative">Save</button>\n\n      </ion-col>\n\n      <ion-col col-auto style="padding-left: 5px;" *ngIf="showButtons">\n\n        <button ion-fab (click)="clear()"  style="position:relative">Clear</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-fab>\n\n</ion-content>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-pdf\block-pdf.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], BlockPdfComponent);
    return BlockPdfComponent;
}());

//# sourceMappingURL=block-pdf.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__absolute_drag_absolute_drag__ = __webpack_require__(623);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__absolute_drag_absolute_drag__["a" /* AbsoluteDragDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_models__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__blockstack_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_state__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_observable_of__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_observable_of__);
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











/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DocumentService = (function () {
    //public automerge = Automerge;
    function DocumentService(events, http, blockStackService) {
        var _this = this;
        this.events = events;
        this.http = http;
        this.blockStackService = blockStackService;
        this.indexFileName = "blockusign/documents.index.json";
        this.urlBlockusignGlobalStore = "https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign";
        this.urlBlockusign = "https://blockusign.co"; //"https://blockusign.co"; // "http://localhost:52657";
        this.state = new __WEBPACK_IMPORTED_MODULE_9__models_state__["a" /* State */]();
        console.log('Hello StorageServiceProvider Provider');
        this.documentsList = [];
        // @TODO - think about putting in checks here is documentsList is empty, 
        // or there could be a async race issue if they take too long to come back
        this.getDocumentsIndex(true).then(function (data) {
            _this.documentsList = data;
        });
    }
    DocumentService.prototype.getDocumentsIndex = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!refresh) return [3 /*break*/, 3];
                        return [4 /*yield*/, blockstack.getFile(this.indexFileName, { decrypt: true })];
                    case 1:
                        resp = _d.sent();
                        if (resp) {
                            this.documentsList = JSON.parse(resp);
                        }
                        if (!(this.documentsList == null || !resp)) return [3 /*break*/, 3];
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, blockstack.putFile(this.indexFileName, "[]", { encrypt: true })];
                    case 2:
                        _a.documentsList = _c.apply(_b, [_d.sent()]);
                        _d.label = 3;
                    case 3: return [2 /*return*/, this.documentsList];
                }
            });
        });
    };
    DocumentService.prototype.addDocument = function (fileName, fileBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var newDocument, profileData, myEmail, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newDocument = new __WEBPACK_IMPORTED_MODULE_1__models_models__["a" /* Document */]();
                        newDocument.fileName = fileName;
                        newDocument.documentKey = this.generateKey();
                        newDocument.code = this.generateKey();
                        // write to /api/Code?docGuid=12345&code=12345
                        return [4 /*yield*/, this.writeCode(newDocument.guid, newDocument.code)];
                    case 1:
                        // write to /api/Code?docGuid=12345&code=12345
                        _c.sent();
                        // add my storage path - write to /api/DocStorageMap?docGuid=12345&code=12345&storagePath=urlEncode(pathToStorage)
                        return [4 /*yield*/, this.addDocStoragePath(newDocument.guid, newDocument.code, blockstack.loadUserData().profile.apps[window.location.origin])];
                    case 2:
                        // add my storage path - write to /api/DocStorageMap?docGuid=12345&code=12345&storagePath=urlEncode(pathToStorage)
                        _c.sent();
                        newDocument.pathAnnotatedDoc = blockstack.loadUserData().profile.apps[window.location.origin];
                        return [4 /*yield*/, this.blockStackService.getProfileData()];
                    case 3:
                        profileData = _c.sent();
                        myEmail = null;
                        if (profileData) {
                            myEmail = JSON.parse(profileData).email;
                        }
                        _a = newDocument;
                        _b = {
                            name: blockstack.loadUserData().profile.name,
                            userId: blockstack.loadUserData().username,
                            email: myEmail
                        };
                        return [4 /*yield*/, this.blockStackService.getAppPublicKey()];
                    case 4:
                        _a.paths = [(_b.appPublicKey = _c.sent(),
                                _b.pathToStorage = blockstack.loadUserData().profile.apps[window.location.origin],
                                _b)];
                        newDocument.signer = [];
                        this.documentsList.push(newDocument);
                        return [4 /*yield*/, blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true })];
                    case 5:
                        _c.sent();
                        this.docBuffer = fileBuffer;
                        this.currentDoc = newDocument;
                        return [4 /*yield*/, this.addDocumentBytes(newDocument.guid, fileBuffer, newDocument.documentKey)];
                    case 6:
                        response = _c.sent();
                        return [2 /*return*/, this.documentsList];
                }
            });
        });
    };
    DocumentService.prototype.updateDocument = function (documentGuid, doc) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.documentsList.findIndex(function (i) { return i.guid === documentGuid; });
                        if (!(index !== -1)) return [3 /*break*/, 2];
                        this.documentsList[index] = doc;
                        // write document index
                        return [4 /*yield*/, blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true })];
                    case 1:
                        // write document index
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    DocumentService.prototype.removeDocument = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // remove item
                        this.documentsList = this.documentsList.remove(document);
                        return [4 /*yield*/, blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.removeDocumentBytes(document.guid)];
                    case 2:
                        _a.sent();
                        // remove binary file
                        return [2 /*return*/, this.documentsList];
                }
            });
        });
    };
    DocumentService.prototype.addDocumentBytes = function (guid, doc, documentKey) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encryptedDoc = this.ecryptDoc(doc, documentKey);
                        // add blank annotations file
                        return [4 /*yield*/, this.createAnnotations(guid)];
                    case 1:
                        // add blank annotations file
                        _a.sent();
                        // add blank log file
                        return [4 /*yield*/, this.getLog(guid)];
                    case 2:
                        // add blank log file
                        _a.sent();
                        return [2 /*return*/, blockstack.putFile(guid + ".pdf", encryptedDoc, { encrypt: false }).then(function (data) { })];
                }
            });
        });
    };
    DocumentService.prototype.getDocument = function (fileName, documentKey) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, encryptedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockstack.getFile(fileName, { decrypt: false })];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            encryptedDoc = resp;
                            return [2 /*return*/, this.decryptDoc(encryptedDoc, documentKey)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentService.prototype.getDocumentByPath = function (docPath, docKey) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, encryptedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(docPath).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            encryptedDoc = resp.text();
                            return [2 /*return*/, this.decryptDoc(encryptedDoc, docKey)];
                        }
                        else {
                            return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_observable_of__["of"])(null)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentService.prototype.copyDocument = function (newDocument, guid, fileBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var myName, myUserId, profileData, myEmail, _a, _b, _c, encryptedDoc, r, annotsResp, theirPath, theirUrl, theirLogDoc, logStr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("file buffer", fileBuffer);
                        console.log("guid", guid);
                        console.log("doc", newDocument);
                        myName = null;
                        if (blockstack.loadUserData().profile.name) {
                            myName = blockstack.loadUserData().profile.name;
                        }
                        myUserId = null;
                        if (blockstack.loadUserData().username) {
                            myUserId = blockstack.loadUserData().username;
                        }
                        return [4 /*yield*/, this.blockStackService.getProfileData()];
                    case 1:
                        profileData = _d.sent();
                        myEmail = null;
                        if (profileData) {
                            myEmail = JSON.parse(profileData).email;
                        }
                        _b = (_a = newDocument.paths).push;
                        _c = {
                            name: myName,
                            userId: myUserId,
                            email: myEmail
                        };
                        return [4 /*yield*/, this.blockStackService.getAppPublicKey()];
                    case 2:
                        _b.apply(_a, [(_c.appPublicKey = _d.sent(),
                                _c.pathToStorage = blockstack.loadUserData().profile.apps[window.location.origin],
                                _c)]);
                        this.documentsList.push(newDocument);
                        console.log("new doc list", this.documentsList);
                        return [4 /*yield*/, blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true })];
                    case 3:
                        _d.sent();
                        this.currentDoc = newDocument;
                        //let response = await this.addDocumentBytes(guid, fileBuffer, newDocument.documentKey);
                        this.docBuffer = fileBuffer;
                        encryptedDoc = this.ecryptDoc(fileBuffer, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(guid + ".pdf", encryptedDoc, { encrypt: false }).then(function (data) { })];
                    case 4:
                        r = _d.sent();
                        // add my storage path - write to /api/DocStorageMap?docGuid=12345&code=12345&storagePath=urlEncode(pathToStorage)
                        return [4 /*yield*/, this.addDocStoragePath(newDocument.guid, newDocument.code, blockstack.loadUserData().profile.apps[window.location.origin])];
                    case 5:
                        // add my storage path - write to /api/DocStorageMap?docGuid=12345&code=12345&storagePath=urlEncode(pathToStorage)
                        _d.sent();
                        return [4 /*yield*/, this.getAnnotationsByPath(this.currentDoc.pathAnnotatedDoc + guid + ".annotations.json", this.currentDoc.documentKey)];
                    case 6:
                        annotsResp = _d.sent();
                        if (annotsResp) {
                            this.saveAnnotations(guid, this.currentDocAnnotations.annotations);
                        }
                        else {
                            this.saveAnnotations(guid, "");
                        }
                        theirPath = jslinq(this.currentDoc.paths).where(function (el) { return el.email != _this.blockStackService.profile.email; }).toList();
                        theirUrl = theirPath[0].pathToStorage + guid + '.log.json';
                        return [4 /*yield*/, this.getLogByPath(theirUrl, this.currentDoc.documentKey)];
                    case 7:
                        theirLogDoc = _d.sent();
                        if (!theirLogDoc) return [3 /*break*/, 9];
                        logStr = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["save"](theirLogDoc);
                        return [4 /*yield*/, this.saveLog(guid, logStr)];
                    case 8:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, this.documentsList];
                }
            });
        });
    };
    DocumentService.prototype.documentExists = function (guid) {
        var exists = false;
        var docs = jslinq(this.documentsList).where(function (el) { return el.guid == guid; }).toList();
        if (docs.length > 0) {
            exists = true;
        }
        return exists;
    };
    DocumentService.prototype.addSignerToCurrentDoc = function (nameOrId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DocumentService.prototype.removeDocumentBytes = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockstack.putFile(guid + ".annotations.json", "", { encrypt: false })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, blockstack.putFile(guid + ".log.json", "", { encrypt: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, blockstack.putFile(guid + ".pdf", "", { encrypt: false }).then(function (data) { })];
                }
            });
        });
    };
    DocumentService.prototype.createAnnotations = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            var json, commit, saveAnnotStr, encrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            annotations: ""
                        };
                        this.currentDocAnnotationsDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["init"]();
                        commit = blockstack.loadUserData().profile.name + " created annotations on " + this.getDate();
                        this.currentDocAnnotationsDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["change"](this.currentDocAnnotationsDoc, commit, function (doc) {
                            doc.annots = [];
                        });
                        saveAnnotStr = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["save"](this.currentDocAnnotationsDoc);
                        encrypted = this.encryptString(saveAnnotStr, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(guid + ".annotations.json", encrypted, { encrypt: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentService.prototype.saveAnnotations = function (guid, annotation) {
        return __awaiter(this, void 0, void 0, function () {
            var json, commit, saveAnnotStr, encrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            annotations: annotation
                        };
                        commit = blockstack.loadUserData().profile.name + " added annotation on " + this.getDate();
                        this.currentDocAnnotationsDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["change"](this.currentDocAnnotationsDoc, commit, function (doc) {
                            doc.annots.insertAt(0, json);
                        });
                        saveAnnotStr = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["save"](this.currentDocAnnotationsDoc);
                        encrypted = this.encryptString(saveAnnotStr, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(guid + ".annotations.json", encrypted, { encrypt: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentService.prototype.getAnnotations = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            var annoatationsFileName, resp, decrypted, theirPath, theirUrl, url, theirResp, str, theirDoc, finalDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        annoatationsFileName = guid + ".annotations.json";
                        return [4 /*yield*/, blockstack.getFile(annoatationsFileName, { decrypt: false })];
                    case 1:
                        resp = _a.sent();
                        if (!resp) return [3 /*break*/, 4];
                        decrypted = this.decryptString(resp, this.currentDoc.documentKey);
                        this.currentDocAnnotationsDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](decrypted);
                        this.currentDocAnnotations = this.currentDocAnnotationsDoc.annots[0]; //JSON.parse(decrypted);
                        theirPath = jslinq(this.docStorageMaps.storagePaths).where(function (el) { return el != blockstack.loadUserData().profile.apps[window.location.origin]; }).toList();
                        theirUrl = theirPath[0];
                        if (!theirUrl) return [3 /*break*/, 3];
                        url = theirUrl + annoatationsFileName;
                        return [4 /*yield*/, this.http.get(url).toPromise()];
                    case 2:
                        theirResp = _a.sent();
                        // now merge their doc into mine
                        if (theirResp) {
                            str = theirResp.text();
                            str = this.decryptString(str, this.currentDoc.documentKey);
                            theirDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](str);
                            finalDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["merge"](theirDoc, this.currentDocAnnotationsDoc);
                            this.currentDocAnnotationsDoc = finalDoc;
                        }
                        _a.label = 3;
                    case 3:
                        this.currentDocAnnotations = this.currentDocAnnotationsDoc.annots[0];
                        _a.label = 4;
                    case 4:
                        if (!resp) {
                            this.currentDocAnnotations = "";
                        }
                        return [2 /*return*/, this.currentDocAnnotations];
                }
            });
        });
    };
    DocumentService.prototype.getAnnotationsByPath = function (docPath, docKey) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, encryptedDocStr, annotations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(docPath).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            encryptedDocStr = JSON.stringify(resp.json());
                            annotations = this.decryptString(encryptedDocStr, docKey);
                            this.currentDocAnnotationsDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](annotations);
                            this.currentDocAnnotations = this.currentDocAnnotationsDoc.annots[0];
                            //this.currentDocAnnotations = JSON.parse(annotations);
                        }
                        if (!resp) {
                            this.currentDocAnnotations = "";
                        }
                        return [2 /*return*/, this.currentDocAnnotations];
                }
            });
        });
    };
    // async mergeAnnotations(guid, theirs?, mine?){
    //   if (!theirs){
    //     theirs = await this.getAnnotationsByPath(this.currentDoc.pathAnnotatedDoc + guid + ".annotations.json", this.currentDoc.documentKey);
    //     theirs = this.currentDocAnnotationsDoc;
    //   }
    //   if (!mine){
    //     mine =  await this.getAnnotations(guid);
    //     mine = this.currentDocAnnotationsDoc;
    //   }
    //   let mergedAnnotations = Automerge.merge(mine, theirs);
    //   console.log("mergedAnnots", mergedAnnotations);
    // }
    DocumentService.prototype.setCurrentDoc = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            var span;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //alert('set curr doc');
                        this.currentDoc = this.documentsList.find(function (x) { return x.guid == guid; });
                        return [4 /*yield*/, this.getDocStorageMaps(this.currentDoc.guid)];
                    case 1:
                        _a.sent();
                        this.events.publish('documentService:setCurrentDoc', this.currentDoc);
                        span = "span:contains('" + this.currentDoc.fileName + "')";
                        $(document).ready(function () {
                            $(".channels-list-text li").removeClass('active');
                            var s = $(span);
                            s.parent().addClass('active');
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //#region Log (Chat)
    DocumentService.prototype.getLog = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            var logFileName, resp, theirPath, theirUrl, url, theirResp, str, theirDoc, finalDoc, newLog_1, msg, logStr, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logFileName = guid + '.log.json';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, blockstack.getFile(logFileName, { decrypt: false })];
                    case 2:
                        resp = _a.sent();
                        if (!resp) return [3 /*break*/, 5];
                        this.logDoc = this.decryptString(resp, this.currentDoc.documentKey);
                        this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](this.logDoc);
                        this.log = this.logDoc.log;
                        theirPath = jslinq(this.docStorageMaps.storagePaths).where(function (el) { return el != blockstack.loadUserData().profile.apps[window.location.origin]; }).toList();
                        theirUrl = theirPath[0];
                        if (!theirUrl) return [3 /*break*/, 4];
                        url = theirUrl + logFileName;
                        return [4 /*yield*/, this.http.get(url).toPromise()];
                    case 3:
                        theirResp = _a.sent();
                        // now merge their doc into mine
                        if (theirResp) {
                            str = theirResp.text();
                            str = this.decryptString(str, this.currentDoc.documentKey);
                            theirDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](str);
                            finalDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["merge"](theirDoc, this.logDoc);
                            this.logDoc = finalDoc;
                        }
                        _a.label = 4;
                    case 4:
                        this.log = this.logDoc.log;
                        return [3 /*break*/, 7];
                    case 5:
                        newLog_1 = new __WEBPACK_IMPORTED_MODULE_1__models_models__["b" /* Log */]();
                        newLog_1.messages = [];
                        msg = new __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */]();
                        msg.createdBy = blockstack.loadUserData().username;
                        msg.createdByName = blockstack.loadUserData().profile.name;
                        msg.email = this.blockStackService.profile.email;
                        msg.message = "Created Doc";
                        newLog_1.messages.push(msg);
                        this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["init"]();
                        this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["change"](this.logDoc, 'Initialize log - ' + this.getDate(), function (doc) {
                            doc.log = newLog_1;
                        });
                        logStr = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["save"](this.logDoc);
                        logStr = this.encryptString(logStr, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(logFileName, logStr, { encrypt: false })];
                    case 6:
                        logStr = _a.sent();
                        logStr = this.decryptString(logStr, this.currentDoc.documentKey);
                        console.log('logstr', logStr);
                        this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](logStr);
                        this.log = this.logDoc.log;
                        _a.label = 7;
                    case 7: return [2 /*return*/, this.log];
                    case 8:
                        e_1 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DocumentService.prototype.saveLog = function (guid, logStr) {
        return __awaiter(this, void 0, void 0, function () {
            var logFileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logFileName = guid + '.log.json';
                        logStr = this.encryptString(logStr, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(logFileName, logStr, { encrypt: false })];
                    case 1:
                        logStr = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentService.prototype.getLogByPath = function (docPath, docKey) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, encryptedDocStr, chatLog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(docPath).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            encryptedDocStr = JSON.stringify(resp.json());
                            chatLog = this.decryptString(encryptedDocStr, docKey);
                            this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["load"](chatLog);
                            this.log = this.logDoc.log;
                        }
                        if (!resp) {
                            this.log = null;
                        }
                        return [2 /*return*/, this.logDoc];
                }
            });
        });
    };
    DocumentService.prototype.addMessage = function (guid, message) {
        return __awaiter(this, void 0, void 0, function () {
            var logFileName, log, msg_1, logStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logFileName = guid + ".log.json";
                        return [4 /*yield*/, this.getLog(guid)];
                    case 1:
                        log = _a.sent();
                        if (!log) return [3 /*break*/, 3];
                        msg_1 = new __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */]();
                        msg_1.message = message;
                        msg_1.createdBy = blockstack.loadUserData().username;
                        msg_1.createdByName = blockstack.loadUserData().profile.name;
                        msg_1.email = this.blockStackService.profile.email;
                        this.logDoc = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["change"](this.logDoc, msg_1.createdByName + " added message at " + this.getDate(), function (doc) {
                            doc.log.messages.push(msg_1);
                        });
                        logStr = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["save"](this.logDoc);
                        logStr = this.encryptString(logStr, this.currentDoc.documentKey);
                        return [4 /*yield*/, blockstack.putFile(logFileName, logStr, { encrypt: false })];
                    case 2:
                        _a.sent();
                        this.log = this.logDoc.log;
                        this.events.publish('documentService:addedChat', msg_1);
                        return [2 /*return*/, this.log];
                    case 3:
                        console.error("error getting log file: " + logFileName);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    DocumentService.prototype.updatePartnerPathData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DocumentService.prototype.writeCode = function (docGuid, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(this.urlBlockusign + "/api/Code?docGuid=" + docGuid + "&code=" + code).toPromise()];
            });
        });
    };
    DocumentService.prototype.addDocStoragePath = function (docGuid, code, storagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedStoragePath, url;
            return __generator(this, function (_a) {
                encodedStoragePath = encodeURIComponent(storagePath);
                url = "/api/DocStorageMap?docGuid=" + docGuid + "&code=" + code + "&storagePath=" + encodedStoragePath;
                return [2 /*return*/, this.http.get(this.urlBlockusign + url).toPromise()];
            });
        });
    };
    DocumentService.prototype.getDocStorageMaps = function (docGuid) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.urlBlockusignGlobalStore + "/" + docGuid + ".doc.storage.map.json").toPromise()];
                    case 1:
                        resp = _a.sent();
                        this.docStorageMaps = resp.json();
                        return [2 /*return*/, this.docStorageMaps];
                }
            });
        });
    };
    //#region Encryption
    //https://stackoverflow.com/questions/26734033/encrypting-files-with-sjcl-client-side
    DocumentService.prototype.ecryptDoc = function (doc, key) {
        var docBits = sjcl.codec.arrayBuffer.toBits(doc);
        var base64bits = sjcl.codec.base64.fromBits(docBits);
        var encryptedDoc = sjcl.encrypt(key, base64bits);
        return encryptedDoc;
    };
    DocumentService.prototype.decryptDoc = function (encryptedDoc, key) {
        var dec = sjcl.decrypt(key, encryptedDoc);
        var decryptedBase64 = sjcl.codec.base64.toBits(dec);
        var decryptedDocBits = sjcl.codec.arrayBuffer.fromBits(decryptedBase64);
        return decryptedDocBits;
    };
    DocumentService.prototype.encryptString = function (payload, key) {
        var encryptedDoc = sjcl.encrypt(key, payload);
        return encryptedDoc;
    };
    DocumentService.prototype.decryptString = function (payload, key) {
        var dec = sjcl.decrypt(key, payload);
        return dec;
    };
    DocumentService.prototype.generateKey = function () {
        return window.guid();
    };
    //#endregion
    // watchout
    DocumentService.prototype.resetStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockstack.putFile(this.indexFileName, "[]", { encrypt: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentService.prototype.testAutoMerge = function () {
        // // fetch from server state for Nick
        // let doc1Nick = [{ 'who': 'nick' }];
        // // init doc
        // let doc1 = Automerge.init();
        // let commitMsg = 'Initialize doc from server for nick - ' + this.getDate();
        // doc1 = Automerge.change(doc1, commitMsg , doc => {
        //   doc = doc1Nick;
        // });
        // console.log(doc1);
        // // nick adds a row
        // commitMsg = 'Nick adds a row - ' + this.getDate;
        // doc1 = Automerge.change(doc1, 'Add card', doc => {
        //   doc.push({'who': 'nick2'});
        // });
        // console.log(doc1);
        // // Now let's simulate another device, whose application state is doc2. We
        // // initialise it separately, and merge doc1 into it. After merging, doc2 has
        // // a copy of all the cards in doc1.
        // // fetch from server state for Blockusign
        // let doc1Blockusign1 = [{ 'who': 'nick' }, {'who': 'Blocusign1'}];
    };
    DocumentService.prototype.getDate = function () {
        var d = Date();
        return d;
    };
    DocumentService.prototype.testInitDoc = function () {
        // 1) init or load Mine
        this.docMine = this.state.docInit();
        // 2) Save as string
        var docStr = this.state.docSave(this.docMine);
        // 3) Send to server
        // putFile
        return docStr;
    };
    DocumentService.prototype.testEditDoc = function () {
        // 1) load Mine
        //this.docMine;
        // 2) Edit Doc
        this.docMine = this.state.docEdit(this.docMine, "nick 1st add - " + this.getDate(), "messages", { 'nick': '1' });
        // 3) Save to server
    };
    DocumentService.prototype.testMerge = function () {
        // 1) load Mine
        var docMine = this.testInitDoc();
        // 2) get Their data data
        // 3) Merge
        // 4) Save
        // return doc
    };
    DocumentService.prototype.getMine = function (property, message) {
        // init doc
        var docMine = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["init"]();
        //let commitMsg = 'initDoc - ' + this.getDate();
        docMine = __WEBPACK_IMPORTED_MODULE_7_automerge_dist_automerge_js__["change"](docMine, message, function (doc) {
            doc[property] = [message];
        });
        return docMine;
    };
    DocumentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_8__blockstack_service__["a" /* BlockStackService */]])
    ], DocumentService);
    return DocumentService;
}());

//# sourceMappingURL=document.service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailPageModule", function() { return EmailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__email__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_select_ng_select__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var EmailPageModule = (function () {
    function EmailPageModule() {
    }
    EmailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__email__["a" /* EmailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__email__["a" /* EmailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* BlockStepsComponentModule */],
                __WEBPACK_IMPORTED_MODULE_4__ng_select_ng_select__["a" /* NgSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* ReactiveFormsModule */]
            ],
            providers: []
        })
    ], EmailPageModule);
    return EmailPageModule;
}());

//# sourceMappingURL=email.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
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






/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EmailService = (function () {
    //url = "http://localhost:5000/api/email";
    function EmailService(events, http) {
        this.events = events;
        this.http = http;
        //url = "https://api.sendgrid.com/v3/mail/send";
        //apiK = "";
        this.url = "https://blockusign.co/api/email";
    }
    EmailService.prototype.sendEmail = function (to, subject, content) {
        return __awaiter(this, void 0, void 0, function () {
            var data, httpOptions, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!to || !subject || !content) {
                            alert('Must add an email address');
                            return [2 /*return*/];
                        }
                        data = {
                            "to": to,
                            "subject": subject,
                            "content": content
                        };
                        httpOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]();
                        httpOptions.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                            'Content-Type': 'application/json'
                        });
                        return [4 /*yield*/, this.http.post(this.url, JSON.stringify(data), httpOptions).toPromise()];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    EmailService.prototype.updateCachedEmails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // @todo when you send a document to an email address save it, so weh can query it in the lookup next time
    EmailService.prototype.getCachedEmails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    EmailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], EmailService);
    return EmailService;
}());

//# sourceMappingURL=email.service.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewPageModule", function() { return ReviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__review__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ReviewPageModule = (function () {
    function ReviewPageModule() {
    }
    ReviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__review__["a" /* ReviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__review__["a" /* ReviewPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* BlockStepsComponentModule */]
            ],
        })
    ], ReviewPageModule);
    return ReviewPageModule;
}());

//# sourceMappingURL=review.module.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignPageModule", function() { return SignPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignPageModule = (function () {
    function SignPageModule() {
    }
    SignPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sign__["a" /* SignPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sign__["a" /* SignPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* BlockStepsComponentModule */]
            ],
        })
    ], SignPageModule);
    return SignPageModule;
}());

//# sourceMappingURL=sign.module.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//import { BlockStepsComponent } from '../../components/block-steps/block-steps';
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* BlockStepsComponentModule */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomePage */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_2__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], HomeModule);
    return HomeModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pdf_annotate__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pdf_annotate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_pdf_annotate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_global_service__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_document_service__ = __webpack_require__(31);
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








//const $ = document.querySelectorAll.bind(document);
/// Pdf js basic example - https://jsfiddle.net/pdfjs/cq0asLqz/?utm_source=website&utm_medium=embed&utm_campaign=cq0asLqz
/// Annotations sample - http://jsfiddle.net/seikichi/RuDvz/2/
var HomePage = (function () {
    function HomePage(navCtrl, loadingCtrl, globalService, documentService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globalService = globalService;
        this.documentService = documentService;
        this.alertCtrl = alertCtrl;
        this.isLoggedIn = false;
        this.loginState = "Login";
        this.fileName = "blockusign/pdf1.pdf";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.initCamera();
                this.ekUpload();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.next = function () {
        //this.navCtrl.push(AnnotatePage)
        //this.navCtrl.setRoot(ListPage);
        this.navCtrl.push("AnnotatePage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    HomePage.prototype.saveFile = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var documentList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.documentService.addDocument(fileName, this.pdfBuffer)];
                    case 1:
                        documentList = _a.sent();
                        this.next();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.documentService.getDocument(this.fileName, this.documentService.currentDoc.documentKey);
                this.pdfBuffer = data;
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.loadFile = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //this.loading.present();
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
        var filename = "";
        var reader = new FileReader();
        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                // document.getElementById('byte_content').textContent = evt.target.result;
                // document.getElementById('byte_range').textContent =
                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                //         ' of ', file.size, ' byte file'].join('');
            }
            filename = fileInput.files[0].name;
            _this.newDocModal(filename);
            //localStorage.setItem("FileName", filename);
        };
        var blob = file.slice(start, stop + 1);
        //reader.readAsBinaryString(blob);
        reader.onload = function (evt) {
            var arraybuffer = evt.target.result;
            _this.pdfBuffer = arraybuffer;
            //this.saveFile();
            var pdfData = new Uint8Array(arraybuffer);
            //this.savePdfAsString(pdfData);
            _this.createPdf(pdfData);
        };
        reader.readAsArrayBuffer(blob);
    };
    HomePage.prototype.createPdf = function (pdfData) {
        var _this = this;
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        var pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        __WEBPACK_IMPORTED_MODULE_3_pdf_annotate___default.a.setStoreAdapter(new __WEBPACK_IMPORTED_MODULE_3_pdf_annotate___default.a.LocalStoreAdapter());
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
                    _this.loading.dismiss();
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
            _this.loading.dismiss();
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
    HomePage.prototype.newDocModal = function (fileName) {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        // save here
                        _this.saveFile(data.fileName);
                        if (true) {
                            // logged in!
                        }
                        else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.initCamera = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var devices, rearCamera, mediaOptions, mediaConfig, playStream, process, video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                    case 1:
                        devices = _a.sent();
                        ;
                        rearCamera = devices.find(function (device) { return (device.kind === 'videoinput' && device.label.includes('back')); });
                        if (rearCamera) {
                            mediaOptions = {
                                deviceId: { exact: rearCamera.deviceId }
                            };
                        }
                        else {
                            mediaOptions = true;
                        }
                        mediaConfig = {
                            video: mediaOptions
                        };
                        playStream = function (video, src) {
                            video.src = src;
                            video.play();
                        };
                        process = function (video) {
                            var mediaDevices = navigator.mediaDevices;
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
                        video = $("#video")[0];
                        process(video);
                        this.canvasCamera = $("#canvasCamera")[0];
                        this.cameraContext = this.canvasCamera.getContext("2d");
                        $("#snap").on('click', function () {
                            _this.cameraContext.drawImage(video, 0, 0, 612, 792);
                        });
                        $("#downloadpdf").on('click', this.savePDF);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.savePDF = function () {
        try {
            this.canvasCamera = $("#canvasCamera")[0];
            var imgData = this.canvasCamera.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'mm', [297, 210]);
            pdf.addImage(imgData, 'JPEG', 5, 5);
            var namefile = prompt("insert name of file");
            pdf.save(namefile + ".pdf");
        }
        catch (e) {
            alert("Error description: " + e.message);
        }
    };
    HomePage.prototype.testPublicKeyFile = function () {
        var _this = this;
        var myPublicKey = blockstack.getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey);
        var yourPublicKey = "02563f0f1d5c5429fa8fdb3d8fc4b0464dac70b07cd8249f0ef17bcf2c93ed7469";
        if (blockstack.loadUserData().profile.name == "nick tee") {
            // write for you
            this.testPutFile(yourPublicKey);
            // write for me
            this.testPutFile(myPublicKey).then(function () {
                // read for me
                _this.testGetFile(myPublicKey);
            });
        }
        if (blockstack.loadUserData().profile.name == "Demo User BlockSign") {
            // read for me
            this.testGetFile(myPublicKey);
        }
    };
    HomePage.prototype.testPutFile = function (publicKey) {
        var encryptOptions = { encrypt: publicKey };
        var path = "testFile.json";
        var fileContent = "{stuff: 'from nicktee.id'}";
        // put and encrypt the file
        return blockstack.putFile(path, fileContent, encryptOptions)
            .then(function (publicURL) {
            console.log("testPublicKeyFile ===> " + publicURL);
        });
    };
    HomePage.prototype.testGetFile = function (publicKey) {
        var decryptOptions = {
            decrypt: true
        };
        var fullReadUrl = "../../hub/18kTskBpTh1mznsypu1fhJ27dxbC1SwXEK/testFile.json";
        return blockstack.getFile(fullReadUrl, decryptOptions).then(function (readContent) {
            console.log("testPublicKeyFile ===> " + readContent);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\home\home.html"*/'<ion-content>\n\n\n\n<block-steps activeStep="1">\n\n</block-steps>\n\n<br/><br/>\n\n\n\n  <ion-grid>\n\n\n\n    <ion-row class="uploader-row">\n\n      <ion-col>\n\n\n\n        <div >\n\n          <!-- Upload  -->\n\n          <form id="file-upload-form" class="uploader">\n\n            <input id="file-upload" type="file" name="fileUpload" accept=".pdf" />\n\n            <label for="file-upload" id="file-drag">\n\n              <img id="file-image" src="#" alt="Preview" class="hidden">\n\n              <div id="start">\n\n                <i class="fa fa-download" aria-hidden="true"></i>\n\n                <div>Select a PDF</div>\n\n                <div id="notimage" class="hidden">Please select an image</div>\n\n                <span id="file-upload-btn" class="btn btn-primary">Select a file</span>\n\n              </div>\n\n              <div id="response" class="hidden">\n\n                <div id="messages"></div>\n\n                <progress class="progress" id="file-progress" value="0">\n\n                  <span>0</span>%\n\n                </progress>\n\n              </div>\n\n            </label>\n\n          </form>\n\n\n\n          <!-- <label class="item item-input"> -->\n\n          <!-- <input type="file" id="files" name="file" (submit)="loadFile()" /> -->\n\n          <!-- </label> -->\n\n          <!-- <div class="preview-img">\n\n                          <img id="myImage" width="150" height="150" size="30" /> </div> -->\n\n          <!-- <span class="readBytesButtons">\n\n                                  <button data-startbyte="0" data-endbyte="4">1-5</button>\n\n                                  <button data-startbyte="5" data-endbyte="14">6-15</button>\n\n                                  <button data-startbyte="6" data-endbyte="7">7-8</button>\n\n                                  <button>entire file</button>\n\n                                </span> -->\n\n          <!-- <div id="byte_range"></div>\n\n                                <div id="byte_content"></div> -->\n\n\n\n          <!-- <button ion-button (click)="next()" style="margin-left: 50px; padding: 10px 10px 10px 10px; background: green; height: 45px;">\n\n            Next &nbsp;\n\n            <ion-icon name="arrow-forward"></ion-icon>\n\n          </button>  -->\n\n          <!-- <button ion-button (click)="saveFile()">Save File</button>\n\n                      <button ion-button (click)="getFile()">Get File</button> -->\n\n\n\n\n\n\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n\n\n    <!-- <ion-row>\n\n      <ion-col>\n\n        <video id="video" width="612" height="792"></video>\n\n        <canvas id="canvasCamera" width="612" height="792"></canvas>\n\n      </ion-col>\n\n    </ion-row>\n\n -->\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <div>\n\n          <br/>\n\n          <canvas id="the-canvas"></canvas>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-grid>\n\n\n\n\n\n  <!-- <steps>\n\n    \n\n  </steps> -->\n\n\n\n  <!-- <ion-fab top left style="margin-top:130px;background-color:#36393E; opacity: .95;border-radius: 10px" #fab>\n\n    <button id="snap">Snap Photo</button>\n\n    <button id="downloadpdf">Download as pdf</button>\n\n  </ion-fab> -->\n\n</ion-content>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__services_global_service__["a" /* GlobalService */],
            __WEBPACK_IMPORTED_MODULE_5__services_document_service__["a" /* DocumentService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
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




var OptionsPopoverPage = (function () {
    function OptionsPopoverPage(viewCtrl, documentService, toastCtrl) {
        this.viewCtrl = viewCtrl;
        this.documentService = documentService;
        this.toastCtrl = toastCtrl;
        this.doc = this.viewCtrl.data.selectedDoc;
    }
    OptionsPopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    OptionsPopoverPage.prototype.documentRemove = function (selectedDocument) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.documentService.removeDocument(this.doc)];
                    case 1:
                        _a.sent();
                        toast = this.toastCtrl.create({
                            message: 'Document deleted!',
                            duration: 3000,
                            position: 'middle'
                        });
                        toast.present();
                        this.viewCtrl.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    OptionsPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n     <br/>\n      <ion-list style=\"\">\n        <button ion-item (click)=\"documentRemove()\">Delete</button>\n        <button ion-item (click)=\"close()\">CLOSE X</button>\n      </ion-list>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], OptionsPopoverPage);
    return OptionsPopoverPage;
}());

//# sourceMappingURL=options.popover.page.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(541);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_select_ng_select__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(965);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__options_popover_page__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_directives_module__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home_module__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_annotate_annotate_module__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_sign_sign_module__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_email_email_module__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_review_review_module__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_components_module__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_coin_service__ = __webpack_require__(966);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_global_service__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_cryptocompare_service__ = __webpack_require__(967);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_slack_service__ = __webpack_require__(968);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_email_service__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_blockstack_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















//import { HomePage } from './../pages/home/home';
//import { AnnotatePage } from './../pages/annotate/annotate';







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__options_popover_page__["a" /* OptionsPopoverPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {
                    preloadModules: true
                }, {
                    links: [
                        { loadChildren: '../pages/annotate/annotate.module#AnnotatePageModule', name: 'AnnotatePage', segment: 'annotate/:guid', priority: 'low', defaultHistory: ['HomePage'] },
                        { loadChildren: '../pages/email/email.module#EmailPageModule', name: 'EmailPage', segment: 'email/:guid', priority: 'low', defaultHistory: ['AnnotatePage', 'HomePage'] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review/:guid', priority: 'low', defaultHistory: ['SignPage', 'EmailPage', 'AnnotatePage', 'HomePage'] },
                        { loadChildren: '../pages/sign/sign.module#SignPageModule', name: 'SignPage', segment: 'sign/:guid', priority: 'low', defaultHistory: ['EmailPage', 'AnnotatePage', 'HomePage'] },
                        { loadChildren: '../pages/home/home.module#HomeModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_11__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home_module__["HomeModule"],
                __WEBPACK_IMPORTED_MODULE_13__pages_annotate_annotate_module__["AnnotatePageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_sign_sign_module__["SignPageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_email_email_module__["EmailPageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_review_review_module__["ReviewPageModule"],
                __WEBPACK_IMPORTED_MODULE_7__ng_select_ng_select__["a" /* NgSelectModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_17__components_components_module__["a" /* BlockStepsComponentModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__options_popover_page__["a" /* OptionsPopoverPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_24__services_blockstack_service__["a" /* BlockStackService */],
                __WEBPACK_IMPORTED_MODULE_18__services_coin_service__["a" /* CoinService */],
                __WEBPACK_IMPORTED_MODULE_20__services_cryptocompare_service__["a" /* CryptoCompareService */],
                __WEBPACK_IMPORTED_MODULE_21__services_slack_service__["a" /* SlackService */],
                __WEBPACK_IMPORTED_MODULE_19__services_global_service__["a" /* GlobalService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_22__services_document_service__["a" /* DocumentService */],
                __WEBPACK_IMPORTED_MODULE_23__services_email_service__["a" /* EmailService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return State; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__);

var State = (function () {
    function State() {
    }
    // 1) Init
    State.prototype.docInit = function () {
        // init doc
        var docMine = __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["init"]();
        return docMine;
    };
    // 1) Or Get Mine
    State.prototype.docLoadMine = function (mine) {
        return __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["load"](mine);
    };
    // 2) Get Theirs
    State.prototype.docLoadTheirs = function (theirs) {
        return __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["load"](theirs);
    };
    // 3) Merge theirs into mine, and sort by updatedAt date
    State.prototype.docMerge = function (mine, theirs) {
        return __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["merge"](mine, theirs);
    };
    // 4) Save the merged state
    State.prototype.docSave = function (doc) {
        return __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["save"](doc);
    };
    // 5) Add my changes
    State.prototype.docEdit = function (mine, commit, property, data) {
        mine = __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["change"](mine, commit, function (doc) {
            doc[property] = data;
        });
        return mine;
    };
    State.prototype.docHistory = function (doc) {
        return __WEBPACK_IMPORTED_MODULE_0_automerge_dist_automerge_js__["getHistory"](doc).map(function (state) { return [state.change.message, state.snapshot.cards.length]; });
    };
    return State;
}());

//let state = new State();
//# sourceMappingURL=state.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockStepsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
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
 * Generated class for the BlockStepsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var BlockStepsComponent = (function () {
    function BlockStepsComponent(nav, documentService) {
        this.nav = nav;
        this.documentService = documentService;
        console.log('Hello BlockStepsComponent Component');
        this.text = 'Hello World';
    }
    BlockStepsComponent.prototype.route = function (page) {
        // try{
        //   this.nav.pop();
        // }
        // catch(e) {
        //   // nothing to pop
        // };
        $('.block-pdf-page').empty();
        this.nav.push(page, {
            guid: this.documentService.currentDoc.guid
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], BlockStepsComponent.prototype, "activeStep", void 0);
    BlockStepsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'block-steps',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-steps\block-steps.html"*/'<!-- Generated template for the BlockStepsComponent component -->\n\n<!-- <h1>\n\n    {{ activeStep }}\n\n</h1>\n\n\n\n<div>\n\n    <ng-content select=".step1"></ng-content>\n\n</div>\n\n<h2>\n\n    <ng-content select=".step2"></ng-content>\n\n</h2> -->\n\n\n\n\n\n <div class="steps-wrapper">\n\n    <ul class="steps">\n\n      <li [ngClass]="activeStep == \'1\' ? \'step active\': \'step\'" (click)="route(\'HomePage\')">\n\n        <div class="step-info">\n\n          <span class="step-name">Upload</span>\n\n        </div>\n\n      </li>\n\n      <li [ngClass]="activeStep == \'2\' ? \'step active\': \'step\'" (click)="route(\'AnnotatePage\')">\n\n        <div class="step-info">\n\n          <span class="step-name">Annotate</span>\n\n        </div>\n\n      </li>\n\n      <li [ngClass]="activeStep == \'3\' ? \'step active\': \'step\'" (click)="route(\'EmailPage\')">\n\n        <div class="step-info">\n\n          <span class="step-name">Email</span>\n\n        </div>\n\n      </li>\n\n      <li [ngClass]="activeStep == \'4\' ? \'step active\': \'step\'" (click)="route(\'SignPage\')">\n\n        <div class="step-info">\n\n          <span class="step-name">Sign</span>\n\n        </div>\n\n      </li>\n\n      <li [ngClass]="activeStep == \'5\' ? \'step active\': \'step\'" (click)="route(\'ReviewPage\')">\n\n        <div class="step-info">\n\n          <span class="step-name">Review</span>\n\n        </div>\n\n      </li>\n\n    </ul>\n\n  </div>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-steps\block-steps.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */]])
    ], BlockStepsComponent);
    return BlockStepsComponent;
}());

//# sourceMappingURL=block-steps.js.map

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 594:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 595:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockStepsComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_steps_block_steps__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_pdf_block_pdf__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__block_chat_block_chat__ = __webpack_require__(624);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var BlockStepsComponentModule = (function () {
    function BlockStepsComponentModule() {
    }
    BlockStepsComponentModule_1 = BlockStepsComponentModule;
    BlockStepsComponentModule.forRoot = function () {
        return {
            ngModule: BlockStepsComponentModule_1,
            providers: []
        };
    };
    BlockStepsComponentModule = BlockStepsComponentModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__block_steps_block_steps__["a" /* BlockStepsComponent */],
                __WEBPACK_IMPORTED_MODULE_3__block_pdf_block_pdf__["a" /* BlockPdfComponent */],
                __WEBPACK_IMPORTED_MODULE_5__block_chat_block_chat__["a" /* BlockChatComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* DirectivesModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__block_steps_block_steps__["a" /* BlockStepsComponent */],
                __WEBPACK_IMPORTED_MODULE_3__block_pdf_block_pdf__["a" /* BlockPdfComponent */],
                __WEBPACK_IMPORTED_MODULE_5__block_chat_block_chat__["a" /* BlockChatComponent */]]
        })
    ], BlockStepsComponentModule);
    return BlockStepsComponentModule;
    var BlockStepsComponentModule_1;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbsoluteDragDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
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
        this.initDragOn();
        // this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        // this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        // this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
        //let hammer = new window['Hammer'](this.element.nativeElement);
        // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
        // hammer.on('pan', (ev) => {
        //   this.handlePan(ev);
        // });
    };
    AbsoluteDragDirective.prototype.ngOnDestroy = function () {
        //this.svgDrawer.off();
        //this.svgDrawer.remove();
        //$(this.svgDrawer.elem).remove();
        this.startLeft = null;
        this.startTop = null;
    };
    // handlePan(ev){
    //     let newLeft = ev.center.x;
    //     let newTop = ev.center.y;
    //     this.domCtrl.write(() => {
    //         this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
    //         this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
    //     });
    // }
    AbsoluteDragDirective.prototype.initDragOn = function () {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* DomController */]])
    ], AbsoluteDragDirective);
    return AbsoluteDragDirective;
}());

//# sourceMappingURL=absolute-drag.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockChatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_blockstack_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
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






/**
 * https://codepen.io/mehmetmert/pen/zbKpv
 */
var BlockChatComponent = (function () {
    function BlockChatComponent(documentService, events, blockstackService) {
        this.documentService = documentService;
        this.events = events;
        this.blockstackService = blockstackService;
    }
    BlockChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.doc = new __WEBPACK_IMPORTED_MODULE_2__models_models__["a" /* Document */]();
        if (this.documentService.currentDoc) {
            this.doc = this.documentService.currentDoc;
            this.initChatPolling();
        }
        else {
            this.subscription = this.events.subscribe('documentService:setCurrentDoc', function (currentDoc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.doc = currentDoc;
                    this.initChatPolling();
                    return [2 /*return*/];
                });
            }); });
        }
        this.chatSubscription = this.events.subscribe('documentService:addedChat', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); });
    };
    BlockChatComponent.prototype.initChatPolling = function () {
        var _this = this;
        this.chatPolling = setInterval(function () {
            setTimeout(function () {
                _this.getLogData();
            }, 1000);
        }, 3000);
    };
    BlockChatComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.chatPolling);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.chatSubscription) {
            this.chatSubscription.unsubscribe();
        }
    };
    BlockChatComponent.prototype.getLogData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                $(document).ready(function () { return __awaiter(_this, void 0, void 0, function () {
                    var logData, template, orderedMessages, _loop_1, this_1, _i, orderedMessages_1, item;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.documentService.getLog(this.doc.guid)];
                            case 1:
                                logData = _a.sent();
                                $('.chat-head').html(this.doc.fileName);
                                template = "";
                                orderedMessages = jslinq(logData.messages).orderBy(function (el) { return el.updatedAt; }).toList();
                                _loop_1 = function (item) {
                                    var d = item.updatedAt;
                                    var formatDate = __WEBPACK_IMPORTED_MODULE_5_moment__(d).calendar(d);
                                    var uid = item.createdBy;
                                    try {
                                        uid = item.createdBy.replace('.id', '');
                                    }
                                    catch (e) {
                                        console.log('user does not have .id');
                                    }
                                    ;
                                    var uName = item.createdByName;
                                    var uidClass = 'block-pic-' + uid;
                                    this_1.blockstackService.getPicUrl(uName).then(function (picUrl) {
                                        $('.' + uidClass).attr('src', picUrl);
                                    });
                                    template = template + ("  \n        <div class=\"chat-message clearfix\">\n        <img class=\"" + uidClass + "\" src=\"http://www.gravatar.com/avatar/?d=identicon\" alt=\"\" width=\"32\" height=\"32\">\n        <div class=\"chat-message-content clearfix\">\n          <span class=\"chat-time\">" + formatDate + "</span>\n          <h5>" + item.email + "</h5>\n          <p>" + item.message + "</p>\n        </div> \n        </div>\n        <hr style='margin-top:5px' />\n        ");
                                };
                                this_1 = this;
                                for (_i = 0, orderedMessages_1 = orderedMessages; _i < orderedMessages_1.length; _i++) {
                                    item = orderedMessages_1[_i];
                                    _loop_1(item);
                                }
                                //setTimeout( () =>{ // hack?
                                $('.log-history').html(template);
                                $('.chat-history').scrollTop($('.log-history').height());
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    BlockChatComponent.prototype.minimize = function () {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
    };
    BlockChatComponent.prototype.addMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.documentService.addMessage(this.doc.guid, this.message)];
                    case 1:
                        _a.sent();
                        this.events.publish('documentService:addedChat', this.message);
                        this.message = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockChatComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'block-chat',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-chat\block-chat.html"*/'<div class="block-chat">\n\n  <ion-fab bottom right>\n\n    <div id="live-chat" class="shadow6">\n\n\n\n      <header class="clearfix" (click)="minimize()">\n\n        <!-- <a class="chat-close"  >x</a>-->\n\n        <h4>\n\n          <span class="chat-head"></span> - Log</h4>\n\n        <!-- <span style="opacity:.6; padding-left:30px;">YOURNAME/THEIRNAME</span> -->\n\n        <span class="chat-message-counter">3</span>\n\n      </header>\n\n      <div class="chat">\n\n        <div class="chat-history">\n\n          <div class="log-history">\n\n           \n\n          </div>\n\n        </div>\n\n        <!-- <p class="chat-feedback">Your partner is typing…</p> -->\n\n        <form>\n\n          <fieldset>\n\n            <input type="text" name="addMsg" placeholder="Type your message…" autofocus [(ngModel)]="message" (keydown.enter)="addMessage($event)"\n\n            />\n\n          </fieldset>\n\n        </form>\n\n\n\n      </div>\n\n      <!-- end chat -->\n\n\n\n    </div>\n\n    <!-- end live-chat -->\n\n  </ion-fab>\n\n\n\n</div>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\components\block-chat\block-chat.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_document_service__["a" /* DocumentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_document_service__["a" /* DocumentService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_blockstack_service__["a" /* BlockStackService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_blockstack_service__["a" /* BlockStackService */]) === "function" && _c || Object])
    ], BlockChatComponent);
    return BlockChatComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=block-chat.js.map

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 270,
	"./af.js": 270,
	"./ar": 271,
	"./ar-dz": 272,
	"./ar-dz.js": 272,
	"./ar-kw": 273,
	"./ar-kw.js": 273,
	"./ar-ly": 274,
	"./ar-ly.js": 274,
	"./ar-ma": 275,
	"./ar-ma.js": 275,
	"./ar-sa": 276,
	"./ar-sa.js": 276,
	"./ar-tn": 277,
	"./ar-tn.js": 277,
	"./ar.js": 271,
	"./az": 278,
	"./az.js": 278,
	"./be": 279,
	"./be.js": 279,
	"./bg": 280,
	"./bg.js": 280,
	"./bm": 281,
	"./bm.js": 281,
	"./bn": 282,
	"./bn.js": 282,
	"./bo": 283,
	"./bo.js": 283,
	"./br": 284,
	"./br.js": 284,
	"./bs": 285,
	"./bs.js": 285,
	"./ca": 286,
	"./ca.js": 286,
	"./cs": 287,
	"./cs.js": 287,
	"./cv": 288,
	"./cv.js": 288,
	"./cy": 289,
	"./cy.js": 289,
	"./da": 290,
	"./da.js": 290,
	"./de": 291,
	"./de-at": 292,
	"./de-at.js": 292,
	"./de-ch": 293,
	"./de-ch.js": 293,
	"./de.js": 291,
	"./dv": 294,
	"./dv.js": 294,
	"./el": 295,
	"./el.js": 295,
	"./en-au": 296,
	"./en-au.js": 296,
	"./en-ca": 297,
	"./en-ca.js": 297,
	"./en-gb": 298,
	"./en-gb.js": 298,
	"./en-ie": 299,
	"./en-ie.js": 299,
	"./en-il": 300,
	"./en-il.js": 300,
	"./en-nz": 301,
	"./en-nz.js": 301,
	"./eo": 302,
	"./eo.js": 302,
	"./es": 303,
	"./es-do": 304,
	"./es-do.js": 304,
	"./es-us": 305,
	"./es-us.js": 305,
	"./es.js": 303,
	"./et": 306,
	"./et.js": 306,
	"./eu": 307,
	"./eu.js": 307,
	"./fa": 308,
	"./fa.js": 308,
	"./fi": 309,
	"./fi.js": 309,
	"./fo": 310,
	"./fo.js": 310,
	"./fr": 311,
	"./fr-ca": 312,
	"./fr-ca.js": 312,
	"./fr-ch": 313,
	"./fr-ch.js": 313,
	"./fr.js": 311,
	"./fy": 314,
	"./fy.js": 314,
	"./gd": 315,
	"./gd.js": 315,
	"./gl": 316,
	"./gl.js": 316,
	"./gom-latn": 317,
	"./gom-latn.js": 317,
	"./gu": 318,
	"./gu.js": 318,
	"./he": 319,
	"./he.js": 319,
	"./hi": 320,
	"./hi.js": 320,
	"./hr": 321,
	"./hr.js": 321,
	"./hu": 322,
	"./hu.js": 322,
	"./hy-am": 323,
	"./hy-am.js": 323,
	"./id": 324,
	"./id.js": 324,
	"./is": 325,
	"./is.js": 325,
	"./it": 326,
	"./it.js": 326,
	"./ja": 327,
	"./ja.js": 327,
	"./jv": 328,
	"./jv.js": 328,
	"./ka": 329,
	"./ka.js": 329,
	"./kk": 330,
	"./kk.js": 330,
	"./km": 331,
	"./km.js": 331,
	"./kn": 332,
	"./kn.js": 332,
	"./ko": 333,
	"./ko.js": 333,
	"./ky": 334,
	"./ky.js": 334,
	"./lb": 335,
	"./lb.js": 335,
	"./lo": 336,
	"./lo.js": 336,
	"./lt": 337,
	"./lt.js": 337,
	"./lv": 338,
	"./lv.js": 338,
	"./me": 339,
	"./me.js": 339,
	"./mi": 340,
	"./mi.js": 340,
	"./mk": 341,
	"./mk.js": 341,
	"./ml": 342,
	"./ml.js": 342,
	"./mn": 343,
	"./mn.js": 343,
	"./mr": 344,
	"./mr.js": 344,
	"./ms": 345,
	"./ms-my": 346,
	"./ms-my.js": 346,
	"./ms.js": 345,
	"./mt": 347,
	"./mt.js": 347,
	"./my": 348,
	"./my.js": 348,
	"./nb": 349,
	"./nb.js": 349,
	"./ne": 350,
	"./ne.js": 350,
	"./nl": 351,
	"./nl-be": 352,
	"./nl-be.js": 352,
	"./nl.js": 351,
	"./nn": 353,
	"./nn.js": 353,
	"./pa-in": 354,
	"./pa-in.js": 354,
	"./pl": 355,
	"./pl.js": 355,
	"./pt": 356,
	"./pt-br": 357,
	"./pt-br.js": 357,
	"./pt.js": 356,
	"./ro": 358,
	"./ro.js": 358,
	"./ru": 359,
	"./ru.js": 359,
	"./sd": 360,
	"./sd.js": 360,
	"./se": 361,
	"./se.js": 361,
	"./si": 362,
	"./si.js": 362,
	"./sk": 363,
	"./sk.js": 363,
	"./sl": 364,
	"./sl.js": 364,
	"./sq": 365,
	"./sq.js": 365,
	"./sr": 366,
	"./sr-cyrl": 367,
	"./sr-cyrl.js": 367,
	"./sr.js": 366,
	"./ss": 368,
	"./ss.js": 368,
	"./sv": 369,
	"./sv.js": 369,
	"./sw": 370,
	"./sw.js": 370,
	"./ta": 371,
	"./ta.js": 371,
	"./te": 372,
	"./te.js": 372,
	"./tet": 373,
	"./tet.js": 373,
	"./tg": 374,
	"./tg.js": 374,
	"./th": 375,
	"./th.js": 375,
	"./tl-ph": 376,
	"./tl-ph.js": 376,
	"./tlh": 377,
	"./tlh.js": 377,
	"./tr": 378,
	"./tr.js": 378,
	"./tzl": 379,
	"./tzl.js": 379,
	"./tzm": 380,
	"./tzm-latn": 381,
	"./tzm-latn.js": 381,
	"./tzm.js": 380,
	"./ug-cn": 382,
	"./ug-cn.js": 382,
	"./uk": 383,
	"./uk.js": 383,
	"./ur": 384,
	"./ur.js": 384,
	"./uz": 385,
	"./uz-latn": 386,
	"./uz-latn.js": 386,
	"./uz.js": 385,
	"./vi": 387,
	"./vi.js": 387,
	"./x-pseudo": 388,
	"./x-pseudo.js": 388,
	"./yo": 389,
	"./yo.js": 389,
	"./zh-cn": 390,
	"./zh-cn.js": 390,
	"./zh-hk": 391,
	"./zh-hk.js": 391,
	"./zh-tw": 392,
	"./zh-tw.js": 392
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
webpackContext.id = 625;

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_email_service__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_blockstack_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
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








/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailPage = (function () {
    function EmailPage(navCtrl, navParams, documentService, emailService, blockStackService, chg, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.documentService = documentService;
        this.emailService = emailService;
        this.blockStackService = blockStackService;
        this.chg = chg;
        this.loadingCtrl = loadingCtrl;
        this.email = "";
        this.people3 = [];
        this.people3Loading = false;
        this.selectedUser = [];
        this.people3Typeahead = new __WEBPACK_IMPORTED_MODULE_6_rxjs__["Subject"]();
        if (this.navParams.get("guid") && !this.documentService.currentDoc) {
            var guid_1 = this.navParams.get("guid");
            this.documentService.getDocumentsIndex(true).then(function (data) {
                _this.documentService.documentsList = data;
                _this.documentService.setCurrentDoc(guid_1);
                //this.getFile();
                // @todo in side menu highlight selected doc
            });
        }
        else {
            //this.getFile();
        }
    }
    EmailPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('ionViewDidLoad SignPage');
                this.lookup();
                this.loadPeople3();
                return [2 /*return*/];
            });
        });
    };
    EmailPage.prototype.next = function () {
        this.navCtrl.push("SignPage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    EmailPage.prototype.back = function () {
        this.navCtrl.push("AnnotatePage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    EmailPage.prototype.getUrl = function () {
        return window.location.href;
    };
    EmailPage.prototype.lookup = function () {
        blockstack.lookupProfile("blockusign1.id")
            .then(function (profile) {
            var data = profile;
        })
            .catch(function (error) {
            console.log('could not resolve profile');
        });
    };
    EmailPage.prototype.searchUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blockStackService.searchUser(user)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailPage.prototype.loadPeople3 = function () {
        var _this = this;
        this.people3Typeahead.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["tap"])(function () { return _this.people3Loading = true; }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["distinctUntilChanged"])(), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["debounceTime"])(375), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["switchMap"])(function (term) {
            return _this.blockStackService.searchUser(term);
        })).subscribe(function (x) {
            _this.people3 = x;
            _this.people3Loading = false;
            //this.chg.markForCheck();
            console.log("ppl loading false");
        }, function () {
            _this.people3 = [];
            console.log("[]");
        });
    };
    EmailPage.prototype.sendEmail = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var documentLink, subject, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.email) {
                            alert('Please enter an email address');
                            return [2 /*return*/];
                        }
                        this.loading = this.loadingCtrl.create({
                            content: 'Please wait...'
                        });
                        this.loading.present();
                        documentLink = window.location.origin + "/#/sign/" + this.documentService.currentDoc.guid + "/?docData=" + btoa(JSON.stringify(this.documentService.currentDoc));
                        subject = blockstack.loadUserData().profile.name + " has sent you a document to sign - " + this.documentService.currentDoc.fileName;
                        content = "Please click this link and sign the document. Thanks! <br/><br/>" + documentLink;
                        return [4 /*yield*/, this.emailService.sendEmail(this.email, subject, content)];
                    case 1:
                        _a.sent();
                        // add as signer
                        this.documentService.currentDoc.signer.push(this.email);
                        return [4 /*yield*/, this.documentService.updateDocument(this.documentService.currentDoc.guid, this.documentService.currentDoc)];
                    case 2:
                        _a.sent();
                        this.loading.dismiss();
                        alert('Email sent!');
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailPage.prototype.clickedUser = function () {
        // @todo spoofed
        setTimeout(function () {
            alert('Email not found. Please enter below');
        }, 1000);
    };
    EmailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-email',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\email\email.html"*/'<ion-content class="no-overflow-page email-page">\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col width-100>\n\n\n\n        <block-steps activeStep="3">\n\n        </block-steps>\n\n\n\n\n\n        <br/>\n\n        <br/>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid>\n\n    <ion-row align-items-left>\n\n      <ion-col>\n\n        <ng-select style="width:460px; background-color:whitesmoke; border-radius:2px; padding-left:10px" \n\n          [items]="people3"\n\n          [multiple]="false" \n\n          bindLabel="username" \n\n          [(ngModel)]="selectedUser"  \n\n          (change)="searchUser($event)" \n\n          [typeahead]="people3Typeahead"\n\n          placeholder="Select signer..."\n\n          >\n\n          <ng-template ng-label-tmp let-item="item" let-clear="clear" >\n\n            <span class="ng-value-label">\n\n              <img [src]="item.profile.image && item.profile.image[0].contentUrl" width="20px" height="20px"> {{item.username}}</span>\n\n              <span class="ng-value-icon right" (click)="clear(item)" aria-hidden="true">×</span>\n\n          </ng-template>\n\n          <ng-template ng-option-tmp let-item="item">\n\n            <span style="width:100%" (click)="clickedUser()">\n\n                <img [src]="item.profile.image && item.profile.image[0].contentUrl" width="20px" height="20px"> {{item.username}}\n\n            </span>\n\n          </ng-template>\n\n        </ng-select>\n\n      </ion-col>\n\n      <ion-col>\n\n        <h3>or</h3>\n\n      </ion-col>\n\n      <ion-col style="width:460px; background-color:transparent; ">\n\n        <!-- <ion-item  style="width:460px; background-color:transparent; " >\n\n          <ion-input style="width:460px;" placeholder="[Enter Email]" [(ngModel)]="email"></ion-input>\n\n        </ion-item> -->\n\n        \n\n        <input class="classic-input" type="email" placeholder="Email To..." [(ngModel)]="email" autofocus>\n\n   \n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button (click)="sendEmail($event)">Send Email</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  \n\n  <block-pdf marginTop="50px" >\n\n  </block-pdf>\n\n \n\n\n\n  \n\n\n\n  <!-- <ion-card>\n\n\n\n    <ion-card-header>\n\n      Work In Progress\n\n    </ion-card-header>\n\n\n\n    <ion-card-content>\n\n      <img src="./../../assets/imgs/bugcode.jpg"  style="max-width: 300px;"/>\n\n      <br />\n\n      <p>\n\n        Want this feature faster? Considering donating here: BTC - <ion-input value="1Jw3xsPzmYus3ke4XYXAHHyzpxD1sjQVta" style="font-size: large"></ion-input>\n\n      </p>\n\n\n\n      <p>\n\n        <br/>\n\n        The email feature will be enabled in the next release. For now, copy and paste this link to sign. Right now, only you can\n\n        sign the document. The next release will allow you to send this document to somebody else to sign using <a href="https://blockstack.org/tutorials/multi-player-storage" target="_blank">Blockstacks\n\n          muli-player storage.</a>\n\n        <br/>\n\n      </p>\n\n\n\n\n\n      <ion-input [value]="getUrl()" style="font-size: large"></ion-input>\n\n\n\n\n\n\n\n\n\n      <ion-input [value]="getUrl()" style="font-size: large"></ion-input>\n\n\n\n\n\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n -->\n\n\n\n\n\n\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\email\email.html"*/,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].Default,
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */],
            __WEBPACK_IMPORTED_MODULE_3__services_email_service__["a" /* EmailService */],
            __WEBPACK_IMPORTED_MODULE_4__services_blockstack_service__["a" /* BlockStackService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], EmailPage);
    return EmailPage;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockStackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
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







var BlockStackService = (function () {
    function BlockStackService(events, http) {
        this.events = events;
        this.http = http;
        this.picCache = [];
        this.blockusignProfileUrl = "blockusign.profile.json";
        //url = "https://blockusign.co/api/email";
        this.url = "http://localhost:5000/api/profile";
    }
    BlockStackService.prototype.searchUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get("https://core.blockstack.org/v1/search?query=" + user).map(function (r) { return r.json().results; }).toPromise()];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    BlockStackService.prototype.getPicUrl = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var picUrl, isInCache, resp, respObj, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        picUrl = "http://www.gravatar.com/avatar/?d=identicon";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!userId) {
                            return [2 /*return*/, picUrl];
                        }
                        isInCache = this.picCache.filter(function (item) { return item.id === userId; })[0];
                        if (isInCache) {
                            return [2 /*return*/, this.picCache.filter(function (item) { return item.id === userId; })[0].pic];
                        }
                        return [4 /*yield*/, this.http.get("https://core.blockstack.org/v1/search?query=" + userId).toPromise()];
                    case 2:
                        resp = _a.sent();
                        respObj = JSON.parse(resp.text());
                        if (respObj.results.length > 0) {
                            picUrl = respObj.results[0].profile.image[0].contentUrl;
                        }
                        this.picCache.push({
                            id: userId,
                            pic: picUrl
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('Unable to getpic url');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, picUrl];
                }
            });
        });
    };
    BlockStackService.prototype.getProfileData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profileData, myProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockstack.getFile(this.blockusignProfileUrl, { decrypt: false })];
                    case 1:
                        profileData = _a.sent();
                        myProfile = JSON.parse(profileData);
                        if (myProfile) {
                            this.profile = myProfile;
                        }
                        return [2 /*return*/, profileData];
                }
            });
        });
    };
    BlockStackService.prototype.setProfileData = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var storagePath, json, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        storagePath = blockstack.loadUserData().profile.apps[window.location.origin];
                        _a = {
                            email: email,
                            storagePath: storagePath
                        };
                        return [4 /*yield*/, this.getAppPublicKey()];
                    case 1:
                        json = (_a.appPublicKey = _b.sent(),
                            _a);
                        return [4 /*yield*/, blockstack.putFile(this.blockusignProfileUrl, JSON.stringify(json), { encrypt: false })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    BlockStackService.prototype.clearProfileData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {};
                        return [4 /*yield*/, blockstack.putFile(this.blockusignProfileUrl, JSON.stringify(json), { encrypt: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlockStackService.prototype.getAppPublicKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myPublicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockstack.getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey)];
                    case 1:
                        myPublicKey = _a.sent();
                        return [2 /*return*/, myPublicKey];
                }
            });
        });
    };
    BlockStackService.prototype.writeGlobalProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var httpOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]();
                        httpOptions.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                            'Content-Type': 'application/json'
                        });
                        return [4 /*yield*/, this.http.post("url", JSON.stringify(this.profile), httpOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BlockStackService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], BlockStackService);
    return BlockStackService;
}());

//# sourceMappingURL=blockstack.service.js.map

/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
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
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewPage = (function () {
    function ReviewPage(navCtrl, navParams, documentService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.documentService = documentService;
        if (this.navParams.get("guid") && !this.documentService.currentDoc) {
            var guid_1 = this.navParams.get("guid");
            this.documentService.getDocumentsIndex(true).then(function (data) {
                _this.documentService.documentsList = data;
                _this.documentService.setCurrentDoc(guid_1);
                //this.getFile();
                // @todo in side menu highlight selected doc
            });
        }
        else {
            //this.getFile();
        }
    }
    ReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignPage');
    };
    ReviewPage.prototype.back = function () {
        this.navCtrl.push("SignPage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-review',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\review\review.html"*/'<ion-content class="no-overflow-page">\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col width-100>\n\n        <block-steps activeStep="5">\n\n        </block-steps>\n\n        <br/>\n\n        <br/>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <block-pdf marginTop="0px">\n\n\n\n  </block-pdf>\n\n  \n\n<!-- \n\n  <ion-card>\n\n\n\n      <ion-card-header>\n\n        Work In Progress\n\n      </ion-card-header>\n\n  \n\n      <ion-card-content>\n\n        <img src="./../../assets/imgs/bugcode.jpg"  style="max-width: 300px;"/>\n\n        <br />\n\n        <p>\n\n          Want this feature faster? Considering donating here: BTC - <ion-input value="1Jw3xsPzmYus3ke4XYXAHHyzpxD1sjQVta" style="font-size: large"></ion-input>\n\n        </p>\n\n  \n\n\n\n      </ion-card-content>\n\n  \n\n    </ion-card> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\review\review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_block_pdf_block_pdf__ = __webpack_require__(252);
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




/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignPage = (function () {
    function SignPage(navCtrl, navParams, documentService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.documentService = documentService;
    }
    SignPage.prototype.ionViewDidLoad = function () {
        this.init();
    };
    SignPage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var docData, guid_1, jsonDoc, doc, resp, guid, path, fileBuffer, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docData = getQueryParam('docData');
                        if (!(this.navParams.get("guid") && !this.documentService.currentDoc && !docData)) return [3 /*break*/, 1];
                        guid_1 = this.navParams.get("guid");
                        this.documentService.getDocumentsIndex(true).then(function (data) {
                            _this.documentService.documentsList = data;
                            _this.documentService.setCurrentDoc(guid_1);
                        });
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.navParams.get("guid") && !this.documentService.currentDoc && docData)) return [3 /*break*/, 7];
                        jsonDoc = atob(docData);
                        doc = JSON.parse(jsonDoc);
                        return [4 /*yield*/, this.documentService.getDocumentsIndex(true)];
                    case 2:
                        resp = _a.sent();
                        this.documentService.documentsList = resp;
                        guid = this.navParams.get("guid");
                        if (!this.documentService.documentExists(guid)) return [3 /*break*/, 3];
                        this.documentService.setCurrentDoc(guid);
                        return [3 /*break*/, 6];
                    case 3:
                        path = doc.pathAnnotatedDoc + this.navParams.get("guid") + ".pdf";
                        console.log(path);
                        return [4 /*yield*/, this.documentService.getDocumentByPath(path, doc.documentKey)];
                    case 4:
                        fileBuffer = _a.sent();
                        return [4 /*yield*/, this.documentService.copyDocument(doc, guid, fileBuffer)];
                    case 5:
                        copied = _a.sent();
                        this.blockPdf.ngOnInit();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.log('Error, must pass in guid');
                        _a.label = 8;
                    case 8:
                        console.log('ionViewDidLoad SignPage');
                        this.name = blockstack.loadUserData().profile.name;
                        return [2 /*return*/];
                }
            });
        });
    };
    SignPage.prototype.next = function () {
        this.navCtrl.push("ReviewPage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    SignPage.prototype.back = function () {
        this.navCtrl.push("EmailPage", {
            guid: this.documentService.currentDoc.guid
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__components_block_pdf_block_pdf__["a" /* BlockPdfComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components_block_pdf_block_pdf__["a" /* BlockPdfComponent */])
    ], SignPage.prototype, "blockPdf", void 0);
    SignPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sign',template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\sign\sign.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title>sign</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content class="no-overflow-page">\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col width-100>\n\n        <block-steps activeStep="4" ></block-steps>\n\n        <br/>\n\n        <br/>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <block-pdf #blockpdf showToolBar="true" showSignature="true" showButtons="true">\n\n\n\n  </block-pdf>\n\n\n\n<!-- \n\n  <ion-card>\n\n\n\n     \n\n      <ion-card-header>\n\n        Work In Progress\n\n      </ion-card-header>\n\n  \n\n      <ion-card-content>\n\n        <img src="./../../assets/imgs/officespace.jpg"  style="max-width: 300px;"/>\n\n        <br />\n\n        <p>\n\n          Want this feature faster? Considering donating here: BTC - <ion-input value="1Jw3xsPzmYus3ke4XYXAHHyzpxD1sjQVta" style="font-size: large"></ion-input>\n\n        </p>\n\n  \n\n        <p>\n\n          <br/>\n\n            The signing feature will be enabled in the next release using <a href="https://blockstack.org/tutorials/multi-player-storage" target="_blank">Blockstacks\n\n            muli-player storage.</a>\n\n          <br/>\n\n        </p>\n\n  \n\n\n\n  \n\n  \n\n      </ion-card-content>\n\n  \n\n    </ion-card> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\pages\sign\sign.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_document_service__["a" /* DocumentService */]])
    ], SignPage);
    return SignPage;
}());

//# sourceMappingURL=sign.js.map

/***/ }),

/***/ 965:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_annotate_annotate__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_document_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__options_popover_page__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_blockstack_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise__);
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













var $ = document.querySelectorAll.bind(document);

var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, loadingCtrl, alertCtrl, documentService, popoverCtrl, menuCtrl, blockStackService, toastCntrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.documentService = documentService;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.blockStackService = blockStackService;
        this.toastCntrl = toastCntrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.isLoggedIn = false;
        this.loginState = "Login";
        this.fileName = "blockusign/pdf1.pdf";
        this.avatar = "http://www.gravatar.com/avatar/?d=identicon";
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: '1). Upload PDF', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: '2). Annotate PDF', component: __WEBPACK_IMPORTED_MODULE_5__pages_annotate_annotate__["a" /* AnnotatePage */] }
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
            _this.showProfile();
            _this.setupDiscordMenu();
        });
    };
    // openPage(page) {
    //   // Reset the content nav to have just this page
    //   // we wouldn't want the back button to show in this scenario
    //   this.nav.setRoot(page.component);
    // }
    MyApp.prototype.login = function () {
        var origin = window.location.origin;
        blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data', 'email']);
    };
    MyApp.prototype.next = function () {
        this.menuCtrl.close();
        // if (this.nav.getActive().name == "AnnotatePage") {
        //  this.nav.pop();
        // }
        // else{
        //   jQuery('.block-pdf-page').empty();
        // }
        this.nav.setRoot("HomePage");
        var guid = this.documentService.currentDoc.guid;
        this.nav.push("AnnotatePage", {
            guid: guid
        });
    };
    MyApp.prototype.home = function () {
        this.menuCtrl.close();
        this.nav.setRoot("HomePage");
        this.clearActive();
    };
    MyApp.prototype.logout = function () {
        blockstack.signUserOut(window.location.origin);
    };
    MyApp.prototype.showProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var profile, profileData, myProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!blockstack.isUserSignedIn()) return [3 /*break*/, 2];
                        profile = blockstack.loadUserData();
                        this.name = profile.username;
                        this.isLoggedIn = true;
                        try {
                            this.avatar = profile.profile.image[0].contentUrl;
                        }
                        catch (e) {
                            console.log('no profile pic');
                        }
                        this.loginState = "[Logout]";
                        this.documentService.getDocumentsIndex(true).then(function (data) {
                            _this.documentsList = data;
                        });
                        return [4 /*yield*/, this.blockStackService.getProfileData()];
                    case 1:
                        profileData = _a.sent();
                        if (!profileData) {
                            this.profileModal(this.email);
                        }
                        else {
                            myProfile = JSON.parse(profileData);
                            if (!myProfile.email) {
                                this.profileModal(this.email);
                            }
                            else {
                                this.name = myProfile.email;
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (blockstack.isSignInPending()) {
                            blockstack.handlePendingSignIn().then(function (userData) {
                                window.location = window.location.origin;
                                this.documentsGetList();
                            });
                        }
                        else {
                            if (localStorage.getItem('signUp') !== 'true') {
                                window.location.href = "signup.html";
                            }
                            else {
                                localStorage.setItem('signUp', 'true');
                                this.login();
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.setupDiscordMenu = function () {
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
    MyApp.prototype.documentSelected = function (e, selectedDocument) {
        this.documentService.currentDoc = selectedDocument;
        this.next();
    };
    MyApp.prototype.documentsGetList = function () {
        var _this = this;
        this.documentService.getDocumentsIndex(true).then(function (data) {
            _this.documentsList = data;
        });
    };
    MyApp.prototype.presentPopover = function (myEvent, item) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__options_popover_page__["a" /* OptionsPopoverPage */], { selectedDoc: item });
        popover.present({
            ev: myEvent,
        });
    };
    MyApp.prototype.clearActive = function () {
        $(".channel-text").forEach(function (el) {
            try {
                $(".channel-text.active")[0].classList.remove("active");
            }
            catch (e) { }
        });
    };
    MyApp.prototype.profileModal = function (email) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Please enter your email',
            enableBackdropDismiss: false,
            inputs: [
                {
                    name: 'email',
                    placeholder: 'email',
                    value: email
                }
            ],
            buttons: [
                // {
                //   text: 'Cancel',
                //   role: 'cancel',
                //   handler: data => {
                //     console.log('Cancel clicked');
                //   }
                // },
                {
                    text: 'Ok',
                    handler: function (data) {
                        // save here
                        _this.blockStackService.setProfileData(data.email);
                        if (data.email.indexOf("@") != -1) {
                            // logged in!
                        }
                        else {
                            // invalid login
                            _this.showErrorToast('Invalid Email');
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.showErrorToast = function (data) {
        var toast = this.toastCntrl.create({
            message: data,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"N:\code\git\blockusign\BlockUSign.Ionic\src\app\app.html"*/'<!-- <ion-menu [content]="content" scroll="false" >\n\n  \n\n\n\n  <ion-content scroll="false">\n\n    <ion-list scroll="false">\n\n      <button scroll="false" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu> -->\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-split-pane >\n\n  <ion-menu [content]="content" >\n\n      <div class="discord" style="height: 100%; width: 300px; color:whitesmoke">\n\n        <!-- https://codepen.io/thesbros/pen/vxpMPp -->\n\n        <main class="container">\n\n          <aside class="servers">\n\n            <div class="servers-collection">\n\n              <div class="server focusable server-friends" role="button" aria-label="Friends unread">\n\n                <div class="server-icon">\n\n                  <svg>\n\n                    <use xlink:href="#icon-friends" />\n\n                  </svg>\n\n                </div>\n\n              </div>\n\n            </div>\n\n\n\n          \n\n            <div class="servers-collection">\n\n              <div class="server focusable active" role="button" aria-label="My Server" aria-selected="true">\n\n                <div class="server-icon">\n\n                 <!-- <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png" /> -->\n\n                  <img class="avatar" alt="Avatar" [src]="avatar" />\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </aside>\n\n\n\n\n\n\n\n\n\n          <aside class="channels">\n\n            <header class="channels-header focusable" (click)="home()">\n\n\n\n              <!-- <img src="./assets/imgs/blockusign.png" height="45px" width="45px" /> -->\n\n              <img src="./assets/imgs/blockusignLogoSvg.svg" height="45px" width="45px" class="blockusign-logo" />\n\n              <img src="./assets/imgs/blockusignTextLoRes.png" width="120px" style="padding-left: 12px; padding-top: 10px" />\n\n             \n\n              \n\n            \n\n\n\n\n\n\n\n              <h3 role="header" class="channels-header-name" style="padding-right: 10px;"></h3> \n\n              <!-- <button ion-button style="padding: 10px 10px 10px 10px; background: green; height: 45px;"> NEW + </button> -->\n\n              <!-- <svg role="button" aria-label="Dropdown" class="channels-header-dropdown">\n\n                <use xlink:href="#icon-dropdown" />\n\n              </svg> -->\n\n\n\n             \n\n\n\n\n\n            </header>\n\n\n\n            <section class="channels-list">\n\n\n\n              <section  (click)="home()">\n\n                <button ion-button icon-end \n\n                  style="float:right;width:100%;background-color:green; color:white; border-radius: 5px; margin-bottom: 20px; margin-top: 20px">New Doc\n\n                  <ion-icon name="md-add"></ion-icon>\n\n                </button>\n\n                \n\n              </section>\n\n\n\n              <header class="channels-list-header" (click)="home()">\n\n                <span>Documents</span>\n\n              </header>\n\n\n\n             \n\n              \n\n              <ul class="channels-list-text" >\n\n                <div *ngFor="let item of documentsList">\n\n                    <li [ngClass]="(item == documentService.currentDoc) ? \'channel focusable channel-text active \' : \'channel focusable channel-text \' " >\n\n                        <!-- <span class="channel-name">blockusign nda.pdf</span> -->\n\n                        <span (click)="documentSelected($event, item)" style="width:90%">\n\n                          {{ item.fileName }}\n\n                        </span>\n\n                        <!-- <button class="button" role="button" aria-label="Invite" >\n\n                            <ion-icon md="md-trash" (click)="documentRemove(item)"></ion-icon>\n\n                        </button> -->\n\n                        <!-- <button class="button" role="button" aria-label="settings">\n\n                          <svg>\n\n                            <use xlink:href="#icon-channel-settings" />\n\n                          </svg>\n\n                        </button> -->\n\n                        <button ion-button icon-only  style="padding-left: 10px; background: transparent" (click)="presentPopover($event, item)">\n\n                                <ion-icon name="more"></ion-icon>\n\n                        </button>\n\n                      </li>\n\n                </div>\n\n                \n\n\n\n                <!-- <li class="channel focusable channel-text active">\n\n                  <span>my photo release form.pdf</span>\n\n                  <button class="button" role="button" aria-label="Invite">\n\n                    <svg>\n\n                      <use xlink:href="#icon-invite" />\n\n                    </svg>\n\n                  </button>\n\n                  <button class="button" role="button" aria-label="settings">\n\n                    <svg>\n\n                      <use xlink:href="#icon-channel-settings" />\n\n                    </svg>\n\n                  </button>\n\n                </li>\n\n\n\n                <li class="channel focusable channel-text">\n\n                  <span>may lease.pdf</span>\n\n                  <button class="button" role="button" aria-label="Invite">\n\n                    <svg>\n\n                      <use xlink:href="#icon-invite" />\n\n                    </svg>\n\n                  </button>\n\n                  <button class="button" role="button" aria-label="settings">\n\n                    <svg>\n\n                      <use xlink:href="#icon-channel-settings" />\n\n                    </svg>\n\n                  </button>\n\n                </li>\n\n\n\n                <li class="channel focusable channel-text">\n\n                  <span >escrow agreement.pdf</span>\n\n                  <button class="button" role="button" aria-label="Invite">\n\n                    <svg>\n\n                      <use xlink:href="#icon-invite" />\n\n                    </svg>\n\n                  </button>\n\n                  <button class="button" role="button" aria-label="settings">\n\n                    <svg>\n\n                      <use xlink:href="#icon-channel-settings" />\n\n                    </svg>\n\n                  </button>\n\n                </li> -->\n\n\n\n              </ul>\n\n\n\n\n\n\n\n              <!-- <header class="channels-list-header focusable">\n\n                <span>Templates</span>\n\n              </header>\n\n\n\n              <ul class="channels-list-text">\n\n                <li class="channel focusable channel-text ">\n\n                  <span class="channel-name">COMING SOON</span>\n\n                </li>\n\n              </ul>\n\n\n\n              <header class="channels-list-header focusable">\n\n                <span>Analytics</span>\n\n              </header>\n\n              <ul class="channels-list-text">\n\n                <li class="channel focusable channel-text ">\n\n                  <span class="channel-name">COMING SOON</span>\n\n                </li>\n\n              </ul> -->\n\n\n\n              <header class="channels-list-header focusable" style="margin-top:150px">\n\n                <span>Features in progress</span>\n\n              </header>\n\n              <ul class="channels-list-text">\n\n                  <li class="channel focusable channel-text ">\n\n                      <span>Templates</span>\n\n                    </li>\n\n                    <li class="channel focusable channel-text ">\n\n                        <span>Analytics</span>\n\n                      </li>\n\n                <li class="channel focusable channel-text ">\n\n                  <span>Smart Contracts</span>\n\n                </li>\n\n              </ul>\n\n            </section>\n\n\n\n\n\n\n\n            <footer class="channels-footer">\n\n              <!-- <img class="avatar" alt="Avatar" src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png" /> -->\n\n              <img class="avatar" alt="Avatar" [src]="avatar" />\n\n              <div class="channels-footer-details">\n\n                <span class="username">\n\n                  <a (click)="logout()" style="float:right">{{name}} {{ loginState }} </a>\n\n                </span>\n\n                <!-- <span class="tag">#0001</span> -->\n\n              </div>\n\n              <!-- <div class="channels-footer-controls button-group">\n\n                        <button role="button" aria-label="Mute" class="button button-mute"><svg><use xlink:href="#icon-mute" /></svg></button>\n\n                        <button role="button" aria-label="Deafen" class="button button-deafen"><svg><use xlink:href="#icon-deafen" /></svg></button>\n\n                        <button role="button" aria-label="Settings" class="button button-settings"><svg><use xlink:href="#icon-settings" /></svg></button>\n\n                      </div> -->\n\n            </footer>\n\n          </aside>\n\n\n\n\n\n        </main>\n\n      </div>\n\n   \n\n  </ion-menu>\n\n \n\n  <ion-nav [root]="rootPage" main #content swipeBackEnabled="false" class="centerMe">\n\n    <!-- content injected here -->\n\n  </ion-nav>\n\n  <ion-fab left top menuToggle>\n\n    <button ion-fab color="light" color="primary">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n</ion-split-pane>\n\n\n\n<!-- ICONS -->\n\n<div style="visibility: hidden">\n\n  <svg id="icon-friends" viewBox="-289 382 32 27.1"><style id="style3">.st0{fill:#FFFFFF;} .st1{opacity:0.6;}</style><g id="g4145" fill="#fff"><path id="path5" d="M-273 409.1c-4.1 0-6.8-.6-7.9-1.7-.5-.6-.6-1.1-.6-1.3 0-.7.1-2.9.6-3.8.1-.3.5-1 4.5-2.4-1.6-1.4-2.6-4-2.6-7.1 0-4.2 2.3-7 5.9-7.1h.1c3.6.1 5.9 2.8 5.9 7.1 0 3.1-1 5.7-2.6 7.1 4 1.4 4.4 2.1 4.5 2.4.4.9.5 3.1.6 3.8 0 .2 0 .7-.6 1.3-1.1 1.1-3.7 1.7-7.8 1.7zm0-2c5.1 0 6.2-.9 6.4-1.1-.1-1.1-.2-2.3-.3-2.7-.6-.4-2.9-1.3-4.8-1.9l-.7-.2-.1-2 .7-.3c1.7-.6 2.8-3.1 2.8-6.1 0-3.1-1.5-5-3.9-5.1-2.5 0-4 2-4 5.1 0 3 1.1 5.5 2.8 6.1l.7.3-.1 2-.7.2c-1.9.6-4.2 1.5-4.8 1.9-.1.4-.3 1.6-.3 2.7.1.2 1.3 1.1 6.3 1.1z" class="st0"/><g id="g7" class="st1" opacity=".6"><path id="path9" d="M-257 402.4c0-.7-.1-2.9-.6-3.8-.1-.3-.5-1-4.5-2.4 1.6-1.4 2.6-4 2.6-7.1 0-4.2-2.3-7-5.9-7.1h-.1c-1.9 0-3.5.8-4.5 2.2.6.3 1.2.6 1.8 1 .7-.8 1.6-1.3 2.8-1.3 2.4 0 3.9 2 3.9 5.1 0 3-1.1 5.5-2.8 6.1l-.7.3.1 2 .7.2c1.9.6 4.3 1.5 4.8 1.9.1.4.3 1.6.3 2.7-.2.2-1 .8-3.8 1 .1.6.2 1.2.2 2 2.5-.2 4.2-.8 5-1.6.7-.5.7-1 .7-1.2z" class="st0"/><path id="path11" d="M-287 402.3c.1-1.1.2-2.3.3-2.7.6-.4 2.9-1.3 4.8-1.9l.7-.2.1-2-.7-.3c-1.6-.6-2.8-3.1-2.8-6.1 0-3.1 1.5-5 4-5.1 1.2 0 2.1.5 2.8 1.3.5-.4 1.1-.8 1.8-1-1-1.4-2.6-2.2-4.5-2.2h-.1c-3.6 0-5.9 2.8-5.9 7.1 0 3.1 1 5.7 2.6 7.1-4 1.4-4.4 2.1-4.5 2.4-.4.9-.5 3.1-.6 3.8 0 .2 0 .7.6 1.3.8.9 2.5 1.4 5.1 1.6 0-.7.1-1.4.2-2-2.9-.3-3.7-.9-3.9-1.1z" class="st0"/></g></g></svg>\n\n\n\n  <svg id="icon-mute" viewBox="0 0 16 16"><path fill="#5D6063" d="M12.5,8v1c0,2.2-1.8,4-4,4h-1c-2.2,0-4-1.8-4-4V8h-1v1 c0,2.8,2.2,5,5,5v1H7c-0.3,0-0.5,0.2-0.5,0.5C6.5,15.8,6.7,16,7,16h2c0.3,0,0.5-0.2,0.5-0.5C9.5,15.2,9.3,15,9,15H8.5v-1 c2.8,0,5-2.2,5-5V8H12.5z M8,12c1.9,0,3.5-1.6,3.5-3.5v-5C11.5,1.6,9.9,0,8,0C6.1,0,4.5,1.6,4.5,3.5v5C4.5,10.4,6.1,12,8,12z M5.5,3.5C5.5,2.1,6.6,1,8,1c1.4,0,2.5,1.1,2.5,2.5v5C10.5,9.9,9.4,11,8,11c-1.4,0-2.5-1.1-2.5-2.5V3.5z"/></svg>\n\n  \n\n  <svg id="icon-deafen" viewBox="0 0 16 16"><path fill="#5D6063" d="M15.9,9C16,8.7,16,8.3,16,8c0-4.4-3.6-8-8-8C3.6,0,0,3.6,0,8 c0,0.3,0,0.7,0.1,1h0C0,9.2,0,9.3,0,9.5v4C0,14.3,0.7,15,1.5,15h2C4.3,15,5,14.3,5,13.5v-4C5,8.7,4.3,8,3.5,8h-2 C1.3,8,1.2,8,1,8.1C1,8.1,1,8,1,8c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7c0,0,0,0.1,0,0.1C14.8,8,14.7,8,14.5,8h-2C11.7,8,11,8.7,11,9.5 v4c0,0.8,0.7,1.5,1.5,1.5h2c0.8,0,1.5-0.7,1.5-1.5v-4C16,9.3,16,9.2,15.9,9L15.9,9z M1.5,9h2C3.8,9,4,9.2,4,9.5v4 C4,13.8,3.8,14,3.5,14h-2C1.2,14,1,13.8,1,13.5v-4C1,9.2,1.2,9,1.5,9z M15,13.5c0,0.3-0.2,0.5-0.5,0.5h-2c-0.3,0-0.5-0.2-0.5-0.5 v-4C12,9.2,12.2,9,12.5,9h2C14.8,9,15,9.2,15,9.5V13.5z"/></svg>\n\n  \n\n  <svg id="icon-settings" viewBox="0 0 16 16"><path fill="#5D6063" d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"/></svg>\n\n  \n\n  <svg id="icon-dropdown" viewBox="0 0 18 18"><style>.dd{stroke:#ABADAF;stroke-width:2px;stroke-dashoffset:1;stroke-dasharray:inherit}</style><path class="dd" stroke="#FFF" d="M4.5 4.5l9 9" stroke-linecap="round"></path><path class="dd" stroke="#FFF" d="M13.5 4.5l-9 9" stroke-linecap="round"></path></svg>\n\n  \n\n  <svg id="icon-invite" viewBox="0 0 16 16"><path fill="#fff" d="M6.3,3.4L8,1.7v9.8C8,11.8,8.2,12,8.5,12C8.8,12,9,11.8,9,11.5V1.7l1.7,1.7c0.2,0.2,0.5,0.2,0.7,0c0.2-0.2,0.2-0.5,0-0.7L8.9,0.2c0,0,0,0,0-0.1C8.8,0,8.6,0,8.5,0c0,0,0,0,0,0c0,0,0,0,0,0C8.4,0,8.2,0,8.1,0.1c0,0,0,0,0,0.1L5.6,2.7c-0.2,0.2-0.2,0.5,0,0.7C5.8,3.5,6.1,3.5,6.3,3.4z M14,4h-1.5v1h1C13.8,5,14,5.2,14,5.5v9c0,0.3-0.2,0.5-0.5,0.5h-10C3.2,15,3,14.8,3,14.5v-9C3,5.2,3.2,5,3.5,5h1V4H3C2.4,4,2,4.4,2,5v10c0,0.6,0.4,1,1,1h11c0.6,0,1-0.4,1-1V5C15,4.4,14.6,4,14,4z"/></svg>\n\n  \n\n  <svg id="icon-channel-settings" viewBox="0 0 16 16"><path fill="#fff" d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"/></svg>\n\n</div>\n\n'/*ion-inline-end:"N:\code\git\blockusign\BlockUSign.Ionic\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_document_service__["a" /* DocumentService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8__services_blockstack_service__["a" /* BlockStackService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 966:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoinService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(55);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], CoinService);
    return CoinService;
}());

//# sourceMappingURL=coin.service.js.map

/***/ }),

/***/ 967:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCompareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(55);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */]])
    ], CryptoCompareService);
    return CryptoCompareService;
}());

//# sourceMappingURL=cryptocompare.service.js.map

/***/ }),

/***/ 968:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(55);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Jsonp */]])
    ], SlackService);
    return SlackService;
}());

//# sourceMappingURL=slack.service.js.map

/***/ })

},[536]);
//# sourceMappingURL=main.js.map