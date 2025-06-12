import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HeaderComponent } from './app/components/shared/header/header.component';
import { FooterComponent } from './app/components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      background-color: #f8f9fa;
    }
  `]
})

export class App {
  ngOnInit() {
    // Always apply dyslexia font if setting is enabled
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.dyslexiaFont) {
        document.body.classList.add('dyslexia-font');
      } else {
        document.body.classList.remove('dyslexia-font');
      }
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    
    // Always apply high contrast mode if setting is enabled
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    }
    else {
      document.body.classList.remove('high-contrast');
    }
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});