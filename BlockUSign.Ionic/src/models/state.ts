import * as Automerge from 'automerge/dist/automerge.js';

export class State {


    // 1) Init
    docInit() {
        // init doc
        let docMine = Automerge.init();
        return docMine;
    }
    // 1) Or Get Mine
    docLoadMine(mine) {
        return Automerge.load(mine);
    }

    // 2) Get Theirs
    docLoadTheirs(theirs) {
        return Automerge.load(theirs);
    }

    // 3) Merge theirs into mine, and sort by updatedAt date
    docMerge(mine, theirs) {
        return Automerge.merge(mine, theirs);
    }

    // 4) Save the merged state
    docSave(doc) {
        return Automerge.save(doc);
    }

    // 5) Add my changes
    docEdit(mine, commit, property, data) {
        mine = Automerge.change(mine, commit, doc => {
            doc[property] = data;
        });
        return mine;
    }

    docHistory(doc){
        return Automerge.getHistory(doc).map(state => [state.change.message, state.snapshot.cards.length])
    }

    constructor() {

    }

}

//let state = new State();

