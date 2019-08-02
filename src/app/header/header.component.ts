import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Links } from '../shared/consts/links';
import { Link } from '../shared/types/links.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() buttonToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  isOpen = false;
  links: Link[] = Links;
  selectedLink: Link;

  private $destroy = new Subject<any>();

  constructor(private router: Router) {
  }

  onButtonToggle(): void {
    this.buttonToggle.emit(this.isOpen = !this.isOpen);
  }

  ngOnInit(): void {
    this.findSelectedLink();
  }


  private findSelectedLink(): void {
    this.router.events
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: any) => {
        if (val instanceof NavigationEnd) {
          this.selectedLink = this.links
            .find((res: Link) => res.link && this.router.url.includes(res.link));
        }
      });
  }
}
