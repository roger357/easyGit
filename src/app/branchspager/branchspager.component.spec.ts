import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchspagerComponent } from './branchspager.component';

describe('BranchspagerComponent', () => {
  let component: BranchspagerComponent;
  let fixture: ComponentFixture<BranchspagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchspagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchspagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
