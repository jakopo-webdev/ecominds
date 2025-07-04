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
      <p class="page-description">Text 13</p>

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
      title: "Mission title",
      description: "Mission description",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
    },
    {
      id: 2,
      title: "Mission title",
      description: "Mission description",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
    },
    {
      id: 3,
      title: "Mission title",
      description: "Mission description",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
    },
    {
      id: 4,
      title: "Mission title",
      description: "Mission description",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
    },
    {
      id: 5,
      title: "Mission title",
      description: "Mission description",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
    },
  ];
}
