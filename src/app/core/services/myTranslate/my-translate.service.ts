import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer2: Renderer2;
  private readonly platformId: object;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId: object,
    rendererFactory: RendererFactory2
  ) {
    this.renderer2 = rendererFactory.createRenderer(null, null);
    this.platformId = platformId;

    if (isPlatformBrowser(this.platformId)) {
      // Set default language
      this.translateService.setDefaultLang('en');

      // Get saved language from local storage
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translateService.use(savedLang);

      // Update direction
      this.changeDirection(savedLang);
    }
  }

  changeDirection(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const direction = lang === 'ar' ? 'rtl' : 'ltr';
      this.renderer2.setAttribute(document.documentElement, 'dir', direction);
      this.renderer2.setAttribute(document.documentElement, 'lang', lang);
    }
  }

  changeLangTranslate(lang: string): void {
  
      localStorage.setItem('lang', lang);
      this.translateService.use(lang);
      this.changeDirection(lang);
    
   
  }
}
