import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AccessibilityService {
  private speechSynthesis: SpeechSynthesis | null = null;
  private isNarrating = false;
  private settings = {
    dyslexiaFont: false,
    narrationMode: false,
    highContrast: false,
    largeCursor: false,
    keyboardNavigation: false,
    soundEffects: true,
    slowAnimations: false,
  };

  constructor() {
    this.loadSettings();
    this.applySettings();
    this.initializeSoundEffects();
  }

  getSettings() {
    return { ...this.settings };
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
    this.applySettings();
  }

  private loadSettings() {
    const saved = localStorage.getItem("accessibilitySettings");
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }

  private saveSettings() {
    localStorage.setItem(
      "accessibilitySettings",
      JSON.stringify(this.settings)
    );
  }

  private applySettings() {
    // Apply dyslexia font
    if (this.settings.dyslexiaFont) {
      document.body.classList.add("dyslexia-font");
    } else {
      document.body.classList.remove("dyslexia-font");
    }

    // Apply high contrast mode
    if (this.settings.highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }

    // Apply large cursor
    if (this.settings.largeCursor) {
      document.body.classList.add("large-cursor");
    } else {
      document.body.classList.remove("large-cursor");
    }

    // Apply narration mode
    this.toggleNarrationMode();

    // Apply sound effects
    this.toggleSoundEffects();
  }

  resetSettings() {
    this.settings = {
      dyslexiaFont: false,
      narrationMode: false,
      highContrast: false,
      largeCursor: false,
      keyboardNavigation: false,
      soundEffects: false,
      slowAnimations: false,
    };

    // Remove all accessibility classes
    document.body.classList.remove("dyslexia-font");
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("large-cursor");
    this.removeNarrationListeners();
    this.removeSoundEffects();

    localStorage.removeItem("accessibilitySettings");
  }

  private toggleNarrationMode() {
    if (this.settings.narrationMode) {
      this.addNarrationListeners();
      document.body.classList.add("narration-enabled");
    } else {
      this.removeNarrationListeners();
      document.body.classList.remove("narration-enabled");
    }
  }

  private toggleSoundEffects() {
    if (this.settings.soundEffects) {
      this.addSoundEffectListeners();
    } else {
      this.removeSoundEffects();
    }
  }

  private addNarrationListeners() {
    // Initialize speech synthesis if available
    if ("speechSynthesis" in window) {
      this.speechSynthesis = window.speechSynthesis;

      // Remove existing listeners first to avoid duplicates
      this.removeNarrationListeners();

      // Use event delegation for better performance and dynamic content support
      document.body.addEventListener(
        "mouseenter",
        this.handleTextHover.bind(this),
        true
      );
      document.body.addEventListener(
        "mouseleave",
        this.handleTextLeave.bind(this),
        true
      );
    }
  }

  private removeNarrationListeners() {
    // Stop any ongoing speech
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }

    // Remove event listeners
    document.body.removeEventListener(
      "mouseenter",
      this.handleTextHover.bind(this),
      true
    );
    document.body.removeEventListener(
      "mouseleave",
      this.handleTextLeave.bind(this),
      true
    );

    // Remove narration mode class
    document.body.classList.remove("narration-enabled");
  }

  private handleTextHover(event: Event) {
    if (!this.settings.narrationMode || this.isNarrating) return;

    const element = event.target as HTMLElement;

    // Only handle text elements
    if (!this.isTextElement(element)) return;

    const text = this.getCleanText(element);

    if (text && text.trim().length > 0 && this.speechSynthesis) {
      this.isNarrating = true;

      // Add visual feedback
      element.classList.add("narration-active");

      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slightly slower for better comprehension
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.lang = "en-US"; // Force English language

      // Try to use an English voice if available
      const englishVoice = this.getEnglishVoice();
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        this.isNarrating = false;
        element.classList.remove("narration-active");
      };

      utterance.onerror = () => {
        this.isNarrating = false;
        element.classList.remove("narration-active");
      };

      // Speak the text
      this.speechSynthesis.speak(utterance);
    }
  }

  private handleTextLeave(event: Event) {
    if (!this.settings.narrationMode) return;

    // Stop speaking when mouse leaves the element and remove visual feedback
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.isNarrating = false;
    }

    // Remove visual feedback
    const element = event.target as HTMLElement;
    element.classList.remove("narration-active");
  }

  private isTextElement(element: HTMLElement): boolean {
    const textTags = [
      "P",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "SPAN",
      "DIV",
      "A",
      "BUTTON",
      "LABEL",
      "LI",
      "TD",
      "TH",
    ];
    return textTags.includes(element.tagName);
  }

  private getCleanText(element: HTMLElement): string {
    // Skip certain element types
    if (
      element.tagName === "SCRIPT" ||
      element.tagName === "STYLE" ||
      element.tagName === "NOSCRIPT"
    ) {
      return "";
    }

    // Skip empty elements or elements with only whitespace
    const text = element.textContent || "";
    if (!text.trim()) {
      return "";
    }

    // Skip very short text (less than 3 characters)
    if (text.trim().length < 3) {
      return "";
    }

    // Don't read very long texts (over 200 characters)
    let cleanText = text.trim();
    if (cleanText.length > 200) {
      cleanText = cleanText.substring(0, 200) + "...";
    }

    // Clean up extra whitespace
    cleanText = cleanText.replace(/\s+/g, " ");

    // Skip if text is just symbols or numbers without context
    if (/^[^\w\s]*$/.test(cleanText) || /^\d+$/.test(cleanText)) {
      return "";
    }

    return cleanText;
  }

  private getEnglishVoice(): SpeechSynthesisVoice | null {
    if (!this.speechSynthesis) return null;

    const voices = this.speechSynthesis.getVoices();

    // Try to find the best English voice (prioritize US English)
    const englishVoices = voices.filter(
      (voice) =>
        voice.lang.startsWith("en-US") ||
        voice.lang.startsWith("en-GB") ||
        voice.lang.startsWith("en")
    );

    if (englishVoices.length > 0) {
      // Prefer US English, then GB English, then any English
      return (
        englishVoices.find((v) => v.lang === "en-US") ||
        englishVoices.find((v) => v.lang === "en-GB") ||
        englishVoices[0]
      );
    }

    return null;
  }

  destroy() {
    this.removeNarrationListeners();
    this.removeSoundEffects();
  }

  // Sound Effects Methods
  private initializeSoundEffects() {
    if (this.settings.soundEffects) {
      this.addSoundEffectListeners();
    }
  }

  private addSoundEffectListeners() {
    // Add click sound effects to interactive elements
    document.addEventListener("click", this.handleClickSound.bind(this));
    document.addEventListener(
      "mouseenter",
      this.handleHoverSound.bind(this),
      true
    );

    // Add focus sound effects for keyboard navigation
    document.addEventListener("focus", this.handleFocusSound.bind(this), true);

    // Add form interaction sounds
    document.addEventListener(
      "change",
      this.handleChangeSound.bind(this),
      true
    );
  }

  private removeSoundEffects() {
    document.removeEventListener("click", this.handleClickSound.bind(this));
    document.removeEventListener(
      "mouseenter",
      this.handleHoverSound.bind(this),
      true
    );
    document.removeEventListener(
      "focus",
      this.handleFocusSound.bind(this),
      true
    );
    document.removeEventListener(
      "change",
      this.handleChangeSound.bind(this),
      true
    );
  }

  private handleClickSound(event: Event) {
    if (!this.settings.soundEffects) return;

    const element = event.target as HTMLElement;

    if (this.isInteractiveElement(element)) {
      this.playSound("click", element);
    }
  }

  private handleHoverSound(event: Event) {
    if (!this.settings.soundEffects) return;

    const element = event.target as HTMLElement;

    if (this.isInteractiveElement(element) && element.tagName === "BUTTON") {
      this.playSound("hover", element);
    }
  }

  private handleFocusSound(event: Event) {
    if (!this.settings.soundEffects) return;

    const element = event.target as HTMLElement;

    if (this.isInteractiveElement(element)) {
      this.playSound("focus", element);
    }
  }

  private handleChangeSound(event: Event) {
    if (!this.settings.soundEffects) return;

    const element = event.target as HTMLElement;

    if (
      element.tagName === "INPUT" ||
      element.tagName === "SELECT" ||
      element.tagName === "TEXTAREA"
    ) {
      this.playSound("change", element);
    }
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveTags = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"];
    return (
      interactiveTags.includes(element.tagName) ||
      (element.hasAttribute("role") &&
        ["button", "link", "menuitem"].includes(
          element.getAttribute("role") || ""
        ))
    );
  }

  private playSound(
    type: "click" | "hover" | "focus" | "change" | "success" | "error",
    element?: HTMLElement
  ) {
    if (!this.settings.soundEffects) return;

    // Create audio context for Web Audio API
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      switch (type) {
        case "click":
          this.playClickSound(audioContext);
          break;
        case "hover":
          this.playHoverSound(audioContext);
          break;
        case "focus":
          this.playFocusSound(audioContext);
          break;
        case "change":
          this.playChangeSound(audioContext);
          break;
        case "success":
          this.playSuccessTone(audioContext);
          break;
        case "error":
          this.playErrorTone(audioContext);
          break;
      }
    } catch (error) {
      // Fallback to simple beep if Web Audio API is not available
      console.log("Audio feedback:", type);
    }
  }

  private playClickSound(audioContext: AudioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  private playHoverSound(audioContext: AudioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.05
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  }

  private playFocusSound(audioContext: AudioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.08
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  }

  private playChangeSound(audioContext: AudioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      900,
      audioContext.currentTime + 0.1
    );
    gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  private playSuccessTone(audioContext: AudioContext) {
    // Play a pleasant ascending tone for success
    const frequencies = [523, 659, 784]; // C, E, G notes

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(
        freq,
        audioContext.currentTime + index * 0.1
      );
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + index * 0.1 + 0.2
      );

      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2);
    });
  }

  private playErrorTone(audioContext: AudioContext) {
    // Play a descending tone for errors
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      audioContext.currentTime + 0.3
    );
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }

  // Public methods for external components to trigger sounds
  public playSuccessSound() {
    this.playSound("success");
  }

  public playErrorSound() {
    this.playSound("error");
  }
}
