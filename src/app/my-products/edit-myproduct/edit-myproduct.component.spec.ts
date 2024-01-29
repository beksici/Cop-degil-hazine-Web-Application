import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyproductComponent } from './edit-myproduct.component';

describe('EditMyproductComponent', () => {
  let component: EditMyproductComponent;
  let fixture: ComponentFixture<EditMyproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMyproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
