import { Component, OnInit } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet, provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { HeaderComponent } from "./app/components/shared/header/header.component";
import { FooterComponent } from "./app/components/shared/footer/footer.component";
import { AccessibilityService } from "./app/services/accessibility.service";

@Component({
  selector: "app-root",
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
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .main-content {
        flex: 1;
        background-color: #f8f9fa;
      }
    `,
  ],
})
export class App implements OnInit {
  constructor(private accessibilityService: AccessibilityService) {}

  ngOnInit() {
    // The accessibility service automatically handles all settings on initialization
    // No need for manual setup here anymore
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
