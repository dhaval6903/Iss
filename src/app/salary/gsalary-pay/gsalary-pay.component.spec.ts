import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsalaryPayComponent } from './gsalary-pay.component';

describe('GsalaryPayComponent', () => {
  let component: GsalaryPayComponent;
  let fixture: ComponentFixture<GsalaryPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GsalaryPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GsalaryPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
