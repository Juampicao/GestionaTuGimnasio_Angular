import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyCustomLogger {
  constructor() {}

  /**
   * @param componente
   * @param message
   * @param object
   */
  logInfo(componente: string, message: string, object?: any) {
    console.info(
      `[${componente}]`,
      message ? message : '',
      object ? object : ''
    );
  }

  /**
   *
   * @param componente
   * @param message
   * @param object
   */
  logDebug(componente: string, message?: any, object?: any) {
    console.debug(
      `[${componente}]`,
      message ? message : '',
      object ? object : ''
    );
  }

  /**
   *
   * @param component
   * @param error
   * @param message
   */
  logError(component: string, error: any, message?: string) {
    console.error(`[${component}],`, error, message && message);
  }
}
