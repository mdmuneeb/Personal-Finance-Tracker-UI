import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { TransactionServiceService } from '../../../Services/Transaction/transaction-service.service';
import { CommonServiceService } from '../../../Services/Common/common-service.service';

interface TransactionCount {
  income: number;
  expense: number;
}

interface Result {
  [date: string]: TransactionCount;
}


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis?: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  series2?: ApexNonAxisChartSeries;
  responsive?: ApexResponsive[];
  labels?: any;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chartIncome") chartIncome!: ChartComponent;
  public chartOptionsIncome!: Partial<ChartOptions>;

  @ViewChild("chartExpense") chartExpense!: ChartComponent;
  public chartOptionsExpense!: Partial<ChartOptions>;

  transactionList!:any;
  incomeSeries !: any[];
  expenseSeries !: any[];
  Salary = 0;
  RentalIcome = 0;
  Business = 0;
  stocks = 0;

  Shopping = 0;
  Food = 0;
  Entertain = 0;
  Grocery = 0;

  totalIncome = 0;
  totalExpense= 0;
  availableBalance= 0;




  constructor(
    private transactionService: TransactionServiceService,
    private commonService: CommonServiceService
  ) {
    this.chartOptions = {
      series: [
          {
              name: "Income",
              data: [] // Initialize with empty array
          },
          {
              name: "Expense",
              data: [] // Initialize with empty array
          }
      ],
      chart: { type: "area", height: 350, stacked: true },
      colors: ["#008FFB", "#00E396"],
      dataLabels: { enabled: false },
      fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.8 } },
      legend: { position: "top", horizontalAlign: "left" },
      xaxis: { categories: [], type: "category" } // Initialize categories as empty
  };

    this.chartOptionsIncome = {
      // series2: [44, 55, 13, 43],
      series2: [this.Salary, this.RentalIcome, this.Business, this.stocks],
      chart: { width: 380, type: "pie" },
      labels: ["Salary", "Rental Income", "Business", "Stocks"],
      responsive: [
        {
          breakpoint: 480,
          options: { chart: { width: 200 }, legend: { position: "bottom" } }
        }
      ]
    };

    this.chartOptionsExpense = {
      series2: [this.Shopping, this.Food, this.Entertain, this.Grocery],
      chart: { width: 380, type: "pie" },
      labels: ["Shopping", "Food", "Entertain", "Grocery"],
      responsive: [
        {
          breakpoint: 480,
          options: { chart: { width: 200 }, legend: { position: "bottom" } }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getTransactionsById();
  }

  gettotalIncomeExpense(list:any){
    list.forEach((val:any)=>{
      if(val.transactionTypeId === 1){
        this.totalIncome += val.amount;
      }
      else{
        this.totalExpense += val.amount;
      }
    })
    this.availableBalance = this.totalIncome - this.totalExpense;
    console.log(this.totalIncome, this.totalExpense, this.availableBalance);

  }

  countTransactionsByDate(transactions: any) {
    const result: Result = {};

    transactions.forEach((transaction: any) => {
        const date = transaction.transactionDate;
        if (!result[date]) {
            result[date] = { income: 0, expense: 0 };
        }

        if (transaction.transactionTypeId === 1) {
            result[date].income += 1; // Count income
        } else if (transaction.transactionTypeId === 2) {
            result[date].expense += 1; // Count expense
        }
    });

    // Convert result into chart-compatible arrays
    const dates = Object.keys(result);
    const incomeData = dates.map(date => result[date].income);
    const expenseData = dates.map(date => result[date].expense);

    return { dates, incomeData, expenseData }; // Return formatted data
  }


  getTransactionsById(){
    this.transactionService.gettransactionById(this.commonService.getUserId()).
    subscribe({
      next:(res)=>{

        this.transactionList = res.filter((val:any)=> val.deleteTransaction !== true);
        console.log(this.transactionList);
        this.gettotalIncomeExpense(this.transactionList);
        this.setPieChart(this.transactionList);

        const { dates, incomeData, expenseData } = this.countTransactionsByDate(this.transactionList);

        // Ensure chartOptions is defined
        if (this.chartOptions && this.chartOptions.series ) {
            this.chartOptions.series[0].data = incomeData; // Set income data
            this.chartOptions.series[1].data = expenseData; // Set expense data

            // Set x-axis categories
            this.chartOptions.xaxis = {
                categories: dates, // Set dates for the x-axis
                type: "category" // Change to "datetime" if needed
            };

            // Update chart options
            this.chart.updateOptions(this.chartOptions);
        }


      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  setPieChart(list:any){
    list.forEach((val:any)=>{
      if(val.transactionTypeId === 1 ){
        if(val.categoryId === 1){
            this.Salary++
        }
        else if (val.categoryId === 2){
          this.RentalIcome++
        }
        else if (val.categoryId === 3){
          this.Business++
        }
        else if (val.categoryId === 4){
          this.stocks++
        }
      }
      else if (val.transactionTypeId === 2){
        if(val.categoryId === 1){
          this.Shopping++
      }
      else if (val.categoryId === 2){
        this.Food++
      }
      else if (val.categoryId === 3){
        this.Entertain++
      }
      else if (val.categoryId === 4){
        this.Grocery++
      }
      }
    })
    this.chartOptionsIncome.series2 = [this.Salary, this.RentalIcome, this.Business, this.stocks];
    this.chartOptionsExpense.series2 = [this.Shopping, this.Food, this.Entertain, this.Grocery];

    // Trigger change detection if necessary
    // this.chartIncome.updateOptions(this.chartOptionsIncome);
    // this.chartExpense.updateOptions(this.chartOptionsExpense);

    if (this.chartIncome) {
      this.chartIncome.updateOptions(this.chartOptionsIncome);
  } else {
      console.error('chartIncome is undefined');
  }

  if (this.chartExpense) {
      this.chartExpense.updateOptions(this.chartOptionsExpense);
  } else {
      console.error('chartExpense is undefined');
  }

    console.log(this.RentalIcome);
    console.log(this.Salary);
  }

}
