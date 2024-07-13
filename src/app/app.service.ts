import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isCollapsed = false;

  constructor() { }

  // Getter method to access isCollapsed
  getIsCollapsed(): boolean {
    return this.isCollapsed;
  }

  // Setter method to update isCollapsed
  setIsCollapsed(value: boolean): void {
    this.isCollapsed = value;
  }
}