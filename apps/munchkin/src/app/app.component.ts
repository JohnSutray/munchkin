import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gameUpdate } from 'libs/api-interfaces/src';

@Component({
  selector: 'munchkin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = gameUpdate;
  constructor(private http: HttpClient) {}
}
