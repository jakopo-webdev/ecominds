import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <h1>About EcoMinds</h1>
      
      <section class="mission-section">
        <h2>Our Mission</h2>
        <p class="mission-text">
          EcoMinds is dedicated to creating an engaging, accessible environmental education platform 
          that empowers learners of all ages and abilities to understand and address environmental challenges. 
          Through interactive simulations, gamified missions, and inclusive design, we make environmental 
          science accessible to everyone.
        </p>
      </section>

      <section class="vision-section">
        <h2>Our Vision</h2>
        <p class="vision-text">
          We envision a world where environmental education is engaging, inclusive, and impactful. 
          By breaking down barriers to learning and making complex environmental concepts understandable 
          through interactive experiences, we aim to cultivate a generation of environmentally conscious citizens.
        </p>
      </section>

      <section class="values-section">
        <h2>Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🌍</div>
            <h3>Environmental Stewardship</h3>
            <p>Promoting responsible care for our planet through education and awareness</p>
          </div>
          <div class="value-card">
            <div class="value-icon">♿</div>
            <h3>Accessibility First</h3>
            <p>Ensuring our platform is usable by learners with diverse needs and abilities</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3>Engagement Through Innovation</h3>
            <p>Using cutting-edge technology to make learning interactive and meaningful</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3>Inclusive Community</h3>
            <p>Building a welcoming space for all learners regardless of background or ability</p>
          </div>
        </div>
      </section>

      <section class="team-section">
        <h2>Our Development Team</h2>
        <p class="team-intro">
          EcoMinds is developed by a passionate team of educators, developers, and accessibility experts 
          committed to creating meaningful educational experiences.
        </p>
        
        <div class="team-roles">
          <div class="role-group">
            <h3>🎓 Educational Design</h3>
            <ul>
              <li>Curriculum specialists with expertise in environmental science</li>
              <li>Learning experience designers focused on accessibility</li>
              <li>Educational technology researchers</li>
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
              <li>Environmental scientists and researchers</li>
              <li>Climate change specialists</li>
              <li>Sustainability consultants</li>
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
              <p>Set new standards for accessibility in educational technology, ensuring our platform works for users with dyslexia, visual impairments, motor disabilities, and other accessibility needs.</p>
            </div>
          </div>
          
          <div class="goal-item">
            <div class="goal-number">2</div>
            <div class="goal-content">
              <h3>Interactive Learning</h3>
              <p>Transform passive environmental education into active, engaging experiences through simulations, gamification, and hands-on activities.</p>
            </div>
          </div>
          
          <div class="goal-item">
            <div class="goal-number">3</div>
            <div class="goal-content">
              <h3>Scientific Accuracy</h3>
              <p>Provide accurate, up-to-date environmental science content backed by current research and expert review.</p>
            </div>
          </div>
          
          <div class="goal-item">
            <div class="goal-number">4</div>
            <div class="goal-content">
              <h3>Community Impact</h3>
              <p>Inspire real-world environmental action by connecting learning to practical solutions and community engagement opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="prototype-note">
        <div class="note-content">
          <h3>🚀 Prototype Status</h3>
          <p>
            This is a prototype version of EcoMinds, showcasing the platform's structure, 
            navigation, and accessibility features. The full version will include interactive 
            simulations, comprehensive mission content, and advanced accessibility features.
          </p>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {}