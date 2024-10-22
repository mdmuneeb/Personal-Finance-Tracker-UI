import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Public/login/login.component';
import { LandingPageComponent } from './Components/Public/landing-page/landing-page.component';
import { UserLayoutComponent } from './Components/User/user-layout/user-layout.component';
import { SidenavbarComponent } from './Components/User/sidenavbar/sidenavbar.component';

export const routes: Routes = [
  {path: 'loginPage', component: LoginComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: 'UserPage', component: SidenavbarComponent},

];
