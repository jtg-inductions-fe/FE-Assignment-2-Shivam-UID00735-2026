import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '@/core/services/auth.service';
import { NotificationService } from '@/core/services/notification.service';
import { ROUTES } from '@/core/constants/routes.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private formBuilder = inject(FormBuilder);
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    this.authService.validateUser(email, password).subscribe((isValid) => {
      if (!isValid) {
        this.notificationService.showErrorMessage(
          'Invalid email or password',
          'Close',
        );
        return;
      }

      this.router.navigate([ROUTES.dashboardPageRoute]);
    });
  }
}
