import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarSection } from '@/models';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@/core/constants';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarJsonURL = API_URL.sidebarNavigationLinkURL;
  private http = inject(HttpClient);

  getSidebarItem(): Observable<SidebarSection[]> {
    return this.http.get<SidebarSection[]>(this.sidebarJsonURL);
  }
}
