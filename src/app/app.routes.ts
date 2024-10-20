import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Public/login/login.component';
import { LandingPageComponent } from './Components/Public/landing-page/landing-page.component';

export const routes: Routes = [
  {path: 'loginPage', component: LoginComponent},
  {path: 'landingPage', component: LandingPageComponent}
];
