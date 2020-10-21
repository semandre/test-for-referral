import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private service: HttpService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.service.sendConfirmation(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
      .pipe(first()).subscribe(console.log);
  }
}
