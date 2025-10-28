import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Echarpe } from './echarpe';

describe('Echarpe', () => {
  let component: Echarpe;
  let fixture: ComponentFixture<Echarpe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Echarpe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Echarpe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
