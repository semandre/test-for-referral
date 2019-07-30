import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isOpen = false;

  onButtonToggle($event: boolean): void {
    this.isOpen = $event;
  }
}
