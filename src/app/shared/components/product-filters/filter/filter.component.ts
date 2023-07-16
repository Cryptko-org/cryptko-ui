import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterData } from '../../../../core/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() title: string = '';
  @Input() filters: FilterData[] = [];
  @Output() filtersChange: EventEmitter<FilterData[]> = new EventEmitter<FilterData[]>();

  public isCollapsed: boolean = false;

  public toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  public handleSelect(filterValue: string) {
    const updatedFilters: FilterData[] = this.updateFilterValue(filterValue);
    this.filtersChange.emit(updatedFilters);
  }

  private updateFilterValue(filterValue: string): FilterData[] {
    return this.filters.map((filter: FilterData) => {
      if (filter.value === filterValue) {
        filter.isChecked = !filter.isChecked;
      }

      return filter;
    });
  }
}
