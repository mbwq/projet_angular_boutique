import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { myInterceptorInterceptor } from './helper/my-interceptor-interceptor';
import { authInterceptorInterceptor } from './helper/auth-interceptor-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([myInterceptorInterceptor]))
  ]
};
