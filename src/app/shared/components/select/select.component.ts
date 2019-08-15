import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, OnChanges {

  @Output() selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input() list: any[];
  @Input() valueType: string;
  @Input() selectedItem: any;

  isOpen: boolean;
  visibleOptions: number;

  maxVisibleOptions = 3;


  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list']) {
      this.visibleOptions = this.list && this.list.length >= this.maxVisibleOptions ?
        this.maxVisibleOptions : (this.list ? this.list.length : 1);
    }
  }

  select(option: any): void {
    this.selectEmitter.emit(option);
    this.isOpen = false;
  }
}
