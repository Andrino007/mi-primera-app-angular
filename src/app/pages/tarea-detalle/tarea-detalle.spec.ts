import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaDetalle } from './tarea-detalle';
import { provideRouter } from '@angular/router';

describe('TareaDetalle', () => {
  let component: TareaDetalle;
  let fixture: ComponentFixture<TareaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetalle],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});