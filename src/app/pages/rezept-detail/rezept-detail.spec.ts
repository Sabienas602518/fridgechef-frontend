import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptDetail } from './rezept-detail';

describe('RezeptDetail', () => {
  let component: RezeptDetail;
  let fixture: ComponentFixture<RezeptDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezeptDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RezeptDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
