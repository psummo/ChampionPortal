import {Component, OnInit} from '@angular/core';
import {Match} from './models/match';
import {MatchService} from './services/match.service';
import {TeamService} from './services/team.service';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  matchesList: Match[] = [];

  constructor(private matchService: MatchService, private teamService: TeamService, private localService: LocalStorageService) {
  }
  ngOnInit(): void {
    this.localService.matchesNeedUpdate();
    this.teamService.getAllTeam().subscribe((success) => this.matchService.getMatchList());
  }
}
