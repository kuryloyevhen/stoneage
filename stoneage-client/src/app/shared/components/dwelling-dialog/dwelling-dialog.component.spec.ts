import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwellingDialogComponent } from './dwelling-dialog.component';

describe('DwellingDialogComponent', () => {
  let component: DwellingDialogComponent;
  let fixture: ComponentFixture<DwellingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwellingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwellingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
