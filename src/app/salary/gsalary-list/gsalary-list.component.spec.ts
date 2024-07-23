import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsalaryListComponent } from './gsalary-list.component';

describe('GsalaryListComponent', () => {
  let component: GsalaryListComponent;
  let fixture: ComponentFixture<GsalaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GsalaryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GsalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
