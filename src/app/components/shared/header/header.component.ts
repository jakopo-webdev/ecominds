import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <a routerLink="/home" class="brand-link">
            <h1>EcoMinds</h1>
          </a>
        </div>
        <ul class="nav-links">
          <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
          <li>
            <a routerLink="/simulation" routerLinkActive="active">Simulation</a>
          </li>
          <li>
            <a routerLink="/eco-missions" routerLinkActive="active"
              >Eco-Missions</a
            >
          </li>
          <!-- <li><a routerLink="/accessibility-settings" routerLinkActive="active">Accessibility</a></li>-->
          <li>
            <a routerLink="/about-us" routerLinkActive="active">About Us</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {}
