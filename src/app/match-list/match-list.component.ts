import { Component, OnInit } from '@angular/core';
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
  constructor(private matchService: MatchService, private teamService: TeamService) {}

    ngOnInit() {
        this.teamService.getAllTeam().subscribe((success) => {
          this.matchService.getMatchList().subscribe((response) => {
            this.matchList = response;
            }, (error1 => {
              console.log(error1);
            })
          );
          this.teamList = success;
        });
      }
    }

