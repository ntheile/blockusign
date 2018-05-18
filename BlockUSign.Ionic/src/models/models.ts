export class Document{
    public fileName: string;
    public path: string; // fully qualified gaia path to the doc 
    public documentKey: string; // the key to decrypt the doc
    public guid: any;
    public createdAt: Date; 
    public updatedAt: Date; 
    public owner: Array<string>; // ["nicktee.id"] 
    public signer: Array<string>; // ["nicktee.id", "dude.id"] // allow users without a blockstack id to sign, there name has no .id in it like ["Alice Smith"]
    public reviewer: Array<string>; // ["auditor.id"] owners and signers are automatically reviewers
    public hasAnnotations: boolean;
    public step: number;
    public isCompleted: boolean;
    public annotationsRequired: Array<any>; // [ {"Sign": "nicktee.id"}, { Sign: "blockusign1.id" } ]

    constructor(){
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
        this.updatedAt = (<any>Date).now();
        this.hasAnnotations = false;
        this.step = 1;
        this.isCompleted = false
    }

}

export class Log{
    public guid: any;
    public createdAt: Date; 
    public updatedAt: Date; 
    public messages: Array<Message>;

    constructor(){
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
        this.updatedAt = (<any>Date).now();
    }

}

export class Message {
    public guid: any;
    public createdAt: Date; 
    public updatedAt: Date; 
    public message: string;
    public createdBy: string;
    public createdByName: string;

    constructor(){
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
        this.updatedAt = (<any>Date).now();
    }

}

// This is an svg representing the annotations
export class Annotation{
    public annotations: string;
    constructor(){
    
    }
}

// An array of annotation types, so far just signatures, maybe down the line support Number. OpenText etc...
export class AnnotationTypes{
    constructor(){
        return ["Sign"];
    }
}

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

