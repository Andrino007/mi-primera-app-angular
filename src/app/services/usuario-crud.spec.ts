import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioCrudService } from './usuario-crud';

describe('UsuarioCrudService', () => {
  let service: UsuarioCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Le dice a Angular que simule las peticiones HTTP
    });
    service = TestBed.inject(UsuarioCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});