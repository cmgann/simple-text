import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommaDelimitationComponent } from './comma-delimitation.component';

describe('CommaDelimitationComponent', () => {
  let component: CommaDelimitationComponent;
  let fixture: ComponentFixture<CommaDelimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommaDelimitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommaDelimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
