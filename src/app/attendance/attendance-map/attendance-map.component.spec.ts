import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMapComponent } from './attendance-map.component';

describe('AttendanceMapComponent', () => {
  let component: AttendanceMapComponent;
  let fixture: ComponentFixture<AttendanceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
