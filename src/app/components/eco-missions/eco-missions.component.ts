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
      title: "Water Conservation Challenge",
      description:
        "Learn about water conservation techniques and implement them in your daily life",
      difficulty: "Easy",
      duration: "15 mins",
      category: "Water",
    },
    {
      id: 2,
      title: "Carbon Footprint Tracker",
      description:
        "Calculate and reduce your carbon footprint through practical activities",
      difficulty: "Medium",
      duration: "30 mins",
      category: "Climate",
    },
    {
      id: 3,
      title: "Biodiversity Explorer",
      description:
        "Discover local ecosystems and their importance to environmental health",
      difficulty: "Medium",
      duration: "25 mins",
      category: "Wildlife",
    },
    {
      id: 4,
      title: "Renewable Energy Pioneer",
      description:
        "Explore different renewable energy sources and their environmental impact",
      difficulty: "Hard",
      duration: "45 mins",
      category: "Energy",
    },
    {
      id: 5,
      title: "Waste Reduction Professional",
      description:
        "Master the art of reducing, reusing, and recycling in everyday situations",
      difficulty: "Easy",
      duration: "20 mins",
      category: "Waste",
    },
    {
      id: 6,
      title: "Sustainable Transportation",
      description:
        "Discover eco-friendly transportation options and their environmental benefits",
      difficulty: "Medium",
      duration: "35 mins",
      category: "Transport",
    },
  ];
}
