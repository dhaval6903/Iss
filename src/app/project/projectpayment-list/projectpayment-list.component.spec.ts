import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpaymentListComponent } from './projectpayment-list.component';

describe('ProjectpaymentListComponent', () => {
  let component: ProjectpaymentListComponent;
  let fixture: ComponentFixture<ProjectpaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectpaymentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectpaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
