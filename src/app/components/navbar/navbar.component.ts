import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('fadeInDown', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('600ms'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  navLinks = [
    { label: "Home", route: "/" },
    { label: "Practice Areas", route: "/practice-areas" },
    { label: "Our Team", route: "/our-team" },
    { label: "About", route: "/about" },
    { label: "Contact", route: "/contact" }
  ];

  isNavbarVisible = true;
  lastScrollPosition = 0;
  scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.lastScrollPosition = Math.max(
      window.scrollY || 0,
      window.pageYOffset || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0
    );
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Only apply scroll behavior on desktop (768px and above)
    if (window.innerWidth < 768) {
      if (!this.isNavbarVisible) {
        this.isNavbarVisible = true;
        this.cdr.detectChanges();
      }
      return;
    }

    const currentScrollPosition = Math.max(
      window.scrollY || 0,
      window.pageYOffset || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0
    );

    const wasVisible = this.isNavbarVisible;

    // Show navbar when scrolling up or at the top
    if (currentScrollPosition < this.lastScrollPosition || currentScrollPosition < this.scrollThreshold) {
      this.isNavbarVisible = true;
    } 
    // Hide navbar when scrolling down
    else if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > this.scrollThreshold) {
      this.isNavbarVisible = false;
    }

    // Only trigger change detection if visibility changed
    if (wasVisible !== this.isNavbarVisible) {
      this.cdr.detectChanges();
    }

    this.lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Reset navbar visibility on resize to ensure it's visible on mobile
    if (window.innerWidth < 768) {
      this.isNavbarVisible = true;
    }
  }
}
