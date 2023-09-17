import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmyconfComponent } from './tmyconf.component';

describe('TmyconfComponent', () => {
  let component: TmyconfComponent;
  let fixture: ComponentFixture<TmyconfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmyconfComponent]
    });
    fixture = TestBed.createComponent(TmyconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
