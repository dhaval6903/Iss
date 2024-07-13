import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficenotesAddComponent } from './officenotes-add.component';

describe('OfficenotesAddComponent', () => {
  let component: OfficenotesAddComponent;
  let fixture: ComponentFixture<OfficenotesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficenotesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficenotesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
