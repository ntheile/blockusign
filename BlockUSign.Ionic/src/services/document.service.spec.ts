import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from '../app/app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  DocumnetServiceMock,
  BlockStackServiceMock
} from '../../test-config/mocks-ionic';
import { DocumentService } from '../services/document.service';
import { BlockStackService } from '../services/blockstack.service';
declare let describe: any;
declare let beforeEach: any;
declare let it: any;
declare let expect: any;
import * as jsonld from "jsonld/dist/node6/lib/jsonld";
// import * as ParserJsonld from '@rdfjs/parser-jsonld';
// import * as stream from 'stream';
import * as rdf from 'rdf-ext';



describe('DocumentService', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: DocumentService, useClass: DocumnetServiceMock },
        { provide: BlockStackService, useClass: BlockStackServiceMock }
      ]
    })
  }));

  beforeEach(() => {
     fixture = TestBed.createComponent(MyApp);
     component = fixture.componentInstance;
  });

  it('should be test json-ld parser', () => {
    
    // const example = {
    //     'http://example.org/predicate': ['object1', 'object2']
    //   }
    //   // create JSON-LD parser instance
    //   const parser = new rdf.JsonLdParser({factory: rdf})
    //   // forward the JSON-LD example string to the parser
    //   const quadStream = parser.import(rdf.stringToStream(JSON.stringify(example)))
    //   // create a new dataset and import the quad stream into it (reverse pipe) with Promise API
    //   rdf.dataset().import(quadStream).then((dataset) => {
    //     // loop over all quads an write them to the console
    //     dataset.forEach((quad) => {
    //       console.log(quad.toString())
    //     })
    //   })
    

    // const parserJsonld = new ParserJsonld();
    // const input = new stream.Readable({
    //   read: () => {
    //     input.push(`{
    //       "@context": "http://schema.org/",
    //       "@type": "Person",
    //       "name": "Jane Doe",
    //       "jobTitle": "Professor",
    //       "telephone": "(425) 123-4567",
    //       "url": "http://www.janedoe.com"
    //     }`);
    //     input.push(null);
    //   }
    // });
    
    // const output = parserJsonld.import(input);
    
    // output.on('data', quad => {
    //   console.log(`${quad.subject.value} - ${quad.predicate.value} - ${quad.object.value}`);
    // })

    expect(true).toBe(true);

  });

});
