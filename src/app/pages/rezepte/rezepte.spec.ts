import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rezepte } from './rezepte';

describe('Rezepte', () => {
  let component: Rezepte;
  let fixture: ComponentFixture<Rezepte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rezepte],
    }).compileComponents();

    fixture = TestBed.createComponent(Rezepte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
