import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
  selector: 'app-mission-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mission-details-container" *ngIf="mission">
      <div class="mission-header">
        <button class="back-btn" routerLink="/eco-missions">← Back to Missions</button>
        <div class="mission-title-section">
          <h1>{{ mission.title }}</h1>
          <div class="mission-badges">
            <span class="difficulty-badge" [class]="'difficulty-' + mission.difficulty.toLowerCase()">
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
            <li *ngFor="let objective of mission.objectives">{{ objective }}</li>
          </ul>
        </section>

        <section class="mission-steps">
          <h2>Mission Steps</h2>
          <div class="steps-list">
            <div class="step-item" *ngFor="let step of mission.steps; let i = index">
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
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent implements OnInit {
  mission: MissionDetail | null = null;

  private missions: MissionDetail[] = [
    {
      id: 1,
      title: "Water Conservation Challenge",
      description: "Learn about water conservation techniques and implement them in your daily life to make a positive environmental impact.",
      difficulty: "Easy",
      duration: "15 mins",
      category: "Water",
      objectives: [
        "Understand the importance of water conservation",
        "Learn practical water-saving techniques",
        "Calculate your water usage and potential savings",
        "Create a personal water conservation plan"
      ],
      steps: [
        "Complete the water usage assessment quiz",
        "Watch the interactive water cycle demonstration",
        "Learn about 5 key water conservation techniques",
        "Practice implementing techniques in virtual scenarios",
        "Create your personalized water conservation checklist"
      ],
      tips: [
        "Focus on one technique at a time for better retention",
        "Take notes during the demonstration for reference",
        "Don't worry if you don't get everything right the first time",
        "The quiz can be retaken to improve your score"
      ]
    },
    {
      id: 2,
      title: "Carbon Footprint Tracker",
      description: "Calculate and reduce your carbon footprint through practical activities and learn about climate impact.",
      difficulty: "Medium",
      duration: "30 mins",
      category: "Climate",
      objectives: [
        "Understand what carbon footprint means",
        "Learn to calculate personal carbon emissions",
        "Discover reduction strategies",
        "Create an action plan for carbon reduction"
      ],
      steps: [
        "Complete the carbon footprint calculator",
        "Analyze your results and identify high-impact areas",
        "Explore carbon reduction strategies",
        "Practice making eco-friendly choices in scenarios",
        "Design your personal carbon reduction plan"
      ],
      tips: [
        "Be honest in the calculator for accurate results",
        "Focus on changes that fit your lifestyle",
        "Small consistent changes make a big difference",
        "Track your progress over time"
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mission = this.missions.find(m => m.id === id) || null;
  }
}