import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseDashboard } from './classe-dashboard';

describe('ClasseDashboard', () => {
  let component: ClasseDashboard;
  let fixture: ComponentFixture<ClasseDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasseDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClasseDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
