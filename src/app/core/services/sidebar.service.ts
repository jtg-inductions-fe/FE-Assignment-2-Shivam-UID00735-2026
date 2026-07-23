import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SidebarSection } from '@/models/navigation.model';
import { handleHttpError } from '@/shared/utils/http-error.util';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarJsonURL = 'assets/data/side-navigation.json';
  private http = inject(HttpClient);

  getSidebarItem(): Observable<SidebarSection[]> {
    return this.http
      .get<SidebarSection[]>(this.sidebarJsonURL)
      .pipe(catchError((err) => handleHttpError(err)));
  }
}
