import { Component, Input } from '@angular/core';
import { Links } from '../shared/consts/links';

@Component ({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input () isOpen: boolean;

  links = Links;

  constructor() {
  }

}
