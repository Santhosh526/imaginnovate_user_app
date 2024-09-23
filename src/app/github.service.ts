import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  // Fetch the list of users from GitHub API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users', error);
        return throwError(error);
      })
    );
  }

  // Fetch user details by username
  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`).pipe(
      catchError((error) => {
        console.error('Error fetching user details', error);
        return throwError(error);
      })
    );
  }

  // Fetch followers of the user
  getUserFollowers(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${username}/followers`).pipe(
      catchError((error) => {
        console.error('Error fetching followers', error);
        return throwError(error);
      })
    );
  }
}
