import { Injectable } from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListVerbsService {
    private verbs: Array<any>;
    private family: Array<any>;
    private verbsSubject: BehaviorSubject<Array<any>>;
    private statusLoading: string;
    private statusLoadingFamily: string;

    constructor(private papa: Papa, private http: HttpClient) {
        this.verbs = [];
        this.family = [];
        this.verbsSubject = new BehaviorSubject(this.verbs);
        this.statusLoading = 'none';
        this.statusLoadingFamily = 'loading';
        this.http.get('/assets/familyVerbs.csv', {responseType: 'text'}).subscribe(
            (data) => {
                const options = {
                    complete: (results, file) => {
                        for(const result of results.data) {
                            this.family[result.codeFamily] = result;
                        }
                    },
                    header: true,
                    skipEmptyLines: true
                };

                this.papa.parse(data, options);
                console.log('Next family !');
            },
            (error) => {
                console.log(error);
            },
            () => {
                this.statusLoadingFamily = 'completed';
                console.log('Completed family !');
            }
        );
    }

    emitListVerbs() {
        this.verbsSubject.next(this.verbs);
    }

    getStatusLoading(): boolean {
        return ((this.statusLoading === 'completed') && (this.statusLoadingFamily === 'completed'));
    }

    readListVerbs() {
        return this.verbs;
    }

    readFamilyVerbs() {
        return this.family;
    }

    getListVerbs() {
        this.statusLoading = 'loading';
        this.http.get('/assets/IrregularVerbs.csv', {responseType: 'text'}).subscribe(
            (data) => {
                const options = {
                    complete: (results, file) => {
                        this.verbs = results.data;
                    },
                    header: true,
                    skipEmptyLines: true
                };

                this.papa.parse(data, options);
                console.log('Next verbs !');
            },
            (error) => {
                console.log(error);
            },
            () => {
                this.statusLoading = 'completed';
                this.emitListVerbs();
                console.log('Completed verbs !');
            }
        );

        return this.verbsSubject.asObservable();
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    getRandomListVerbs(nbVerbs: number = 10) {
        let stockVerbs = this.verbs;
        let randomVerbs: Array<any> = [];

        if (this.verbs.length < nbVerbs) {
            return this.verbs;
        }
        for (let i = 0; i < nbVerbs; i++) {
            const j = this.getRndInteger(0, stockVerbs.length - 1);

            randomVerbs.push(stockVerbs.splice(j, 1)[0]);
        }
        return randomVerbs;
    }
}
