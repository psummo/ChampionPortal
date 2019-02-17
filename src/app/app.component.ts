import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Match} from './models/match';
import {NavigationStart, Router} from '@angular/router';
import {MatchService} from './services/match.service';
import {TeamService} from './services/team.service';

export let browserRefresh = false;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  matchesList: Match[] = [];

  constructor(private matchService: MatchService, private teamService: TeamService) {
  }
  ngOnInit(): void {
    this.teamService.getAllTeam().subscribe((success) => this.matchService.getMatchList());
  }
}
