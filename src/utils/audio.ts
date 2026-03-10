// Simple Web Audio API sound generator for UI elements
// We use synthetic sounds to avoid loading external bloated audio files

class AudioSystem {
  context: AudioContext | null = null;
  masterGain: GainNode | null = null;
  ambientOscillator: OscillatorNode | null = null;
  ambientGain: GainNode | null = null;
  isMuted: boolean = true; // Start muted due to browser autoplay policies
  isInitialized: boolean = false;

  init() {
    if (this.isInitialized) return;
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Master volume control
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.context.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (!this.isMuted && !this.isInitialized) {
      this.init();
    }

    if (!this.isMuted && this.context?.state === 'suspended') {
      this.context.resume();
    }

    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.5, this.context!.currentTime, 0.1);
    }

    if (!this.isMuted) {
      this.startAmbientHum();
    } else {
      this.stopAmbientHum();
    }
  }

  // Generates a short, sharp click resembling a mechanical keyboard switch
  playTypingSound() {
    if (this.isMuted || !this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    // Mix two oscillators for a crisp 'clack'
    // A high frequency burst
    osc.type = 'square';
    osc.frequency.setValueAtTime(300 + Math.random() * 200, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.02);

    // Envelope
    gainNode.gain.setValueAtTime(0, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.03);
  }

  // Generates a very low frequency server room hum
  startAmbientHum() {
    if (!this.context || !this.masterGain || this.ambientOscillator) return;

    this.ambientOscillator = this.context.createOscillator();
    this.ambientGain = this.context.createGain();

    // 50Hz mains hum / low fan noise
    this.ambientOscillator.type = 'sine';
    this.ambientOscillator.frequency.value = 55;

    // Very quiet
    this.ambientGain.gain.setValueAtTime(0, this.context.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.05, this.context.currentTime + 2);

    this.ambientOscillator.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOscillator.start();
  }

  stopAmbientHum() {
    if (this.ambientOscillator && this.ambientGain && this.context) {
      this.ambientGain.gain.linearRampToValueAtTime(0.001, this.context.currentTime + 1);
      setTimeout(() => {
        this.ambientOscillator?.stop();
        this.ambientOscillator?.disconnect();
        this.ambientGain?.disconnect();
        this.ambientOscillator = null;
        this.ambientGain = null;
      }, 1000);
    }
  }

  // Generates a high-pitched sci-fi beep for boot sequence success
  playSuccessBeep() {
    if (this.isMuted || !this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.2);
  }
}

// Export a singleton instance
export const audioSystem = new AudioSystem();
