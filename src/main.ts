import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';


const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    provideHttpClient(),   
  ],
};


bootstrapApplication(AppComponent, extendedAppConfig).catch(err => console.error(err));
