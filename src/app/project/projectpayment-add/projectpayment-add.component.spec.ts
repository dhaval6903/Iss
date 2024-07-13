import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpaymentAddComponent } from './projectpayment-add.component';

describe('ProjectpaymentAddComponent', () => {
  let component: ProjectpaymentAddComponent;
  let fixture: ComponentFixture<ProjectpaymentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectpaymentAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectpaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
