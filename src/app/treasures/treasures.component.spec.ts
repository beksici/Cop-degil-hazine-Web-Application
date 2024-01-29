import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuresComponent } from './treasures.component';

describe('TreasuresComponent', () => {
  let component: TreasuresComponent;
  let fixture: ComponentFixture<TreasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreasuresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
