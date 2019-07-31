import { Component, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output () buttonToggle: EventEmitter<boolean> = new EventEmitter<boolean> ();

  isOpen = false;

  constructor() {
  }

  onButtonToggle(): void {
    this.buttonToggle.emit (this.isOpen = !this.isOpen);
  }

}
