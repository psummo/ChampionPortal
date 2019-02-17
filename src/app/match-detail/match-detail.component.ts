import {Component, OnInit} from '@angular/core';
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
  matchId: number;
  matchSelected: Match;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private  teamService: TeamService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = +params.get('id');
    });
    this.teamService.getAllTeam().subscribe((responseTeam) => {
      this.matchService.getMatchById(this.matchId).subscribe((responseMatch) => {
          this.matchSelected = responseMatch;
        }, (error1 => {
        })
      );
    });
  }
}
