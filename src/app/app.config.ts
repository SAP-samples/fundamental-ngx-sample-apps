import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(FdDatetimeModule),
    RtlService,
    provideTheming({
      defaultTheme: 'sap_horizon',
      excludeDefaultThemes: false
    }),
    themingInitializer()
  ]
};
