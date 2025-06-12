import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accessibility-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="accessibility-container">
      <h1>Accessibility Settings</h1>
      <p class="page-description">Customize your learning experience to meet your needs</p>
      
      <div class="settings-sections">
        <section class="settings-section">
          <h2>Visual Accessibility</h2>
          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.dyslexiaFont"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Dyslexia-Friendly Font</strong>
                <p>Use OpenDyslexic font to improve readability for users with dyslexia</p>
              </div>
            </label>
          </div>
          
          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.highContrast"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>High Contrast Mode</strong>
                <p>Increase contrast for better visibility</p>
              </div>
            </label>
          </div>

          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.largeCursor"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Large Cursor</strong>
                <p>Make the cursor larger and more visible</p>
              </div>
            </label>
          </div>
        </section>

        <section class="settings-section">
          <h2>Audio Accessibility</h2>
          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.narrationMode"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Text-to-Speech Narration</strong>
                <p>Enable audio narration for all text content</p>
              </div>
            </label>
          </div>

          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.soundEffects"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Sound Effects</strong>
                <p>Play audio feedback for interactions and achievements</p>
              </div>
            </label>
          </div>

          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.audioDescriptions"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Audio Descriptions</strong>
                <p>Provide audio descriptions for visual content</p>
              </div>
            </label>
          </div>
        </section>

        <section class="settings-section">
          <h2>Interaction Accessibility</h2>

          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.keyboardNavigation"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Enhanced Keyboard Navigation</strong>
                <p>Improve keyboard navigation with visible focus indicators</p>
              </div>
            </label>
          </div>

          <div class="setting-item">
            <label class="setting-label">
              <input 
                type="checkbox" 
                [(ngModel)]="settings.slowAnimations"
                class="setting-checkbox"
              >
              <span class="checkmark"></span>
              <div class="setting-info">
                <strong>Slower Animations</strong>
                <p>Reduce animation speed for better comprehension</p>
              </div>
            </label>
          </div>
        </section>
      </div>

      <div class="settings-actions">
        <button class="save-btn" (click)="saveSettings()">Save Settings</button>
        <button class="reset-btn" (click)="resetSettings()">Reset to Default</button>
      </div>
  `,
  styleUrls: ['./accessibility-settings.component.scss']
})
export class AccessibilitySettingsComponent {
  settings = {
    dyslexiaFont: false,
    narrationMode: false,
    highContrast: false,
    largeCursor: false,
    keyboardNavigation: false,
    soundEffects: true,
    audioDescriptions: false,
    slowAnimations: false
  };

  saveSettings() {
    // Save to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    // Apply dyslexia font immediately
    if (this.settings.dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    console.log('Settings saved:', this.settings);
    alert('Settings have been applied successfully!');
  }

  resetSettings() {
    this.settings = {
      dyslexiaFont: false,
      narrationMode: false,
      highContrast: false,
      largeCursor: false,
      keyboardNavigation: false,
      soundEffects: true,
      audioDescriptions: false,
      slowAnimations: false
    };
    // Remove dyslexia font if present
    document.body.classList.remove('dyslexia-font');
    localStorage.removeItem('accessibilitySettings');
    console.log('Settings reset to default');
  }

  ngOnInit() {
    // Load settings from localStorage if available
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
      if (this.settings.dyslexiaFont) {
        document.body.classList.add('dyslexia-font');
      }
    }
  }

  hasActiveSettings(): boolean {
    return Object.values(this.settings).some(value => value === true);
  }
}