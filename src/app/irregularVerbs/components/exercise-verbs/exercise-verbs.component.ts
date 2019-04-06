import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ListVerbsService} from '../../services/list-verbs.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-exercise-verbs',
    templateUrl: './exercise-verbs.component.html',
    styleUrls: ['./exercise-verbs.component.scss']
})
export class ExerciseVerbsComponent implements OnInit {
    private exerciseVerbs: Array<any>;
    exerciseForm: FormGroup;
    verbs: FormArray;
    private nbVerbsWrong = 0;
    submitDone = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private listVerbs: ListVerbsService,
        private fb: FormBuilder
        ) {
        this.router.events.subscribe(
            value => {
                console.log(value);
            }
        );
    }

    createVerb(v: any): FormGroup {
        if (v.preteritSingular === v.preteritPlural) {
            return this.fb.group({
                verb: this.fb.control(v.verb),
                traslate: this.fb.control(v.translate),
                preterit: this.fb.control('', [Validators.required, Validators.pattern('^' + v.preteritSingular + '$')]),
                pastParticiple: this.fb.control('', [Validators.required, Validators.pattern('^' + v.pastParticiple + '$')])
            });
        } else {
            return this.fb.group({
                verb: this.fb.control(v.verb),
                traslate: this.fb.control(v.translate),
                preteritSingular: this.fb.control('', [Validators.required, Validators.pattern('^' + v.preteritSingular + '$')]),
                preteritPlural: this.fb.control('', [Validators.required, Validators.pattern('^' + v.preteritPlural + '$')]),
                pastParticiple: this.fb.control('', [Validators.required, Validators.pattern('^' + v.pastParticiple + '$')])
            });
        }
    }

    initForm(lv: Array<any>) {
        this.exerciseForm = this.fb.group({
            verbs: this.fb.array([])
        });
        this.verbs = this.exerciseForm.get('verbs') as FormArray;
        for (const v of lv) {
            this.verbs.push(this.createVerb(v));
        }
        // console.log(this.exerciseForm);
        // console.log(this.route);
    }

    ngOnInit() {
        this.exerciseVerbs = this.listVerbs.getRandomListVerbs(+this.route.snapshot.paramMap.get('nb'));
        // this.exerciseVerbs = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) =>
        //         this.listVerbs.getRandomListVerbs(+params.get('nb')))
        // );
        this.initForm(this.exerciseVerbs);
    }

    onSubmitForm() {
        this.submitDone = true;
        const tmp = this.exerciseForm.get('verbs') as FormArray;

        this.nbVerbsWrong = this.getAbstractsControls(tmp).filter(
            (c) => {
                return c.status === 'INVALID';
            }
        ).length;

        if (this.exerciseForm.invalid) {
            this.toggleVerbsOnError();
        }
    }

    toggleVerbsOnError( turnOn: boolean = false, putClass: string = 'verb-onerror') {
        if (turnOn) {
            const inputs = document.querySelectorAll('input.verb.ng-invalid');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add(putClass);
            }
        } else {
            const inputs = document.querySelectorAll('input.verb');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].classList.remove('verb-onerror', 'verb-corrected');
            }
        }
    }

    onShowError() {
        this.toggleVerbsOnError(true);
    }

    getAbstractsControls(fa: FormArray): Array<any> {
        const aac = [];

        for (let i = 0; i < fa.length; i++) {
            aac.push(fa.at(i));
        }
        return aac;
    }

    onCorrect() {
        this.toggleVerbsOnError();
        for (let i = 0; i < this.verbs.length; i++) {
            if (this.exerciseVerbs[i].preteritSingular === this.exerciseVerbs[i].preteritPlural) {
                if (this.verbs.at(i).get('preterit').invalid) {
                    this.verbs.at(i).get('preterit').setValue(this.exerciseVerbs[i].preteritSingular);
                }
            } else {
                    if (this.verbs.at(i).get('preteritSingular').invalid) {
                        this.verbs.at(i).get('preteritSingular').setValue(this.exerciseVerbs[i].preteritSingular);
                    }
                    if (this.verbs.at(i).get('preteritPlural').invalid) {
                        this.verbs.at(i).get('preteritPlural').setValue(this.exerciseVerbs[i].preteritPlural);
                    }
            }
            if (this.verbs.at(i).get('pastParticiple').invalid) {
                this.verbs.at(i).get('pastParticiple').setValue(this.exerciseVerbs[i].pastParticiple);
            }
        }
        this.toggleVerbsOnError(true, 'verb-corrected');
    }
}
