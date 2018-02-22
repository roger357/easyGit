import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitpagerComponent } from './commitpager.component';

describe('CommitpagerComponent', () => {
  let component: CommitpagerComponent;
  let fixture: ComponentFixture<CommitpagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitpagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitpagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
