import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivateLayout } from './private-layout';
import { provideRouter } from '@angular/router';

describe('PrivateLayout', () => {
  let component: PrivateLayout;
  let fixture: ComponentFixture<PrivateLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateLayout],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});