export class Document{
    public fileName: string;
    public documentKey: string; // the key to decrypt the doc
    public guid: any;
    public createdAt: Date; 
    public updatedAt: Date; 
    public owner: Array<string>; // ["nicktee.id"] 
    public signer: Array<string>; // ["nicktee.id || emailAddress"] //  for now just 1 signer, in the future allow users without a blockstack id to sign, there name has no .id in it like ["Alice Smith"]
    public reviewer: Array<string>; // ["auditor.id"] owners and signers are automatically reviewers
    public hasAnnotations: boolean;
    public step: string; // Annotate, Sign, Final
    public isCompleted: boolean;
    public annotationsRequired: Array<any>; // [ {"Sign": "nicktee.id"}, { Sign: "blockusign1.id" } ]
    
    public pathAnnotatedDoc: string; // fully qualified gaia path to the Annotated doc , this is usually in the owners storage bucket
    //public pathSignedDoc: string; // fully qualified gaia path to the Signed doc, this is usually in the signers bucket
    public paths: Array<NameStorageMapping>;

    constructor() {
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
        this.updatedAt = (<any>Date).now();
        this.hasAnnotations = false;
        this.step = "Annotate";
        this.isCompleted = false
    }
}

export class Log {
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

export class NameStorageMapping {
    public name?: string; // @todo required, but there is a potential for dups if two people choose the same name, also could fail if they edit user name. small tradoff tho for user usability, until the blockstack registrar is created
    public userId?: string; // @todo optional, to allow for non registerd users without ID's
    public email?: string; // optional, for users without user id's
    public appPublicKey?: string; // optional, the public key for the user for the app via blockstack
    public pathToStorage: string;
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

