import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassiList } from './classi-list';

describe('ClassiList', () => {
  let component: ClassiList;
  let fixture: ComponentFixture<ClassiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassiList],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassiList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
