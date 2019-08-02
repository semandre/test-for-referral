import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {

  @Output() selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() list: any[];
  @Input() valueType: string;
  @Input() selectedItem: any;

  isOpen: boolean;
  visibleOptions = 3;

  constructor() {
  }

  ngOnInit(): void {
    this.visibleOptions = this.list.length >= 3 ? this.visibleOptions : this.list.length;
  }

  select(option: any): void {
    this.selectEmitter.emit(option);
    this.isOpen = false;
  }
}
