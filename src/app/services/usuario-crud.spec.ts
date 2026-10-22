import { TestBed } from '@angular/core/testing';
import { UsuarioCrudService } from './usuario-crud';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsuarioCrudService', () => {
  let service: UsuarioCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsuarioCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});