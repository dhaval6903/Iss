import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficenotesListComponent } from './officenotes-list.component';

describe('OfficenotesListComponent', () => {
  let component: OfficenotesListComponent;
  let fixture: ComponentFixture<OfficenotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficenotesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficenotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
