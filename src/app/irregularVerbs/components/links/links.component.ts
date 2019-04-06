import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
    links: Array<any>;

    constructor(private http: HttpClient) {
        this.http.get('/assets/link/learnenglish.json')
            .subscribe(
                (jsonLinks: Array<any>) => {
                    this.links = jsonLinks;
                    console.log(this.links);
                }
            )
        ;
    }

    ngOnInit() {
    }

}
