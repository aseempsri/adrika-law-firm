import { Component, ElementRef, ViewChild, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ScrollingStripComponent } from '../../components/scrolling-strip/scrolling-strip.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NavbarComponent, ScrollingStripComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('300ms'))
    ]),
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(60px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('900ms ease-out'))
    ]),
    trigger('fadeInScale', [
      state('void', style({ opacity: 0, transform: 'scale(1.05)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', animate('1200ms ease-out'))
    ]),
    trigger('fadeInUpSmall', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('300ms'))
    ])
  ]
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('heroRef', { static: false }) heroRef!: ElementRef<HTMLDivElement>;

  mouseX = signal(0);
  mouseY = signal(0);
  
  rotateX = signal(0);
  rotateY = signal(0);
  imgX = signal(0);
  imgY = signal(0);

  private springConfig = { stiffness: 150, damping: 20 };
  private animationFrameId: number | null = null;
  private targetRotateX = 0;
  private targetRotateY = 0;
  private targetImgX = 0;
  private targetImgY = 0;

  ngOnInit() {
    this.animate();
    this.setupGyroscope();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.removeGyroscopeListeners();
  }

  private setupGyroscope() {
    // Check if device orientation is supported and we're on mobile
    if (window.DeviceOrientationEvent && this.isMobileDevice()) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this));
            }
          })
          .catch(() => {
            console.log('Device orientation permission denied');
          });
      } else {
        // For Android and older iOS
        window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this));
      }
    }
  }

  private removeGyroscopeListeners() {
    window.removeEventListener('deviceorientation', this.onDeviceOrientation.bind(this));
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
  }

  private onDeviceOrientation(event: DeviceOrientationEvent) {
    if (!this.heroRef?.nativeElement || window.innerWidth > 768) return;
    
    // Use beta (front-to-back tilt) for rotateX and gamma (left-to-right tilt) for rotateY
    // Normalize values: beta ranges from -180 to 180, gamma from -90 to 90
    const beta = event.beta !== null ? event.beta : 0;
    const gamma = event.gamma !== null ? event.gamma : 0;
    
    // Convert device orientation to rotation values
    // Limit the range for smoother effect (similar to mouse movement range)
    const maxRotation = 8; // Match desktop rotation range
    const maxImageOffset = 15; // Match desktop image offset
    
    // Normalize beta (front-to-back tilt) to rotation range
    // Beta: -90 (flat face up) to 90 (flat face down), 0 is vertical
    const normalizedBeta = Math.max(-maxRotation, Math.min(maxRotation, beta / 11.25));
    
    // Normalize gamma (left-to-right tilt) to rotation range
    // Gamma: -90 (left) to 90 (right), 0 is centered
    const normalizedGamma = Math.max(-maxRotation, Math.min(maxRotation, gamma / 11.25));
    
    // Set target values (invert Y for natural feel)
    this.targetRotateX = -normalizedBeta;
    this.targetRotateY = normalizedGamma;
    
    // Adjust image position based on tilt (inverted for parallax effect)
    this.targetImgX = this.lerp(-maxImageOffset, maxImageOffset, (gamma + 90) / 180);
    this.targetImgY = this.lerp(-maxImageOffset, maxImageOffset, (beta + 90) / 180);
  }

  onMouseMove(event: MouseEvent) {
    // Only work on desktop (non-mobile)
    if (!this.heroRef?.nativeElement || window.innerWidth <= 768) return;
    
    const rect = this.heroRef.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    this.mouseX.set(x);
    this.mouseY.set(y);
    
    // Calculate target values
    this.targetRotateX = this.lerp(-8, 8, (y + 0.5) / 1);
    this.targetRotateY = this.lerp(-8, 8, (x + 0.5) / 1);
    this.targetImgX = this.lerp(15, -15, (x + 0.5) / 1);
    this.targetImgY = this.lerp(15, -15, (y + 0.5) / 1);
  }

  onMouseLeave() {
    // Only reset on desktop
    if (window.innerWidth > 768) {
      this.mouseX.set(0);
      this.mouseY.set(0);
      this.targetRotateX = 0;
      this.targetRotateY = 0;
      this.targetImgX = 0;
      this.targetImgY = 0;
    }
  }

  private animate() {
    // Apply spring physics
    const currentRotateX = this.rotateX();
    const currentRotateY = this.rotateY();
    const currentImgX = this.imgX();
    const currentImgY = this.imgY();

    const newRotateX = this.spring(this.targetRotateX, currentRotateX, this.springConfig);
    const newRotateY = this.spring(this.targetRotateY, currentRotateY, this.springConfig);
    const newImgX = this.spring(this.targetImgX, currentImgX, this.springConfig);
    const newImgY = this.spring(this.targetImgY, currentImgY, this.springConfig);

    this.rotateX.set(newRotateX);
    this.rotateY.set(newRotateY);
    this.imgX.set(newImgX);
    this.imgY.set(newImgY);

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  private spring(target: number, current: number, config: { stiffness: number; damping: number }): number {
    const velocity = (target - current) * (config.stiffness / 100);
    return current + velocity * (1 - config.damping / 100);
  }

  getTransformStyle() {
    return {
      transform: `perspective(1200px) rotateX(${this.rotateX()}deg) rotateY(${this.rotateY()}deg)`,
      transformStyle: 'preserve-3d' as const
    };
  }

  getImageTransformStyle() {
    return {
      transform: `translate(${this.imgX()}px, ${this.imgY()}px)`,
      transition: 'none'
    };
  }
}
