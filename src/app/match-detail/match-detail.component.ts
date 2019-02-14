import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../services/team.service';
import {Team} from '../models/team';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  matchId: number;
  matchSelected: Match;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private  teamService: TeamService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = +params.get('id');
    });
    this.matchService.getMatchById(this.matchId).subscribe((response) => {
        this.matchSelected = response;
        console.log('faccio getMatchById', this.matchSelected);
      }, (error1 => {
         console.log(error1);
      })
    );
  }
}
