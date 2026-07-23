import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@/features/auth/auth.module';
import { SharedModule } from '@/shared/shared.module';

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
