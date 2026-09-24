import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RezeptDetail } from './rezept-detail';
import { provideRouter } from '@angular/router';

@Component({
  standalone: true,
  template: ''})

class DummyRezepte {
}

describe('RezeptDetail', () => {
  let component: RezeptDetail;
  let fixture: ComponentFixture<RezeptDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezeptDetail],
      providers: [provideRouter([
        {
       path: 'rezepte', component: DummyRezepte}]) ],
    }).compileComponents();

    fixture = TestBed.createComponent(RezeptDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
