import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getStorage, provideStorage} from '@angular/fire/storage';
import { environment as firebaseConfig } from '../environments/environment.development';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      //provideAnalytics(() => getAnalytics()),
      //provideAuth(() => getAuth()),
      //provideFirestore(() => getFirestore()),
      //provideFunctions(() => getFunctions()),
      //provideMessaging(() => getMessaging()),
      //providePerformance(() => getPerformance()),
      provideStorage(() => getStorage())    
    ])
  ]
};
