import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlansComponent } from './data-plans.component';

describe('DataPlansComponent', () => {
  let component: DataPlansComponent;
  let fixture: ComponentFixture<DataPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
