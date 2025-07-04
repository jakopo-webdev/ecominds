import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  category: string;
}

@Component({
  selector: "app-eco-missions",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="missions-container">
      <h1>Eco-Missions</h1>
      <p class="page-description">
        Complete environmental missions to learn and make a difference
      </p>

      <div class="missions-grid">
        <div class="mission-card" *ngFor="let mission of missions">
          <div class="mission-header">
            <h3>{{ mission.title }}</h3>
            <span
              class="difficulty-badge"
              [class]="'difficulty-' + mission.difficulty.toLowerCase()"
            >
              {{ mission.difficulty }}
            </span>
          </div>
          <p class="mission-description">{{ mission.description }}</p>
          <div class="mission-meta">
            <span class="duration">⏱️ {{ mission.duration }}</span>
            <span class="category">🏷️ {{ mission.category }}</span>
          </div>
          <button
            class="start-mission-btn"
            [routerLink]="['/mission-details', mission.id]"
          >
            Start Mission
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./eco-missions.component.scss"],
})
export class EcoMissionsComponent {
  missions: Mission[] = [
    {
      id: 1,
      title: "🌱 Mindful Eating",
      description:
        "Discover the environmental impact of your diet and commit to eating a vegetarian meal for one day.",
      difficulty: "Easy",
      duration: "20 mins",
      category: "Food",
    },
    {
      id: 2,
      title: "💧 Water Conservation Challenge",
      description:
        "Learn about water conservation techniques and implement them in your daily life.",
      difficulty: "Easy",
      duration: "15 mins",
      category: "Water",
    },
    {
      id: 3,
      title: "♻️ Recycling Spot Rescue",
      description:
        "Visit or research a local recycling point. Sort 10 household items correctly for recycling or reuse.",
      difficulty: "Medium",
      duration: "40 mins",
      category: "Waste",
    },
    {
      id: 4,
      title: "🏠 Green Makeover",
      description:
        "Identify areas in your home where energy is being wasted and propose at least 3 practical eco-friendly upgrades.",
      difficulty: "Medium",
      duration: "45 mins",
      category: "Energy / Housing",
    },
    {
      id: 5,
      title: "🚗 MuevetEX – Move with Impact",
      description:
        "Explore how shared sustainable mobility can improve quality of life while supporting local businesses and reducing emissions.",
      difficulty: "Medium",
      duration: "40 mins",
      category: "Sustainable Transport",
    },
  ];
}
