// visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private _visibleNav = new BehaviorSubject<boolean>(false);
  visibleNav$ = this._visibleNav.asObservable();

  toggleNav(value: boolean) {
    this._visibleNav.next(value);
  }
}
