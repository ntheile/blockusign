export class Document{
    public fileName: string;
    public guid: any;
    public createdAt: Date; 
    public updatedAt: Date; 
    public owner: Array<string>; // ["nicktee.id", ""] 
    public signer: Array<string>; // ["nicktee.id"] 
    public hasAnnotations: boolean;
    public step: number;
    public isCompleted: boolean;

    constructor(){
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
        this.updatedAt = (<any>Date).now();
        this.hasAnnotations = false;
        this.step = 1;
        this.isCompleted = false
    }

}

export class Annotation{
    public annotations: string;
    constructor(){
    
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

