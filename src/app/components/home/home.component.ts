import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Welcome to EcoMinds</h1>
        <p class="hero-subtitle">Text 1: subheading</p>
        <p class="hero-description">Text 2: description</p>
        <button class="start-button" routerLink="/simulation">
          Text 3: button
        </button>
      </div>

      <div class="features-preview">
        <div class="feature-card">
          <h3>Text 4</h3>
          <p>Text 5</p>
        </div>
        <div class="feature-card">
          <h3>Text 6</h3>
          <p>Text 7</p>
        </div>
        <div class="feature-card">
          <h3>Text 8</h3>
          <p>Text 9</p>
        </div>
      </div>

      <div class="image-gallery">
        <div class="gallery-grid">
          <div class="gallery-item">
            <img
              src="assets/images/image-1.jpg"
              alt="Gallery image 1"
              class="gallery-image"
            />
          </div>
          <div class="gallery-item">
            <img
              src="assets/images/image-2.png"
              alt="Gallery image 2"
              class="gallery-image"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {}
