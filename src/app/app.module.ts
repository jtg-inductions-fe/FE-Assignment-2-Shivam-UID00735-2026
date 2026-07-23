import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@/features/auth/auth.module';
import { SharedModule } from '@/shared/shared.module';
import { LayoutModule } from '@/features/layout/layout.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { RestaurantModule } from './features/admin/restaurant/restaurant.module';

import { AppComponent } from '@/app.component';

import { CookieService } from 'ngx-cookie-service';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ErrorInterceptor } from '@/core/interceptor/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    LayoutModule,
    DashboardModule,
    RestaurantModule,
  ],
  providers: [
    CookieService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
