import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-simulation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="simulation-container">
      <h1>Text 10</h1>
      <p class="page-description">Text 11</p>

      <div class="simulation-placeholder">
        <div class="placeholder-content">
          <h2>Simulation Loading...</h2>
          <p>Interactive environmental simulation will be displayed here</p>
          <div class="placeholder-features">
            <div class="feature-item">🌊 Ocean Ecosystem</div>
          </div>
        </div>
      </div>

      <div class="simulation-controls">
        <button class="control-btn">Start Simulation</button>
        <button class="control-btn secondary">Reset</button>
      </div>
    </div>
  `,
  styleUrls: ["./simulation.component.scss"],
})
export class SimulationComponent {}
