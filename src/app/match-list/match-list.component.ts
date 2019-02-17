import {Component, OnInit} from '@angular/core';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';
import {TeamService} from '../services/team.service';
import {Team} from '../models/team';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})

export class MatchListComponent implements OnInit {

  matchList: Match[] = [];
  teamList: Team[] = [];
  selectedTeamId: number;
  // MAP DAY -> MATCH ARRAY
  matchDayMap = new Map<number, Match[]>();

  // TODO SISTEMARE VERSIONE MOBILE: SECONDA SQUADRA DI UN MATCH VA INVERTITA AL PUNTEGGIO
  constructor(private matchService: MatchService, private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getAllTeam().subscribe((success) => {
      this.matchService.getMatchList().subscribe((response) => {
          this.matchList = response;
          this.convertArrayInMap();
        }, (error1 => {
          console.log(error1);
        })
      );
      this.teamList = success;
    });
  }

  convertArrayInMap() {
    for (const day of this.matchList) {
      if (this.matchDayMap.get(day.matchDay)) {
        this.matchDayMap.get(day.matchDay).push(day);
      } else {
        const tmpArr: Match[] = [];
        tmpArr.push(day);
        this.matchDayMap.set(day.matchDay, tmpArr);
      }
    }

    console.log(this.matchDayMap);
  }

}
