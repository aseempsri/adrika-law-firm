import { Component } from '@angular/core';
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
export class NavbarComponent {
  navLinks = [
    { label: "Practice Areas", route: "/practice-areas" },
    { label: "Our Team", route: "/our-team" },
    { label: "About", route: "/about" },
    { label: "Contact", route: "/contact" }
  ];
}
