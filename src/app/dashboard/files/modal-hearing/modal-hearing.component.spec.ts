import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHearingComponent } from './modal-hearing.component';

describe('ModalHearingComponent', () => {
  let component: ModalHearingComponent;
  let fixture: ComponentFixture<ModalHearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHearingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
