import { ApplicationRef, enableProdMode, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

let appRef: ApplicationRef;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((moduleRef: NgModuleRef<any>) => {
    appRef = moduleRef.injector.get(ApplicationRef);
    const appComponentRef = appRef.components[0];
    enableDebugTools(appComponentRef);
  })
  .catch((err) => console.error(err));
