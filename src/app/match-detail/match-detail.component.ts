import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../services/team.service';
import {MatchService} from '../services/match.service';
import {Match} from '../models/match';
import {finalize} from 'rxjs/operators';
import {Headtohead} from '../models/headtohead';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  matchId: number;
  matchSelected: Match;
  loader = true;
  headToHeadSelected: Headtohead;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private  teamService: TeamService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchId = +params.get('id');
    });
    this.teamService.getAllTeam().subscribe((responseTeam) => {
      this.matchService.getMatchById(this.matchId).pipe(finalize(() => {
        this.loader = false;
      })).subscribe((responseMatch) => {
          this.matchSelected = responseMatch[1];
          this.headToHeadSelected = responseMatch[0];
        }, (error1 => {
        })
      );
    });
  }
}
