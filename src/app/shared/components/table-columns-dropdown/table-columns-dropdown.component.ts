import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { TableColumn } from '../../types/tableColumnsModel';

@Component({
  selector: 'app-table-columns-dropdown',
  templateUrl: './table-columns-dropdown.component.html',
  styleUrls: ['./table-columns-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnsDropdownComponent implements OnChanges {

  @Output() columnsEmitter: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();
  @Output() openMenuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() onMenuOpen: boolean;
  @Input() columns: TableColumn[];
  copy: TableColumn[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.copy = this.columns.map((column: TableColumn) => ({ ...column }));
  }

  onChange(index: number): void {
    this.copy[index].hide = !this.copy[index].hide;
  }

  onApply(): void {
    this.columnsEmitter.emit(this.copy);
    this.openMenuEmitter.emit(false);
  }

  onCancel(): void {
    this.copy = this.columns;
    this.openMenuEmitter.emit(false);
  }
}
