import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
            private router: Router,
            private dialogService: DialogService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('AuthGuard canActivate...');
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log('AuthGuard canActivate...: OK');
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log('AuthGuard canActivate...: KO ... to Login');
        this.dialogService
        .confirm('Operazione non consentita', 'Effettuare prima il login')
        .then(res => { 
            console.log('Dialog return:', res); 
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        })
        .catch( function(err) { console.log(err); });

    }
}