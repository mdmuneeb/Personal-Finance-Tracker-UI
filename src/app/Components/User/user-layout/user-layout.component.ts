import { Component } from '@angular/core';
import { SidenavbarComponent } from "../sidenavbar/sidenavbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [SidenavbarComponent, RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
