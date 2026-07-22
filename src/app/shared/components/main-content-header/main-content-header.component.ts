import { Component, inject, Input } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-main-content-header',
  templateUrl: './main-content-header.component.html',
  styleUrls: ['./main-content-header.component.scss'],
})
export class MainContentHeaderComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() headingFontSize!: number;

  private authService = inject(AuthService);

  showRestaurantFilter() {
    return this.authService.getCurrentUserRole() === 'admin';
  }

  getHeadingSize(): string {
    return `${this.headingFontSize / 16}rem`;
  }
}
