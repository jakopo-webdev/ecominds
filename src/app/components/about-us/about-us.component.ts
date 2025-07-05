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
        <p class="mission-text">
          EcoMinds empowers learners of all abilities to become environmental
          stewards through innovative, accessible educational experiences. We
          bridge the gap between environmental science and public understanding
          by creating inclusive learning platforms that make complex ecological
          concepts engaging and actionable for everyone.
        </p>
      </section>

      <section class="vision-section">
        <h2>Our Vision</h2>
        <p class="vision-text">
          We envision a world where environmental education is universally
          accessible, inspiring a generation of informed citizens who actively
          participate in protecting our planet. Through cutting-edge technology
          and inclusive design, we aim to democratize environmental knowledge
          and foster global environmental consciousness.
        </p>
      </section>

      <section class="values-section">
        <h2>Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🌍</div>
            <h3>Environmental Stewardship</h3>
            <p>
              We believe in fostering deep connections between people and
              nature, promoting sustainable practices that protect ecosystems
              for future generations while respecting the interconnectedness of
              all life.
            </p>
          </div>
          <div class="value-card">
            <div class="value-icon">♿</div>
            <h3>Accessibility First</h3>
            <p>
              Every learner deserves equal access to environmental education. We
              prioritize universal design, ensuring our platform serves users
              with diverse abilities, learning styles, and technological
              capabilities.
            </p>
          </div>
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3>Engagement Through Innovation</h3>
            <p>
              We harness the power of interactive simulations, real-world data,
              and gamification to transform environmental learning from passive
              consumption to active exploration and discovery.
            </p>
          </div>
          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3>Inclusive Community</h3>
            <p>
              Environmental challenges require collective action. We build
              bridges across communities, cultures, and capabilities to create a
              unified movement toward sustainability and environmental justice.
            </p>
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
              <li>
                Environmental policy analysts and sustainability consultants
              </li>
              <li>
                Educational technology strategists and curriculum designers
              </li>
              <li>Accessibility advocates and disability rights specialists</li>
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
              <li>Marine biologists and environmental scientists</li>
              <li>Climate change researchers and data visualization experts</li>
              <li>
                Educational psychologists and learning assessment specialists
              </li>
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
              <p>
                Set the gold standard for accessible environmental education by
                implementing comprehensive WCAG guidelines, supporting assistive
                technologies, and continuously improving based on user feedback
                from diverse communities.
              </p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">2</div>
            <div class="goal-content">
              <h3>Interactive Learning</h3>
              <p>
                Transform passive environmental education into engaging,
                hands-on experiences through interactive simulations, real-time
                data visualization, and gamified learning paths that adapt to
                individual learning preferences.
              </p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">3</div>
            <div class="goal-content">
              <h3>Scientific Accuracy</h3>
              <p>
                Maintain the highest standards of scientific integrity by
                partnering with leading research institutions, utilizing
                peer-reviewed data sources, and ensuring all content is
                fact-checked by subject matter experts.
              </p>
            </div>
          </div>

          <div class="goal-item">
            <div class="goal-number">4</div>
            <div class="goal-content">
              <h3>Community Impact</h3>
              <p>
                Foster real-world environmental action by connecting users with
                local conservation initiatives, providing tools for community
                engagement, and measuring the tangible impact of our educational
                programs on environmental awareness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent {}
