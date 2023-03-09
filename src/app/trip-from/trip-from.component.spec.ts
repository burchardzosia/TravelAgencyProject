import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFromComponent } from './trip-from.component';

describe('TripFromComponent', () => {
  let component: TripFromComponent;
  let fixture: ComponentFixture<TripFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
