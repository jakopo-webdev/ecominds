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
      title: "🌱 Mindful Eating",
      description:
        "Discover the environmental impact of your diet and commit to eating a vegetarian meal for one day.",
      difficulty: "Easy",
      duration: "20 mins",
      category: "Food",
      objectives: [
        "🌍 Reduce your environmental footprint through conscious eating",
        "🌱 Try out a plant-based diet for a day",
        "🧠 Raise awareness of the environmental impact of animal products",
        "🍽 Discover new vegetarian meals and flavors",
      ],
      steps: [
        "Pick a day to have your vegetarian meal (today or later this week)",
        "Do a quick research on low-impact foods (like legumes, seasonal veggies, whole grains)",
        "Plan your meal: choose whether it'll be breakfast, lunch, or dinner—keep it simple and tasty",
        "Shop mindfully: choose local, seasonal, and low-packaging ingredients",
        "Cook with intention, focusing on colors, textures, and aromas",
      ],
      tips: [
        "🍛 Start with familiar dishes like veggie pasta, chickpea curry, lentil tacos, or a hearty salad",
        "🧾 Read labels to avoid hidden animal products (like gelatin or meat-based broths)",
        "🌿 Use plant-based proteins like tofu, tempeh, legumes, or nuts",
        "🍋 Add flavor with spices and herbs—they're key to not missing meat",
        "👥 Do it with a friend for motivation and fun",
      ],
    },
    {
      id: 2,
      title: "💧 Water Conservation Challenge",
      description:
        "Learn about water conservation techniques and implement them in your daily life.",
      difficulty: "Easy",
      duration: "15 mins",
      category: "Water",
      objectives: [
        "💦 Reduce your daily water usage and waste",
        "🌍 Contribute to the sustainability of global water resources",
        "🧠 Raise awareness about how everyday habits affect water consumption",
        "🛠 Learn simple techniques to conserve water at home",
      ],
      steps: [
        "Learn about water usage: Understand how much water you use daily (showers, dishes, laundry, etc.)",
        "Pick 2–3 conservation techniques to implement today (e.g., shorter showers, turning off the tap while brushing)",
        "Use a timer when showering or watering plants",
        "Collect and reuse water when possible (e.g., leftover drinking water to water plants)",
        "Talk about it: Share what you're doing with friends or family to spread awareness",
      ],
      tips: [
        "🚿 Take 5-minute showers—use a timer or play a short song",
        "🪥 Turn off the tap while brushing your teeth or washing your hands",
        "🧼 Only run full loads in the dishwasher or washing machine",
        "💧 Install water-saving devices like aerators or low-flow showerheads",
        "📱 Use water tracking apps to monitor your consumption",
      ],
    },
    {
      id: 3,
      title: "♻️ Recycling Spot Rescue",
      description:
        "Visit or research a local recycling point. Sort 10 household items correctly for recycling or reuse.",
      difficulty: "Medium",
      duration: "40 mins",
      category: "Waste",
      objectives: [
        "♻ Learn how to correctly identify and sort recyclable and reusable household items",
        "🏠 Reduce the amount of household waste sent to landfills",
        "🌍 Contribute to a more effective recycling system",
        "📍 Discover local recycling points and what they accept",
        "🔁 Build sustainable habits at home",
      ],
      steps: [
        "Research or visit a nearby recycling point (this could be a municipal center, a supermarket drop-off spot, or public recycling bins)",
        "Learn what materials are accepted and how they should be sorted (clean, dry, separated by type)",
        "Go through your home and find at least 10 items you no longer use (bottles, paper, cans, textiles, electronics, etc.)",
        "Sort them properly into categories: plastic, paper, glass, metal, organic waste, or reusable items",
        "Take them to the correct recycling point or prepare them for scheduled collection",
      ],
      tips: [
        "🧴 Check recycling symbols on packaging (the triangle with a number indicates the type of plastic)",
        "🧃 Don't recycle items contaminated with food, like greasy pizza boxes or dirty paper towels",
        "🔌 Take electronics and batteries to designated drop-off points—they don't belong in regular bins",
        "🥫 Crush cans and bottles to save space at home and in recycling containers",
        "👕 Donate or repurpose clothes before throwing them away—many recycling points accept textiles",
        "🗓 Make it a weekly habit: create a dedicated space at home for sorting recyclables",
      ],
    },
    {
      id: 4,
      title: "🏠 Green Makeover",
      description:
        "Identify areas in your home where energy is being wasted and propose at least 3 practical eco-friendly upgrades to improve efficiency and reduce your carbon footprint.",
      difficulty: "Medium",
      duration: "45 mins",
      category: "Energy / Housing",
      objectives: [
        "🔍 Survey your space and identify energy waste areas",
        "📊 Analyze your energy consumption patterns",
        "♻ Propose 3 or more practical green upgrades",
        "📋 Create an action plan for implementation",
      ],
      steps: [
        "Survey your space. Walk through your home and look for areas where energy might be wasted. Focus on: Lighting, Windows and doors, Appliances, Heating/cooling systems",
        "Analyze energy. Check your latest electricity bill to identify high-consumption patterns",
        "Propose 3 Green Upgrades: Replace old bulbs with LEDs, Seal gaps in windows with weather stripping, Install smart plugs or timers for electronics",
        "Add thick curtains to reduce heat/cold loss",
        "Unplug appliances when not in use or use a power strip",
      ],
      tips: [
        "💡 Don't try to fix everything at once — small changes add up",
        "🔧 Use free tools like the EPA Home Energy Yardstick (if available in your country)",
        "👥 Involve your household — a team effort is more effective",
        "💰 Consider local programs or rebates for green improvements",
      ],
    },
    {
      id: 5,
      title: "🚗 MuevetEX – Move with Impact",
      description:
        "Explore how shared sustainable mobility can improve quality of life in rural areas while supporting local businesses and reducing emissions.",
      difficulty: "Medium",
      duration: "40 mins",
      category: "Sustainable Transport",
      objectives: [
        "✅ Allow people to move without relying on scarce public transport",
        "✅ Reduce CO₂ emissions (from 3.6 kg to 1.2 kg per shared daily trip)",
        "✅ Save money by sharing transport costs",
        "✅ Support and revitalize local businesses through a rewards system",
        "✅ Encourage community collaboration and cohesion",
        "✅ Boost the local economy and small business jobs",
      ],
      steps: [
        "Analyze your transport needs: Make a list of your trips to school, the doctor, or shops",
        "Discover sustainable alternatives: Discuss with your family or neighbors about sharing rides to reduce the number of cars in use",
        "Connect with local commerce: Identify local shops you can visit while sharing transport",
        "Calculate your environmental impact: Compare your current emissions with those you would have by sharing a ride: each shared trip reduces emissions by 66%",
        "Create your personal sustainable mobility plan: Plan to share at least one ride per week to start",
      ],
      tips: [
        "🌿 Use community boards or WhatsApp groups to coordinate shared trips",
        "🌿 Combine shopping with shared trips to save time and emissions",
        "🌿 Ask your local council if a program like MuevetEX is available in your area",
        "🌿 Use CO₂ calculators to measure your positive impact",
        "🌿 Start small: one shared trip per week already makes a difference",
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.mission = this.missions.find((m) => m.id === id) || null;
  }
}
