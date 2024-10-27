import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonServiceService } from '../../../Services/Common/common-service.service';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit{
  constructor(
    private commonService: CommonServiceService
  ){}
  Name!:any;

  ngOnInit(): void {
    this.Name =this.commonService.getUserName()
    console.log(this.Name);

  }


}
