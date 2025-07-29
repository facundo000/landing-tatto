import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotjarService {
  private readonly hotjarId = 'YOUR_HOTJAR_ID'; // Reemplazar con el ID real de Hotjar

  constructor() {
    this.initializeHotjar();
  }

  private initializeHotjar(): void {
    // Verificar si Hotjar ya está cargado
    if (typeof window !== 'undefined' && !(window as any).hj) {
      this.loadHotjarScript();
    }
  }

  private loadHotjarScript(): void {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${this.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);
  }

  public trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('event', eventName, properties);
    }
  }

  public trackFormSubmission(formName: string, properties?: Record<string, any>): void {
    this.trackEvent('form_submission', {
      form_name: formName,
      ...properties
    });
  }

  public trackButtonClick(buttonName: string, properties?: Record<string, any>): void {
    this.trackEvent('button_click', {
      button_name: buttonName,
      ...properties
    });
  }

  public trackNavigation(pageName: string, properties?: Record<string, any>): void {
    this.trackEvent('navigation', {
      page_name: pageName,
      ...properties
    });
  }
} 