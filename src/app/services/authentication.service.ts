import { Injectable } from '@angular/core';
import { Http, Headers, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { Logger } from './logger.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

// login and profile management

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(
            private http: Http,
            private logger: Logger
        ) {
        // set token if saved in local storage
        const  ProfileData = JSON.parse(localStorage.getItem(environment.profileStorageId));
        this.token = ProfileData && ProfileData.token;
    }

    login(credentials: any): Observable<boolean> {
        return this.http.post(environment.apiLoginLDAP, JSON.stringify(credentials))
            .map((response: Response) => {
                    console.log('AuthenticationService:map');
                    console.log(response);
                    console.log(response.json());
                // login successful if there's a jwt token in the response
                    if ( response.status < 200 || response.status >= 300 ) {
                        console.log('...map...ERROR.......:' , response.status);
                        throw new Error('This request has failed ' + response.status);
                    }
                                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(environment.profileStorageId, JSON.stringify(response.json()));
                    // return true to indicate successful login
                    return true;
                });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem(environment.profileStorageId);
    }

    getCredentials(): string {
        // return this.credentials;
        return '';
    }

    setCredentials(credentials: string) {
        // this.credentials = credentials;
        return '';
    }

    getProfile(): Observable<any> {
       this.logger.info('AuthenticationService:getProfile:1');
       return this.http.get(environment.apiProfile)
                .map((response: Response) => {
                    console.log('AuthenticationService:getProfile:2', response);
                    // login successful if there's a jwt token in the response
                    if ( response.status < 200 || response.status >= 300 ) {
                        console.log('...map...ERROR.......:' , response.status);
                        throw new Error('This request has failed ' + response.status);
                    }
                    // response = response.json();
                    return response.json();
                });
    }

    isAuthenticated(): boolean {
        // $log.info('AuthService isAuthenticated .. check JWT', !!$localStorage.JWT);
        return !!localStorage.getItem(environment.profileStorageId);
    }

    isAdmin(): boolean {
        // TODO
        this.logger.info('AuthenticationService:isAdmin');
        if ( localStorage.userData ) {
          return localStorage.userData.isAdmin;
        }
    }


    authorizedRoles(): boolean {
        // $log.info('AuthService isAuthorized');
      /*if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (this.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
        */
        return true;
    }

}
