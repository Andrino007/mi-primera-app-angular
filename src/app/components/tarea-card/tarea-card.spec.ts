import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaCard } from './tarea-card';

describe('TareaCard', () => {
  let component: TareaCard;
  let fixture: ComponentFixture<TareaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaCard]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaCard);
    component = fixture.componentInstance;
    
    // Le pasamos una tarea falsa para que el input required no falle
    fixture.componentRef.setInput('tarea', { 
      id: 1, 
      titulo: 'Test', 
      completada: false, 
      prioridad: 'media' 
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});