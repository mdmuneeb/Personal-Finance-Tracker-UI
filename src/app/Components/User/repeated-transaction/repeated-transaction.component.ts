import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../Services/common-service.service';

@Component({
  selector: 'app-repeated-transaction',
  standalone: true,
  imports: [],
  templateUrl: './repeated-transaction.component.html',
  styleUrl: './repeated-transaction.component.scss'
})
export class RepeatedTransactionComponent implements OnInit{


  ngOnInit(): void {

  }

  constructor (
    private commonServive: CommonServiceService,
    
  ) {}

  getTranactionByUserId(){

  }


}
