import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empfehlungen } from './empfehlungen';

describe('Empfehlungen', () => {
  let component: Empfehlungen;
  let fixture: ComponentFixture<Empfehlungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empfehlungen],
    }).compileComponents();

    fixture = TestBed.createComponent(Empfehlungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
