import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accessoire } from './accessoire';

describe('Accessoire', () => {
  let component: Accessoire;
  let fixture: ComponentFixture<Accessoire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accessoire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accessoire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
