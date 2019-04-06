import {Component, OnInit} from '@angular/core';
import {ListVerbsService} from './irregularVerbs/services/list-verbs.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'IrregularVerbs';

    private verbs: Array<any>;
    private verbsSubcription: Subscription;
    statusLoading: boolean;

    constructor(private listVerbs: ListVerbsService) {
        this.statusLoading = this.listVerbs.getStatusLoading();
        this.verbsSubcription = this.listVerbs.getListVerbs().subscribe(
            data => {
                this.verbs = data;
                this.statusLoading = this.listVerbs.getStatusLoading();
            },
            (error) => {
                console.log(error);
            },
            () => {
                console.log(this.verbs);
                console.log(this.listVerbs.getRandomListVerbs());
            }
        );
    }

    ngOnInit(): void {
    }
}
