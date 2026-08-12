import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vorrat } from './vorrat';

describe('Vorrat', () => {
  let component: Vorrat;
  let fixture: ComponentFixture<Vorrat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vorrat],
    }).compileComponents();

    fixture = TestBed.createComponent(Vorrat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
