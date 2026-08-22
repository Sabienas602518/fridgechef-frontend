import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptCreate } from './rezept-create';

describe('RezeptCreate', () => {
  let component: RezeptCreate;
  let fixture: ComponentFixture<RezeptCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezeptCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(RezeptCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
