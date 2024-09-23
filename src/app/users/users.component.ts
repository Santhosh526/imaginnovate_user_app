import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  errorMsg: string = '';

  constructor(
    private githubService: GithubService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.spinner.show();
    this.githubService.getUsers().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.users = data;
        } else {
          this.errorMsg = 'No users found.';
        }
        this.spinner.hide();
      },
      (error) => {
        this.errorMsg = 'Failed to load users. Please try again later.';
        this.spinner.hide();
      }
    );
  }
}
