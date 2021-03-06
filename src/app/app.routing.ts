import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DataTableComponent } from './components/datatable/datatable.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ProfileComponent } from './components/profile/profile.component';
// import { HomeComponent } from './home/index';
// import { AuthGuard } from './_guards/index';


import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [

     { path: 'login', component: LoginComponent },
     { path: 'table', component: DataTableComponent },
     { path: 'charts', component: ChartsComponent },
     { path: 'profile', component: ProfileComponent },
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);


/*

 RouterModule.forRoot([
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
         path: 'detail/:id',
        component: HeroDetailComponent
      }
    ])

*/
