import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { restaurant } from '@/models/restaurant.model';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { FormControl } from '@angular/forms';
import { DashboardService, AuthService } from '@/core/services';

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

  filteredOptions!: Observable<restaurant[]>;
  isSearching = false;

  ngOnInit(): void {
    if (this.authService.getCurrentUserRole() !== 'admin') {
      return;
    }
    this.form.setValue('All Restaurant');
    this.filteredOptions = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.dashboardService.getRestaurant(value ?? '')),
    );
    this.selectedValuesOnChange.emit(0);
  }

  onSelectValueChange(options: restaurant) {
    this.selectedValuesOnChange.emit(options.id);
  }
}
