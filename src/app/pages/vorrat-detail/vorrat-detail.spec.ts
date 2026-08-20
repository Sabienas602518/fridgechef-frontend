import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VorratDetail } from './vorrat-detail';

describe('VorratDetail', () => {
  let component: VorratDetail;
  let fixture: ComponentFixture<VorratDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorratDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(VorratDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
