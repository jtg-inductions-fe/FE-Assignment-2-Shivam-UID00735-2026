import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Restaurant } from '@/models/restaurant.model';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  filter,
  catchError,
  finalize,
} from 'rxjs';

import { FormControl } from '@angular/forms';
import { DashboardService, AuthService } from '@/core/services';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.scss'],
})
export class AutoSelectComponent implements OnInit {
  form = new FormControl('');
  @Input() label = '';

  @Output() selectedValuesOnChange = new EventEmitter<number>();

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  private skipNextSearch = false;

  filteredOptions!: Observable<Restaurant[]>;
  isSearching = false;

  ngOnInit(): void {
    if (this.authService.getCurrentUserRole() !== 'admin') {
      return;
    }

    this.dashboardService.getAllRestaurants().subscribe();

    this.form.setValue('All Restaurant');

    this.filteredOptions = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(() => {
        if (this.skipNextSearch) {
          this.skipNextSearch = false;
          return false;
        }
        return true;
      }),
      switchMap((value) => {
        const query = (value ?? '').trim();
        if (query.length === 0) {
          this.isSearching = false;
          return of([]);
        }

        this.isSearching = true;
        return this.dashboardService.getFilteredRestaurants(query).pipe(
          finalize(() => {
            this.isSearching = false;
          }),
        );
      }),
    );

    this.selectedValuesOnChange.emit(0);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selected: Restaurant = event.option.value;
    this.skipNextSearch = true;
    this.form.setValue(selected.name, { emitEvent: false });
    this.selectedValuesOnChange.emit(selected.id);
  }
}
