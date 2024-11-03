import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Public/login/login.component';
import { LandingPageComponent } from './Components/Public/landing-page/landing-page.component';
import { UserLayoutComponent } from './Components/User/user-layout/user-layout.component';
import { SidenavbarComponent } from './Components/User/sidenavbar/sidenavbar.component';
import { DashboardComponent } from './Components/User/dashboard/dashboard.component';
import { TransactionFormComponent } from './Components/User/transaction-form/transaction-form.component';
import { TransactionListComponent } from './Components/User/transaction-list/transaction-list.component';
import { GoalTransactionComponent } from './Components/User/goal-transaction/goal-transaction.component';
import { RepeatedTransactionComponent } from './Components/User/repeated-transaction/repeated-transaction.component';
import { DeletedTransactionComponent } from './Components/User/transaction-list/deleted-transaction/deleted-transaction.component';
import { DeletedGoalComponent } from './Components/User/goal-transaction/deleted-goal/deleted-goal.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'loginPage', component: LoginComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: 'UserPage', component: UserLayoutComponent},
  {path: 'UserPage',
    component: UserLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'transactionForm', component: TransactionFormComponent},
      {path: 'transactionData', component: TransactionListComponent},
      {path: 'goalPage', component: GoalTransactionComponent},
      {path: 'repeatedTask', component: RepeatedTransactionComponent},
      {path: 'deletedTransaction', component: DeletedTransactionComponent},
      {path: 'deletedGoal', component: DeletedGoalComponent},
    ]
  }

];
