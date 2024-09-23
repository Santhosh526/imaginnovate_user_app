import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';
  followersChart: any;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.fetchUserDetails(username);
  }

  fetchUserDetails(username: string | null): void {
    if (username) {
      this.spinner.show();
      this.githubService.getUser(username).subscribe(
        (data) => {
          this.user = data;
          this.spinner.hide();
        },
        (error) => {
          this.errorMessage = 'User not found.';
          this.spinner.hide();
        }
      );
      this.fetchFollowers(username);
    }
  }

/*   fetchFollowers(username: string | null): void {
    if (username) {
      this.githubService.getUserFollowers(username).subscribe((followers) => {
        const followerNames = followers.map((f: any) => f.login);
        const followerCounts = followers.map(() => 1);

        this.followersChart = new Chart('followersChart', {
          type: 'bar',
          data: {
            labels: followerNames,
            datasets: [
              {
                label: 'Followers',
                data: followerCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    }
  } */
    fetchFollowers(username: string | null): void {
      if (username) {
        this.githubService.getUserFollowers(username).subscribe((followers) => {
          const followerNames = followers.map((f: any) => f.login);
          const followerCounts = followers.map(() => 1);
    
          // Wrap chart initialization in setTimeout to allow DOM update
          setTimeout(() => {
            if (this.followersChart) {
              this.followersChart.destroy();  // Destroy previous chart if exists
            }
    
            this.followersChart = new Chart('followersChart', {
              type: 'bar',
              data: {
                labels: followerNames,
                datasets: [
                  {
                    label: 'Followers',
                    data: followerCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }, 0); 
        });
      }
    }
}
