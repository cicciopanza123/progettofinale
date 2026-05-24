import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenteDetail } from './studente-detail';

describe('StudenteDetail', () => {
  let component: StudenteDetail;
  let fixture: ComponentFixture<StudenteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudenteDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(StudenteDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
