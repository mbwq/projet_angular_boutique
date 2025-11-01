import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Restock } from './restock';

describe('Restock', () => {
  let component: Restock;
  let fixture: ComponentFixture<Restock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
