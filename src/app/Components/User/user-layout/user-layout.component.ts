import { Component } from '@angular/core';
import { SidenavbarComponent } from "../sidenavbar/sidenavbar.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [SidenavbarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
