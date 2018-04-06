import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CryptoCompareService } from '../../services/cryptocompare.service'
import { HomePage } from '../home/home';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import PDFAnnotate from 'pdf-annotate';
import annotations from './annotations';
import mockViewport from './mockViewport'



declare var CustomStyle: any;
declare var $: any;
declare var TextLayerBuilder: any;
declare var canvas: any;
declare var scale: any;
declare var rotation: any;

/// https://www.sitepoint.com/custom-pdf-rendering/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  styles: ['list.scss']
})
export class ListPage {

  data: any;

  DOCUMENT_ID = window.location.pathname.replace(/\/$/, '');
  scale: any;
  rotation: any;

  UI = PDFAnnotate;
  page1: any;
  page2: any;
  tooltype: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cryptoCompareService: CryptoCompareService) {

  }


  ionViewDidLoad() {

    this.loadOtherGuy();

    let pdfData = this.loadPDFData();

    this.tooltype = localStorage.getItem(`${this.DOCUMENT_ID}/tooltype`) || 'area';
    if (this.tooltype) {
      this.setActiveToolbarItem(this.tooltype, document.querySelector(`.toolbar button[data-tooltype=${this.tooltype}]`));
    }



    this.page1 = document.querySelector('#pageContainer1 .annotationLayer');
    //this.page2 = document.querySelector('#pageContainer2 .annotationLayer');

    PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());

    var self = this;

    Promise.all([
      PDFAnnotate.getAnnotations(self.DOCUMENT_ID, 1),
      //PDFAnnotate.getAnnotations(self.DOCUMENT_ID, 2)
    ]).then(([ann1, ann2]) => {


      var RENDER_OPTIONS = {
        documentId: self.DOCUMENT_ID,
        pdfDocument: pdfData,
        scale: 1,
        rotate: 0
      };

      //PDFAnnotate.render(1, RENDER_OPTIONS);

      PDFAnnotate.render(self.page1, mockViewport(self.page1), ann1);
      //PDFAnnotate.render(self.page2, mockViewport(self.page2), ann2);





    });



  }


  setActiveToolbarItem(type, button) {
    let active = document.querySelector('.toolbar button.active');
    if (active) {
      active.classList.remove('active');
    }
    if (button) {
      button.classList.add('active');
    }
    if (this.tooltype !== type) {
      localStorage.setItem(`${this.DOCUMENT_ID}/tooltype`, type);
    }
    this.tooltype = type;

    this.UI.UI.enableRect(type);
  }

  handleToolbarClick(e) {
    if (e.target.nodeName === 'BUTTON') {
      this.setActiveToolbarItem(e.target.getAttribute('data-tooltype'), e.target);
    }
  }

  handleClearClick(e) {
    if (confirm('Are you sure you want to throw your work away?')) {
      localStorage.removeItem(`${this.DOCUMENT_ID}/annotations`);
      this.page1.innerHTML = '';

    }
  }




  loadOtherGuy() {
    let pdfData = this.loadPDFData();
    var loadingTask = pdfjsLib.getDocument({ data: pdfData });


    loadingTask.promise.then(function (pdf) {







      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log('Page loaded');


        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('page1');
        var context = (<any>canvas).getContext('2d');
        (<any>canvas).height = viewport.height;
        (<any>canvas).width = viewport.width;



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



  }




  loadPDFData() {
    /*jshint multistr: true */
    var base64pdfData = '\
JVBERi0xLjUKJeTw7fgKOCAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDExOT4+\
CnN0cmVhbQp42mXLuwrCUBCE4d6nmFIh2ezlcDZpgwZJpbCdWHkpJEHE94dEQVBkpvw/PCDgeQLX\
+YzTiDZQdQJN5LUjrvBMLiidiRVxPiy3l2G4F6tj9NjEfy9JyOpvsFt3dHv+AEVDTbZXryYkhjIb\
U05vIJ92v5gAwNUk/wplbmRzdHJlYW0KZW5kb2JqCjEzIDAgb2JqCjw8L1N1YnR5cGUvVHlwZTFD\
L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTIzNz4+CnN0cmVhbQp42n1Sa0xTZxg+h1N7zgTL\
dB51F8+pCU4ZWArDoGbOMJSpjAkMWbwM6UojYKEXWkqFyU3o5W25I5RaLpYKQR1eMLCZVdSMTA2R\
bTHbfqAmbplzidMf7jvdx5Id0O2f+/Mk3/vme59LHpKQSAiSJBd9kJ61PSM5JiU9Kz5pbrC+CDf+\
tS1Us0B4nRDeIIWVYQJHCcslKwmCjFwsIiFEzuG9l+dwtQgLdi4hJCTJmA87lMq3FUplQopObzUW\
Hiwwydeqo+XxGzcmxcoTlMqN8uRijbFQrSqRp6tMBZpilUl8aOUf6dSFGpNVvvadApNJvykuzmKx\
KFTFpQqd8eC70bFyS6GpQJ6lKdUYyzT58lRdiUn+oapYI5/XrJjHFF2x3mzSGOXpunyNsUTUGh5L\
KIitRCqxncggNEQRoSV0RKkoeRERSawm1hDRRLy4TSPSxX02ERFGkIREHOQTk6SCvBTGh9WE3aGW\
UVYJL9hlyI1z+lDyDIkSvRRK8LLuWrBDBeyyZKv2NDSAAxyMrcnW1DL9LaJO267vN5dXGgw9lf1c\
J3Q1tx1jxAswQ96dodCmUXbA4i2zlFUYjb0Vfb193gFOFsqBQCg8QKIVN4XXblOXQ1tYAz19DHL5\
2XN0bjWkcgb0HY3WIxatRRkoE7+CEnASj1f8vZpVO5rP8MJX9Bl38wUOSaR30Lq9eIAHvOrTrHJ9\
qTZrdywwMuERBNDVALoySKLlUyjbRwmjoc3sbI1B+oxn5DkPPeS+BsOjl2A0Iipgprc4OkZ41P4L\
/aC9KIn3oS6rNKm2SMHFo27pM0ZWimLgeLoHv8r4pLLQDpFnOoAuBuZ5glOU8LUgsOPHYJoL0CWO\
HNBqc6AkIuq5P2zHQWSnX7j/z7+oawKGhydgSNRFp1bDOI/8KIj9L97LQowo5lIfujWfLLr+A4X2\
otssSpQi9re7Dx/G3cfLeTz5bwT/Q+VAfhYNPcv4sfj7bPIG5YHtWMbLhLfqfMjcjbZ6yZM30dEJ\
SliMqtimJnBDB/Nk989YuirpTRyJlz2MeYokY0/7WuvBwR0Fp8NWZX4/u/BjyIM8v35MG4RJ+JJx\
dbOtKOrHUxfgFnyR5sISsTqD+IBXuHcWrZwhi77/NUihncIs22/tMZnLrSazr/xEf4/vBIcX40yx\
NVNtR/fxs9H0ntrNGSKN3mX2tLoGWmGQ6Tly3GT+rNKsHjMEp4M37nFCDT3XS7F5Z8kn4tl1oZ0s\
Dq9eYKAn2+vFI8O0xtaQJubhd4/BQGAM/HN5pNmazou2c+t8QuK856GblJCCili0VPEHJjGpWIOX\
4iUPYhCJyAe/oyUczsV57H5QD5rOG8ft12AMLrovB8Z7T58/FYRxOGf0Fwzvhx2ghXzHLv0+3Sd5\
5RqxsgjXeYUNHnJgBFWPUOi6sIn1OV31nA2czqpKu622xm47dCbXdRgYTKkzM3mIf1I2VH/jSL+t\
z9pV1W+Gg4yqdHcclwjaKet9uwdcdcDUOZ0WHkfRVpezhWsGl6u5raW929/S0av/3HANmEcTV37i\
Iag/eaSzeLigVdWW3bnNA98wAc/Vx9yf0LLGfcjV0OxsBKYdGo/zsgqv8F4n0rV5vFKc104HFk6E\
ezsiIia6IhZxCyVWXcRL6MrSfwAyOW3mCmVuZHN0cmVhbQplbmRvYmoKMTUgMCBvYmoKPDwvU3Vi\
dHlwZS9UeXBlMUMvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAzNDM+PgpzdHJlYW0KeNpjZGBh\
YWBkZOT19Hd1dHTTdvYNMjQACZgm/+771fqzifWHNMMPGcYfskw/5Jh/iLPIMjAwPBcEkU/4QeQD\
ARCpCiQYzYUYWBgZOUqrOg0MjPUMDIyc8wsqizLTM0oUNJI1FQwtLc11FIwMDCwVHHNTizKTE/MU\
fBNLMlJzE0uAnByF4PzkzNSSSgUNm4ySkgIrff3y8nK9xNxivfyidDtNHYXyzJIMhaDU4tSistQU\
Bbf8vBIFv8TcVAWwm/XApHN+bkFpSWqRgm9+SmpRHtBRjIZA5wkxMDEysnj/6OD70dG96seGVdvn\
M34vuMr8fddPEdHF3b0lcr7ext3Z3Rw57PO7j3XvX8rxZxZ7eke9oVx2Dtu6vkfdmzc/6l7Ho7Iq\
m92wY9oGeb7ShT+c53zPmzZxIdvvpOnsq7gucC+cwsNzYT4PrxwXi/l8Hs7vD0UAaFtzGAplbmRz\
dHJlYW0KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9PYmpTdG0vTiAxMy9GaXJzdCA4NC9GaWx0ZXIv\
RmxhdGVEZWNvZGUvTGVuZ3RoIDY4OT4+CnN0cmVhbQp42qWTbW/aMBDH3+9T3LuCqsYPsZ24qpAC\
DBUNVgTtNonmRZq4kBUSlJit26ffOWnZ6Dqp0oSIz/bd33e/syVQ0MAEB8aAMwE+cI4TClwHwMGX\
EhgIFQDjIAVDVwh8XMEvrikIJQU0KEYwHBkGX1yQ6x87Q6KiKC1Z7O+sm03y4oH0yyoz1ZLiqSwm\
AzSYMyIMWZCb+dj9O2trd/U5Iavcrvd3Xlpuybb8mW82Cdll997XmnR7PTI3qV1y5nt+KEEJ6TGF\
uYc45zhXytNMx73eO5QelYV1g0ubwpyMOKaMBqrMqjJdGLsks+GIXJtHS8bbZGUG7dBvh7HTWUoX\
Eju9uanLfZWaGtE5vabaGTripzKFdfjc+gDPxWm9DJvQFkjtSDeHv3sG5UJr9N67UPIhz+ql30ZM\
TZYn/fKxIaawBYHmT0UNKpPYsupMkmvzBb4jK1ijWFWZe9gl6QNqdl152T41VSf7liO77SPcdjhl\
PhVU3na7rUheFsPEms7w3G1hCxn3/YAFp1SfUHrSbc+72pkiSp1zmxwZ5TZuUp+WmSE3tbna201e\
YCVNPc8QmgoHiU025cph5EJ7Cneex7f+Aqoaf0W55wAqja1+4aN46PE3KwpUFIcZD6QXHuUlZHjI\
0JfaEzFeAkrjQ9/cvTrcb7fCyOc8s+vaPZYWUVXbwTqpQAgySZ5sxiTpJ7VpwifT+eUsOh1M5yxo\
BIemTqt8h611z+v4ohzvI9XdpclXawsq9ElUp+7uKS2I83H2GdOSjBF9nkbFamOAkoU1208gfTLa\
JKsaVKPZd1fszPfhjONz1kJCIHTcbI3yjfGBPbUcFz4mW3OU9Yv8/gFEvASifwNB+8BjfPU+ikaN\
Mv2LR/D/PMSrPJR+hYegLQ9GqYZA0iMg8hjIn2ljgr8AwP95QQplbmRzdHJlYW0KZW5kb2JqCjE4\
IDAgb2JqCjw8L1R5cGUvWFJlZi9Sb290IDEgMCBSL0luZm8gMiAwIFIvSURbPDIzOTFkNjRjNTJl\
ZGNiNjg0NDU0MWY3YzljMzM0YjQzPjwyMzkxZDY0YzUyZWRjYjY4NDQ1NDFmN2M5YzMzNGI0Mz5d\
L1NpemUKMTkvV1sxIDIgMl0vRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA2ND4+CnN0cmVhbQp4\
2iXJyw2AIBQF0bnIR9CE/ld0YCHW4x5z8zYnkwywd6JSTTGH6Qa1Ba5LzCiZbJJp4o1xqnxRw9wa\
D/wujAXqCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjI3MzQKJSVFT0YK';

    function base64ToUint8Array(base64) {
      var raw = atob(base64);
      var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
      for (var i = 0, len = raw.length; i < len; ++i) {
        uint8Array[i] = raw.charCodeAt(i);
      }
      return uint8Array;
    }
    return base64ToUint8Array(base64pdfData);
  }

  setupAnnotations(page, viewport, canvas, $annotationLayerDiv) {
    var canvasOffset = $(canvas).offset();
    var promise = page.getAnnotations().then(function (annotationsData) {
      viewport = viewport.clone({
        dontFlip: true
      });

      for (var i = 0; i < annotationsData.length; i++) {
        var data = annotationsData[i];
        var annotation = PDFJS.Annotation.fromData(data);
        if (!annotation || !annotation.hasHtml()) {
          continue;
        }

        var element = annotation.getHtmlElement(page.commonObjs);
        data = annotation.getData();
        var rect = data.rect;
        var view = page.view;
        rect = PDFJS.Util.normalizeRect([
          rect[0],
          view[3] - rect[1] + view[1],
          rect[2],
          view[3] - rect[3] + view[1]]);
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
  }


}
