import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VorratDetail } from './vorrat-detail';

@Component({
  standalone: true,
  template: ''
})
class DummyVorrat {
}

describe('VorratDetail', () => {
  let component: VorratDetail;
  let fixture: ComponentFixture<VorratDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorratDetail],
      providers: [
        provideRouter([
          {
            path: 'vorrat',
            component: DummyVorrat
          }
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VorratDetail);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});