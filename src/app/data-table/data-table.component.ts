import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  sortDir = 1;
  pageSize = 5;
  page = 1;
  constructor(private dataService: DataService) {
    this.sortArr('first');
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.dataService.getData().subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
      },
      (error) => {
        console.log('Err : ', error);
      }
    );
    console.log(this.data);
  }

  onSortClick(event: any) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr('first');
  }

  sortArr(colName: any) {
    this.data.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
}
