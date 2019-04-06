import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListVerbsComponent} from './irregularVerbs/components/list-verbs/list-verbs.component';
import {ExerciseVerbsComponent} from './irregularVerbs/components/exercise-verbs/exercise-verbs.component';
import {HomeComponent} from './irregularVerbs/components/home/home.component';
import {LinksComponent} from './irregularVerbs/components/links/links.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'iv/list', component: ListVerbsComponent },
  { path: 'iv/exercise/:nb', component: ExerciseVerbsComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
