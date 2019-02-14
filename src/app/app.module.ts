import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule, Routes} from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  {path: '',  component: MatchListComponent},
  {path: 'match/:id', component: MatchDetailComponent},
  {path: 'team/:id', component: TeamDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MatchListComponent,
    MatchDetailComponent,
    TeamDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
