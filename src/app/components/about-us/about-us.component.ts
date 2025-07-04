import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <h1>About EcoMinds</h1>

      <section class="mission-section">
        <h2>Our Mission</h2>
        <p class="mission-text">Text 12</p>
      </section>

      <section class="vision-section">
        <h2>Our Vision</h2>
        <p class="vision-text">Text 13</p>
      </section>

      <section class="values-section">
        <h2>Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🌍</div>
            <h3>Environmental Stewardship</h3>
            <p>Text 14</p>
          </div>
          <div class="value-card">
            <div class="value-icon">♿</div>
            <h3>Accessibility First</h3>
            <p>Text 15</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3>Engagement Through Innovation</h3>
            <p>Text 16</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3>Inclusive Community</h3>
            <p>Text 17</p>
          </div>
        </div>
      </section>

      <section class="team-section">
        <h2>Our Development Team</h2>
        <p class="team-intro">
          EcoMinds is developed by a passionate team of educators, developers,
          and accessibility experts committed to creating meaningful educational
          experiences.
        </p>

        <div class="team-roles">
          <div class="role-group">
            <h3>🧑‍💼 Business Specialists</h3>
            <ul>
              <li>Text 18</li>
              <li>Text 19</li>
              <li>Text 20</li>
            </ul>
          </div>

          <div class="role-group">
            <h3>💻 Technical Development</h3>
            <ul>
              <li>Full-stack developers with accessibility expertise</li>
              <li>UI/UX designers specializing in inclusive design</li>
              <li>Quality assurance specialists</li>
            </ul>
          </div>

          <div class="role-group">
            <h3>🔬 Subject Matter Experts</h3>
            <ul>
              <li>Text 21</li>
              <li>Text 22</li>
              <li>Text 23</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="goals-section">
        <h2>Project Goals</h2>
        <div class="goals-list">
          <div class="goal-item">
            <div class="goal-number">1</div>
            <div class="goal-content">
              <h3>Accessibility Leadership</h3>
              <p>Text 24</p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">2</div>
            <div class="goal-content">
              <h3>Interactive Learning</h3>
              <p>Text 25</p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">3</div>
            <div class="goal-content">
              <h3>Scientific Accuracy</h3>
              <p>Text 26</p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">4</div>
            <div class="goal-content">
              <h3>Community Impact</h3>
              <p>Text 27</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent {}
