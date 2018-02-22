import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchdetailComponent } from './branchdetail.component';

describe('BranchdetailComponent', () => {
  let component: BranchdetailComponent;
  let fixture: ComponentFixture<BranchdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
