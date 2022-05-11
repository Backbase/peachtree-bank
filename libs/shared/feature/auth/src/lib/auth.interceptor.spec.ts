import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

const testUrl = '/data';
const testUrl1 = '/data1';

interface Data {
  name: string;
}

describe('ErrorInterceptor', () => {
  describe('intercept', () => {
    let errorInterceptor: AuthInterceptor;
    let authService: OAuthService;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthInterceptor,
          UrlHelperService,
          OAuthLogger,
          DateTimeProvider,
          {
            provide: OAuthService,
            useValue: {
              hasValidAccessToken: () => {
                return false;
              },
              initLoginFlow: () => {
                return true;
              },
            },
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
          },
        ],
        imports: [HttpClientTestingModule],
      });
      httpClient = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
      authService = TestBed.inject(OAuthService);
      errorInterceptor = TestBed.inject(AuthInterceptor);
    });

    it('401', () => {
      const authServieSpy = spyOn(authService, 'initLoginFlow');
      const err: any = { status: 401 };
      const emsg = new HttpErrorResponse({
        headers: new HttpHeaders(),
        error: err,
      });
      httpClient.get<Data>(testUrl).subscribe(
        (res) => fail('should have failed with the 401 error'),
        (error: HttpErrorResponse) => {
          expect(error).toEqual(emsg);
        },
      );
      const req = httpMock.expectOne(testUrl);
      req.flush(emsg, { status: 401, statusText: 'Unauthorized' });
      expect(authServieSpy).toHaveBeenCalled();
    });
  });
});

describe('ErrorInterceptor', () => {
  describe('intercept', () => {
    let errorInterceptor: AuthInterceptor;
    let authService: OAuthService;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthInterceptor,
          UrlHelperService,
          OAuthLogger,
          DateTimeProvider,
          {
            provide: OAuthService,
            useValue: {
              hasValidAccessToken: () => {
                return true;
              },
              initLoginFlow: () => {
                return true;
              },
            },
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
          },
        ],
        imports: [HttpClientTestingModule],
      });
      httpClient = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
      authService = TestBed.inject(OAuthService);
      errorInterceptor = TestBed.inject(AuthInterceptor);
    });

    it('401', () => {
      const authServieSpy = spyOn(authService, 'initLoginFlow');
      const err: any = { status: 401 };
      const emsg = new HttpErrorResponse({
        headers: new HttpHeaders(),
        error: err,
      });
      try {
        httpClient.get<Data>(testUrl).subscribe(
          (res) => fail('should have failed with the 401 error'),
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(401);
          },
        );

        const req = httpMock.expectOne(testUrl);
        req.flush(emsg, { status: 401, statusText: 'Unauthorized' });
        expect(authServieSpy).not.toHaveBeenCalled();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
