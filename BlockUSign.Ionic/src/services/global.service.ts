import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {


    public GaiUrl: string;

    constructor() { 

        this.GaiUrl = "http://21312";

    }
}