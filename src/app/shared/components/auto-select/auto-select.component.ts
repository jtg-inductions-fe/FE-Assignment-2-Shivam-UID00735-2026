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
  startWith,
  map,
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from '@/core/services/auth.service';
import { DashboardStatsService } from '@/core/services/dashboard-stats.service';

@Component({
  selector: 'app-auto-select',
  templateUrl: './auto-select.component.html',
  styleUrls: ['./auto-select.component.scss'],
})
export class AutoSelectComponent implements OnInit {
  form = new FormControl('');
  @Input() label = '';
  @Input() selectedValue = '';

  @Output() selectedValuesOnChange = new EventEmitter<number>();

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardStatsService);

  filteredOptions!: Observable<restaurant[]>;

  isSearching = false;

  ngOnInit(): void {
    // !Not setting  up default URL
    if (this.authService.getCurrentUserRole() !== 'admin') {
      return;
    }
    this.form.setValue('');
    this.filteredOptions = this.form.valueChanges.pipe(
      // ! Understand debounceTime and witchMap deeply
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
