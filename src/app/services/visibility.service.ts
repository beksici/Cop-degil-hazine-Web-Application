import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private visibilitySubjectNav = new BehaviorSubject<boolean>(true);
  visibilityNav$ = this.visibilitySubjectNav.asObservable();
  setVisibilityNav(visibility: boolean): void {
    this.visibilitySubjectNav.next(visibility);
  }

  private visibilitySubjectFilter = new BehaviorSubject<boolean>(true);
  visibilityFilter$ = this.visibilitySubjectFilter.asObservable();
  setVisibilityFilter(visibility: boolean): void {
    this.visibilitySubjectFilter.next(visibility);
  }

  private visibilitySubjectCategoryList = new BehaviorSubject<boolean>(true);
  visibilityCategoryList$ = this.visibilitySubjectCategoryList.asObservable();
  setVisibilityCategoryList(visibility: boolean): void {
    this.visibilitySubjectCategoryList.next(visibility);
  }

  private visibilitySubjectAdField = new BehaviorSubject<boolean>(false);
  visibilityAdField$ = this.visibilitySubjectAdField.asObservable();
  setVisibilityAdField(visibility: boolean): void {
    this.visibilitySubjectAdField.next(visibility);
  }

  constructor() {}
}
