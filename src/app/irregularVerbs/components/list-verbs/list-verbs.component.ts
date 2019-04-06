import { Component, OnInit } from '@angular/core';
import {ListVerbsService} from '../../services/list-verbs.service';

@Component({
    selector: 'app-list-verbs',
    templateUrl: './list-verbs.component.html',
    styleUrls: ['./list-verbs.component.scss']
})
export class ListVerbsComponent implements OnInit {
    verbs: Array<any>;
    family: Array<any>;
    viewFamily: string;

    constructor(private listVerbs: ListVerbsService) {
        this.verbs = this.listVerbs.readListVerbs();
        // console.log(this.verbs);
        this.family = this.listVerbs.readFamilyVerbs();
        // console.log(this.family);

        this.viewFamily = this.family[0].codeFamily;
        // console.log(this.viewFamily);
    }

    ngOnInit() {
    }

}
