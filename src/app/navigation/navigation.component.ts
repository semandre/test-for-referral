import { Component, Input } from '@angular/core';

import { Links } from '../shared/consts/links';
import { Link } from '../shared/types/links.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() isOpen: boolean;

  links: Link[] = Links;

  constructor() {
  }

}
