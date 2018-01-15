import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'gorkhas-kickstart',
  templateUrl: './kickstart.component.html',
  styleUrls: ['./kickstart.component.scss']
})
export class KickstartComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fetch() {
    this.http.get('/api/ok').subscribe(value => {
      console.log(value);
    });
  }
}
