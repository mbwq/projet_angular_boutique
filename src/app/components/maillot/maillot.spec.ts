import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maillot } from './maillot';

describe('Maillot', () => {
  let component: Maillot;
  let fixture: ComponentFixture<Maillot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maillot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Maillot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
