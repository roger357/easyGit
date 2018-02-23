import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchsCommitsComponent } from './branchscommits.component';

describe('BranchsCommitsComponent', () => {
  let component: BranchsCommitsComponent;
  let fixture: ComponentFixture<BranchsCommitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchsCommitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchsCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
