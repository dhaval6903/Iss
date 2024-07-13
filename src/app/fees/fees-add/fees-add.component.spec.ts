import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesAddComponent } from './fees-add.component';

describe('FeesAddComponent', () => {
  let component: FeesAddComponent;
  let fixture: ComponentFixture<FeesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
