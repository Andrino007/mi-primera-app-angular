import { TestBed } from '@angular/core/testing';
import { UsuarioCrud } from './usuario-crud';

describe('UsuarioCrud', () => {
  let service: UsuarioCrud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioCrud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
