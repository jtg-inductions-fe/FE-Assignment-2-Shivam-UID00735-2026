import { Component, inject, OnInit, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';

import { NotificationService } from '@/core/services/notification.service';

import { Restaurant } from '@/models/restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  @Input() restaurantDetails!: Restaurant;
  @Input() isEditMode!: boolean;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: string[] = [];
  myForm!: FormGroup;

  ngOnInit(): void {
    if (!this.restaurantDetails) {
      this.myForm = this.formBuilder.group({
        restaurantName: ['', Validators.required],
        restaurantAddress: ['', Validators.required],
        ownerEmails: [this.emails, [Validators.required]],
      });
    } else {
      if (this.restaurantDetails.ownersEmail) {
        this.emails = [...this.emails, ...this.restaurantDetails.ownersEmail];
      }
      this.myForm = this.formBuilder.group({
        restaurantName: [this.restaurantDetails.name, Validators.required],
        restaurantAddress: [
          this.restaurantDetails.address,
          Validators.required,
        ],
        ownerEmails: [this.emails, [Validators.required]],
      });
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (!this.validateEmail(value)) {
        this.notificationService.showErrorMessage(
          'Please enter valid email',
          'close',
        );
        event.chipInput!.clear();

        return;
      }
      this.emails.push(value);
    }

    event.chipInput!.clear();
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(email: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(email);
      return;
    }

    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails[index] = value;
    }
  }

  private validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
