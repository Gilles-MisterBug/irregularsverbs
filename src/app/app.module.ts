import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PapaParseModule} from 'ngx-papaparse';
import {HttpClientModule} from '@angular/common/http';
import { ListVerbsComponent } from './irregularVerbs/components/list-verbs/list-verbs.component';
import { HeaderComponent } from './irregularVerbs/components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExerciseVerbsComponent } from './irregularVerbs/components/exercise-verbs/exercise-verbs.component';
import { HomeComponent } from './irregularVerbs/components/home/home.component';
import { LinksComponent } from './irregularVerbs/components/links/links.component';


@NgModule({
    declarations: [
        AppComponent,
        ListVerbsComponent,
        HeaderComponent,
        ExerciseVerbsComponent,
        HomeComponent,
        LinksComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PapaParseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
