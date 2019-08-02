import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {

  @Output() selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  list: any[] = [];
  @Input() valueType: string;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 1000; i++) {
      this.list.push(i);
    }
  }

  select(option: any): void {
    this.selectEmitter.emit(option);
    console.log(234);
  }
}
