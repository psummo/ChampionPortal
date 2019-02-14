import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../services/team.service';
import {Team} from '../models/team';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  idTeam: number;
  matchSelected: Match;
  constructor(private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(paramMap => {
        this.idTeam = +paramMap.get('id');
      });
    this.matchService.getMatchById(this.idTeam).subscribe((response) => this.matchSelected = response);
  }

}
