import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";

interface MissionDetail {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  category: string;
  objectives: string[];
  steps: string[];
  tips: string[];
}

@Component({
  selector: "app-mission-details",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mission-details-container" *ngIf="mission">
      <div class="mission-header">
        <button class="back-btn" routerLink="/eco-missions">
          ← Back to Missions
        </button>
        <div class="mission-title-section">
          <h1>{{ mission.title }}</h1>
          <div class="mission-badges">
            <span
              class="difficulty-badge"
              [class]="'difficulty-' + mission.difficulty.toLowerCase()"
            >
              {{ mission.difficulty }}
            </span>
            <span class="duration-badge">⏱️ {{ mission.duration }}</span>
            <span class="category-badge">🏷️ {{ mission.category }}</span>
          </div>
        </div>
      </div>

      <div class="mission-content">
        <section class="mission-description">
          <h2>Mission Overview</h2>
          <p>{{ mission.description }}</p>
        </section>

        <section class="mission-objectives">
          <h2>Learning Objectives</h2>
          <ul>
            <li *ngFor="let objective of mission.objectives">
              {{ objective }}
            </li>
          </ul>
        </section>

        <section class="mission-steps">
          <h2>Mission Steps</h2>
          <div class="steps-list">
            <div
              class="step-item"
              *ngFor="let step of mission.steps; let i = index"
            >
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-content">{{ step }}</div>
            </div>
          </div>
        </section>

        <section class="mission-tips">
          <h2>💡 Helpful Tips</h2>
          <ul class="tips-list">
            <li *ngFor="let tip of mission.tips">{{ tip }}</li>
          </ul>
        </section>

        <div class="mission-actions">
          <button class="start-btn">Start Mission</button>
          <button class="bookmark-btn">Bookmark for Later</button>
        </div>
      </div>
    </div>

    <div class="not-found" *ngIf="!mission">
      <h2>Mission Not Found</h2>
      <p>The mission you're looking for doesn't exist.</p>
      <button routerLink="/eco-missions">Back to Missions</button>
    </div>
  `,
  styleUrls: ["./mission-details.component.scss"],
})
export class MissionDetailsComponent implements OnInit {
  mission: MissionDetail | null = null;

  private missions: MissionDetail[] = [
    {
      id: 1,
      title: "Mission title",
      description:
        "Mission description goes here. It should provide a brief overview of what the mission entails and its significance in environmental education.",
      difficulty: "Easy",
      duration: "XX mins",
      category: "Category",
      objectives: ["Objective 1", "Objective 2", "Objective 3", "Objective 4"],
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
      tips: ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.mission = this.missions.find((m) => m.id === id) || null;
  }
}
