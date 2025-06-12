import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Welcome to EcoMinds</h1>
        <p class="hero-subtitle">Your gateway to environmental education and awareness</p>
        <p class="hero-description">
          Discover the wonders of our planet through interactive simulations and engaging eco-missions. 
          Learn about environmental challenges and become a champion for sustainability.
        </p>
        <button class="start-button" routerLink="/simulation">
          Start Your Journey
        </button>
      </div>
      
      <div class="features-preview">
        <div class="feature-card">
          <h3>Interactive Simulations</h3>
          <p>Experience environmental scenarios through engaging simulations</p>
        </div>
        <div class="feature-card">
          <h3>Eco-Missions</h3>
          <p>Complete missions to learn about environmental conservation</p>
        </div>
        <div class="feature-card">
          <h3>Accessible Learning</h3>
          <p>Customizable settings for diverse learning needs</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}