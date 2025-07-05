import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface HotspotData {
  id: string;
  name: string;
  coordinates: string;
  location: string;
  siteArea: number;
  population: number;
  waterDistance: number;
  waterType: string;
  elevation: number;
  slope: number;
  clayContent: number;
  sandContent: number;
  surfaceAreaHistory: {
    date: string;
    area: number;
  }[];
  plasticStats: {
    microplastics: string;
    sedimentMPs: string;
    shellfishContamination: string;
    seafloorLitter: string;
  };
  distanceToWater: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

interface SimulationState {
  currentHotspot: HotspotData | null;
  playerActions: string[];
  score: number;
  timeRemaining: number;
  isRunning: boolean;
  currentScenario: string;
  lastActionTime: number;
  lastActionType: string;
  personalRecord: number;
}

@Component({
  selector: "app-simulation",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="simulation-container">
      <div class="simulation-header">
        <h1>🌍 Mediterranean Pollution Crisis Simulator</h1>
        <p class="page-description">
          Explore real Italian pollution hotspots and make decisions to combat
          environmental threats
        </p>

        <div class="simulation-stats" *ngIf="simulationState.isRunning">
          <div class="stat-item">
            <span class="stat-label">🏆 Score:</span>
            <span class="stat-value">{{ simulationState.score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">⏱️ Time:</span>
            <span class="stat-value">{{ simulationState.timeRemaining }}s</span>
          </div>
        </div>

        <!-- Game Instructions -->
        <div
          class="game-instructions"
          *ngIf="!simulationState.isRunning && !simulationState.currentHotspot"
        >
          <div class="instructions-box">
            <h3>🎮 How to Play</h3>
            <ul>
              <li>
                ⏰ You have <strong>30 seconds</strong> to score as many points
                as possible
              </li>
              <li>
                🎯 Use multiple actions strategically - different actions give
                different points (10-25 points)
              </li>
              <li>
                ⚡ Cooldown system prevents spam clicking (1.5s between actions,
                3s for same action)
              </li>
              <li>🏆 Beat your personal record and earn the crown!</li>
              <li>🌍 Choose your location and start saving the environment!</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Hotspot Selection Screen -->
      <div
        class="hotspot-selection"
        *ngIf="!simulationState.isRunning && !simulationState.currentHotspot"
      >
        <h2>🗺️ Choose Your Mission Location</h2>
        <div class="hotspots-grid">
          <div
            class="hotspot-card"
            *ngFor="let hotspot of hotspots"
            [class]="'risk-' + hotspot.riskLevel"
            (click)="selectHotspot(hotspot)"
          >
            <div class="hotspot-header">
              <h3>{{ hotspot.name }}</h3>
              <span class="risk-badge" [class]="'risk-' + hotspot.riskLevel">
                {{ hotspot.riskLevel.toUpperCase() }} RISK
              </span>
            </div>
            <div class="hotspot-info">
              <p><strong>📍 Location:</strong> {{ hotspot.location }}</p>
              <p>
                <strong>🏠 Population:</strong> {{ hotspot.population }} within
                1km
              </p>
              <p>
                <strong>🌊 Water Distance:</strong> {{ hotspot.waterDistance }}m
                to {{ hotspot.waterType }}
              </p>
              <p>
                <strong>🐚 Shellfish Contamination:</strong>
                {{ hotspot.plasticStats.shellfishContamination }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Simulation -->
      <div
        class="active-simulation"
        *ngIf="simulationState.isRunning && simulationState.currentHotspot"
      >
        <div class="simulation-main">
          <div class="hotspot-details">
            <h2>
              🎯 Current Mission: {{ simulationState.currentHotspot.name }}
            </h2>
            <div class="location-info">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">📍 Coordinates:</span>
                  <span class="info-value">{{
                    simulationState.currentHotspot.coordinates
                  }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">📏 Site Area:</span>
                  <span class="info-value"
                    >{{ simulationState.currentHotspot.siteArea }} m²</span
                  >
                </div>
                <div class="info-item">
                  <span class="info-label">⛰️ Elevation:</span>
                  <span class="info-value"
                    >{{ simulationState.currentHotspot.elevation }} m</span
                  >
                </div>
                <div class="info-item">
                  <span class="info-label">📐 Slope:</span>
                  <span class="info-value"
                    >{{ simulationState.currentHotspot.slope }}°</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Scenario Display -->
          <div class="scenario-box">
            <h3>🎬 Current Scenario</h3>
            <p class="scenario-text">{{ simulationState.currentScenario }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="action-panel">
            <h3>🎮 Choose Your Action</h3>
            <div class="action-buttons">
              <button
                class="action-btn cleanup"
                (click)="takeAction('cleanup')"
                [disabled]="isActionDisabled('cleanup')"
              >
                🧹 Organize Cleanup (+15 points)
              </button>
              <button
                class="action-btn regulation"
                (click)="takeAction('regulation')"
                [disabled]="isActionDisabled('regulation')"
              >
                📋 Implement Regulations (+20 points)
              </button>
              <button
                class="action-btn education"
                (click)="takeAction('education')"
                [disabled]="isActionDisabled('education')"
              >
                🎓 Launch Education Campaign (+10 points)
              </button>
              <button
                class="action-btn monitoring"
                (click)="takeAction('monitoring')"
                [disabled]="isActionDisabled('monitoring')"
              >
                📊 Install Monitoring Systems (+25 points)
              </button>
            </div>
          </div>

          <!-- Real-time Data Visualization -->
          <div class="data-visualization">
            <h3>📈 Pollution Impact Over Time</h3>
            <div class="area-chart">
              <div class="chart-container">
                <div
                  class="chart-bar"
                  *ngFor="
                    let dataPoint of simulationState.currentHotspot
                      .surfaceAreaHistory;
                    let i = index
                  "
                  [style.height.%]="(dataPoint.area / getMaxArea()) * 100"
                  [title]="dataPoint.date + ': ' + dataPoint.area + ' m²'"
                >
                  <span class="bar-label">{{
                    dataPoint.date.split(" ")[1]
                  }}</span>
                </div>
              </div>
              <p class="chart-caption">
                Surface Area Contamination (m²) - Hover for details
              </p>
            </div>
          </div>

          <!-- Action History -->
          <div
            class="action-history"
            *ngIf="simulationState.playerActions.length > 0"
          >
            <h3>📝 Your Actions</h3>
            <ul class="action-list">
              <li
                *ngFor="let action of simulationState.playerActions"
                class="action-item"
              >
                {{ action }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="simulation-controls">
        <button
          class="control-btn start"
          *ngIf="!simulationState.isRunning && simulationState.currentHotspot"
          (click)="startSimulation()"
        >
          🚀 Start Mission
        </button>
        <button
          class="control-btn pause"
          *ngIf="simulationState.isRunning"
          (click)="pauseSimulation()"
        >
          ⏸️ Pause Mission
        </button>
        <button class="control-btn reset" (click)="resetSimulation()">
          🔄 Reset Simulation
        </button>
        <button
          class="control-btn new-location"
          *ngIf="simulationState.currentHotspot"
          (click)="selectNewLocation()"
        >
          🗺️ Choose New Location
        </button>
      </div>
      <!-- Results Summary -->
      <div
        class="results-summary"
        *ngIf="!simulationState.isRunning && simulationState.score > 0"
      >
        <h3>🎉 Mission Complete!</h3>
        <div class="final-score">
          <p>
            Final Score: <strong>{{ simulationState.score }} points</strong>
          </p>
          <p class="personal-record" *ngIf="simulationState.personalRecord > 0">
            Personal Record:
            <strong>{{ simulationState.personalRecord }} points</strong>
            <span
              *ngIf="simulationState.score >= simulationState.personalRecord"
              class="new-record"
              >🏆 NEW RECORD!</span
            >
          </p>
          <p class="score-message">{{ getScoreMessage() }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./simulation.component.scss"],
})
export class SimulationComponent implements OnInit {
  simulationState: SimulationState = {
    currentHotspot: null,
    playerActions: [],
    score: 0,
    timeRemaining: 30,
    isRunning: false,
    currentScenario: "",
    lastActionTime: 0,
    lastActionType: "",
    personalRecord: 0,
  };

  private timer: any;
  private scenarios: string[] = [
    "🚨 Alert: High microplastic concentration detected in local marine life!",
    "🐟 Local fishermen report unusual fish behavior and reduced catch sizes.",
    "🏖️ Tourists are avoiding the beach due to visible pollution and debris.",
    "🌊 Scientists detect alarming levels of seafloor contamination.",
    "📰 Media attention grows as environmental concerns reach national news.",
    "⚠️ Marine ecosystem showing signs of stress and biodiversity loss.",
    "🦐 Shellfish harvesting suspended due to contamination levels.",
    "🌍 Your actions are crucial for the future of this ecosystem!",
  ];

  hotspots: HotspotData[] = [
    {
      id: "olbia",
      name: "Via Lu Franzesu",
      coordinates: "40°53'28\" N 9°34'11\" E",
      location: "Murta Maria, Olbia (Sardinia)",
      siteArea: 490,
      population: 48,
      waterDistance: 438,
      waterType: "ocean",
      elevation: 6,
      slope: 2.49,
      clayContent: 28,
      sandContent: 36,
      surfaceAreaHistory: [
        { date: "December 2015", area: 301 },
        { date: "December 2017", area: 178 },
        { date: "December 2019", area: 194 },
        { date: "December 2021", area: 1033 },
      ],
      plasticStats: {
        microplastics: "~0.15 items/m³",
        sedimentMPs: "~15-25 items/kg",
        shellfishContamination: "70% contained microplastics",
        seafloorLitter: "Nearly 1,000 items over 18 km²",
      },
      distanceToWater: "2–2.5 km from Spiaggia di Porto Istana",
      riskLevel: "high",
    },
    {
      id: "iglesias",
      name: "Monte Agruxiau",
      coordinates: "39°18'59\" N 8°30'0\" E",
      location: "Circonvallazione di Iglesias, Bindua",
      siteArea: 6417,
      population: 9,
      waterDistance: 1089,
      waterType: "stream",
      elevation: 272,
      slope: 4.48,
      clayContent: 31,
      sandContent: 31,
      surfaceAreaHistory: [
        { date: "December 2015", area: 11379 },
        { date: "December 2017", area: 2831 },
        { date: "December 2019", area: 2430 },
        { date: "December 2022", area: 1259 },
      ],
      plasticStats: {
        microplastics: "~0.1–0.3 items/m³",
        sedimentMPs: "~17 items/kg",
        shellfishContamination: "50–70% of individuals contain MPs",
        seafloorLitter: "918 items over 18.4 km²",
      },
      distanceToWater: "3.2 km SW to Palude Sa Mesa",
      riskLevel: "medium",
    },
    {
      id: "latina",
      name: "Strada Provinciale 35A",
      coordinates: "41°31'1\" N 12°57'8\" E",
      location: "Piccarello, Latina Scalo, Latina",
      siteArea: 1474,
      population: 798,
      waterDistance: 72,
      waterType: "canal",
      elevation: 12,
      slope: 0.62,
      clayContent: 29,
      sandContent: 32,
      surfaceAreaHistory: [
        { date: "December 2015", area: 379 },
        { date: "December 2017", area: 1444 },
        { date: "December 2019", area: 1493 },
        { date: "February 2022", area: 2536 },
      ],
      plasticStats: {
        microplastics: "~0.15–0.4 items/m³",
        sedimentMPs: "~12–20 items/kg",
        shellfishContamination: "45–65% of individuals contain MPs",
        seafloorLitter: "500 items per km²",
      },
      distanceToWater: "1.8 km to Fosso di Terracina stream",
      riskLevel: "high",
    },
    {
      id: "villa-literno",
      name: "Via Quattro Novembre",
      coordinates: "41°31'1\" N 12°57'8\" E",
      location: "Villa Literno, Caserta",
      siteArea: 593,
      population: 18,
      waterDistance: 139,
      waterType: "canal",
      elevation: -2,
      slope: 0.51,
      clayContent: 24,
      sandContent: 36,
      surfaceAreaHistory: [
        { date: "December 2015", area: 3176 },
        { date: "December 2017", area: 469 },
        { date: "December 2019", area: 1601 },
        { date: "February 2022", area: 2254 },
      ],
      plasticStats: {
        microplastics: "~0.2–0.5 items/m³",
        sedimentMPs: "~20–30 items/kg",
        shellfishContamination: "55–75% of individuals contain MPs",
        seafloorLitter: "800–1,000 items/km²",
      },
      distanceToWater: "6.5 km west to Litorale Domizio coast",
      riskLevel: "critical",
    },
    {
      id: "liveri",
      name: "SP235 Liveri",
      coordinates: "40°53'57\" N 14°33'42\" E",
      location: "Liveri, Napoli",
      siteArea: 459,
      population: 1422,
      waterDistance: 410,
      waterType: "drain",
      elevation: 65,
      slope: 0.87,
      clayContent: 23,
      sandContent: 38,
      surfaceAreaHistory: [
        { date: "April 2015", area: 19180 },
        { date: "December 2017", area: 1889 },
        { date: "December 2019", area: 1371 },
        { date: "February 2022", area: 784 },
      ],
      plasticStats: {
        microplastics: "~0.1–0.3 items/m³",
        sedimentMPs: "~10–18 items/kg",
        shellfishContamination: "60–80% of individuals contain MPs",
        seafloorLitter: "600–900 items/km²",
      },
      distanceToWater: "4 km to Clanio River",
      riskLevel: "medium",
    },
    {
      id: "palmi",
      name: "Strada Comunale Pantano",
      coordinates: "38°22'41\" N 15°54'13\" E",
      location: "Prato Superiore, Palmi",
      siteArea: 1601,
      population: 2,
      waterDistance: 105,
      waterType: "drain",
      elevation: 44,
      slope: 2.54,
      clayContent: 32,
      sandContent: 29,
      surfaceAreaHistory: [
        { date: "December 2015", area: 1091 },
        { date: "December 2017", area: 3187 },
        { date: "December 2019", area: 1731 },
        { date: "February 2022", area: 6369 },
      ],
      plasticStats: {
        microplastics: "~0.2–0.4 items/m³",
        sedimentMPs: "~15–25 items/kg",
        shellfishContamination: "65–85% of individuals contain MPs",
        seafloorLitter: "700–1,100 items/km²",
      },
      distanceToWater: "5.5 km to Tyrrhenian Sea",
      riskLevel: "high",
    },
    {
      id: "gela",
      name: "Gela Industrial Zone",
      coordinates: "37°3'28\" N 14°17'38\" E",
      location: "Gela, Caltanissetta, Sicily",
      siteArea: 1149,
      population: 3,
      waterDistance: 94,
      waterType: "ditch",
      elevation: 13,
      slope: 0.31,
      clayContent: 29,
      sandContent: 32,
      surfaceAreaHistory: [
        { date: "February 2016", area: 1096 },
        { date: "December 2017", area: 1467 },
        { date: "December 2019", area: 1202 },
        { date: "February 2022", area: 1299 },
      ],
      plasticStats: {
        microplastics: "~0.3–0.6 items/m³",
        sedimentMPs: "~25–40 items/kg",
        shellfishContamination: "70–90% of individuals contain MPs",
        seafloorLitter: "1,000–1,500 items/km²",
      },
      distanceToWater: "0.5 km to Mediterranean Sea",
      riskLevel: "critical",
    },
  ];

  ngOnInit() {
    // Load personal record from localStorage
    const savedRecord = localStorage.getItem("ecominds-simulation-record");
    if (savedRecord) {
      this.simulationState.personalRecord = parseInt(savedRecord, 10);
    }
  }

  selectHotspot(hotspot: HotspotData) {
    this.simulationState.currentHotspot = hotspot;
    this.simulationState.currentScenario = this.getRandomScenario();
  }

  startSimulation() {
    this.simulationState.isRunning = true;
    this.simulationState.timeRemaining = 30;
    this.simulationState.lastActionTime = 0;
    this.simulationState.lastActionType = "";
    this.startTimer();
  }

  pauseSimulation() {
    this.simulationState.isRunning = false;
    this.stopTimer();
  }

  resetSimulation() {
    // Save personal record if current score is higher
    if (this.simulationState.score > this.simulationState.personalRecord) {
      this.simulationState.personalRecord = this.simulationState.score;
      localStorage.setItem(
        "ecominds-simulation-record",
        this.simulationState.personalRecord.toString()
      );
    }

    this.simulationState = {
      currentHotspot: null,
      playerActions: [],
      score: 0,
      timeRemaining: 30,
      isRunning: false,
      currentScenario: "",
      lastActionTime: 0,
      lastActionType: "",
      personalRecord: this.simulationState.personalRecord,
    };
    this.stopTimer();
  }

  selectNewLocation() {
    this.simulationState.currentHotspot = null;
    this.simulationState.isRunning = false;
    this.stopTimer();
  }

  takeAction(actionType: string) {
    // Prevent taking action if time is up
    if (this.simulationState.timeRemaining <= 0) {
      return;
    }

    const currentTime = Date.now();

    // Prevent spam clicking: 1.5 second cooldown between actions
    if (currentTime - this.simulationState.lastActionTime < 1500) {
      return;
    }

    // Additional cooldown for same action type: 3 seconds
    if (
      this.simulationState.lastActionType === actionType &&
      currentTime - this.simulationState.lastActionTime < 3000
    ) {
      return;
    }

    const actions = {
      cleanup: {
        points: 15,
        message:
          "🧹 Organized community cleanup - removed plastic debris from shoreline",
      },
      regulation: {
        points: 20,
        message:
          "📋 Implemented new regulations - stricter plastic waste controls",
      },
      education: {
        points: 10,
        message: "🎓 Launched education campaign - raised public awareness",
      },
      monitoring: {
        points: 25,
        message:
          "📊 Installed monitoring systems - real-time pollution tracking active",
      },
    };

    const action = actions[actionType as keyof typeof actions];
    if (action) {
      this.simulationState.score += action.points;
      this.simulationState.playerActions.push(action.message);
      this.simulationState.lastActionTime = currentTime;
      this.simulationState.lastActionType = actionType;
      this.simulationState.currentScenario = this.getRandomScenario();
    }
  }

  isActionDisabled(actionType: string): boolean {
    // Disable if time is up
    if (this.simulationState.timeRemaining <= 0) {
      return true;
    }

    const currentTime = Date.now();

    // General cooldown: 1.5 seconds between any actions
    if (currentTime - this.simulationState.lastActionTime < 1500) {
      return true;
    }

    // Same action cooldown: 3 seconds for the same action type
    if (
      this.simulationState.lastActionType === actionType &&
      currentTime - this.simulationState.lastActionTime < 3000
    ) {
      return true;
    }

    return false;
  }

  getMaxArea(): number {
    if (!this.simulationState.currentHotspot) return 1;
    return Math.max(
      ...this.simulationState.currentHotspot.surfaceAreaHistory.map(
        (d) => d.area
      )
    );
  }

  getRandomScenario(): string {
    return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
  }

  getScoreMessage(): string {
    const score = this.simulationState.score;
    if (score >= 100)
      return "🌟 Environmental Hero! You've made a significant impact!";
    if (score >= 75)
      return "🎯 Great Work! Your actions are making a real difference!";
    if (score >= 50)
      return "👍 Good Progress! Keep up the environmental efforts!";
    if (score >= 25)
      return "📈 Getting Started! Every action counts for the environment!";
    return "🌱 Beginning Journey! Try different actions to maximize your impact!";
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (
        this.simulationState.isRunning &&
        this.simulationState.timeRemaining > 0
      ) {
        this.simulationState.timeRemaining--;

        // End game when time runs out
        if (this.simulationState.timeRemaining === 0) {
          this.endGame();
        }
      }
    }, 1000);
  }

  private endGame() {
    this.simulationState.isRunning = false;
    this.stopTimer();

    // Save personal record if current score is higher
    if (this.simulationState.score > this.simulationState.personalRecord) {
      this.simulationState.personalRecord = this.simulationState.score;
      localStorage.setItem(
        "ecominds-simulation-record",
        this.simulationState.personalRecord.toString()
      );
    }
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
