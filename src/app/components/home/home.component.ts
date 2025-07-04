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
        <p class="hero-subtitle">
          Raising awareness about the urgent need to protect our environment.
        </p>
        <p class="hero-description">
          Discover the real impact of our actions on the planet, learn how to
          reduce your ecological footprint, and become part of a community
          committed to sustainability and caring for the Earth.
        </p>
        <button class="start-button" routerLink="/simulation">
          Start your Journey
        </button>
      </div>

      <div class="features-preview">
        <div class="feature-card">
          <h3>Recycling Machines</h3>
          <p>
            Installation of machines in public spaces where people can deposit
            used plastic and receive rewards (discounts, digital credits, or
            points to redeem).
          </p>
        </div>
        <div class="feature-card">
          <h3>Turning Waste into Beauty</h3>
          <p>
            Community projects that use collected plastic to create murals,
            sculptures, and urban furniture, transforming trash into awareness
            and beauty.
          </p>
        </div>
        <div class="feature-card">
          <h3>Rapid Decay Plastics</h3>
          <p>
            Support the development and use of plastics that break down quickly
            with the help of natural microorganisms, reducing the time plastic
            pollutes the environment.
          </p>
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
