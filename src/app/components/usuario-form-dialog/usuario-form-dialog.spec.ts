import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioFormDialog } from './usuario-form-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('UsuarioFormDialog', () => {
  let component: UsuarioFormDialog;
  let fixture: ComponentFixture<UsuarioFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormDialog],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});