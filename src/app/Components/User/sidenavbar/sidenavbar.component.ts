import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss'] // Change this line
})
export class SidenavbarComponent {
  toggleNavBar() {
    const navBar = document.querySelector('nav');
    if (navBar) {
      navBar.classList.toggle('open');
    }
  }

  // Function to close the navbar
  closeNavBar() {
    const navBar = document.querySelector('nav');
    if (navBar) {
      navBar.classList.remove('open');
    }
  }
}
