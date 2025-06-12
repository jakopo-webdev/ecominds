import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 EcoMinds. Building environmental awareness through interactive learning.</p>
        <p class="footer-note">Prototype - Educational Platform for Environmental Education</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}