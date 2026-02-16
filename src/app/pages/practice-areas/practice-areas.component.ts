import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ScrollingStripComponent } from '../../components/scrolling-strip/scrolling-strip.component';

@Component({
  selector: 'app-practice-areas',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NavbarComponent, ScrollingStripComponent],
  templateUrl: './practice-areas.component.html',
  styleUrl: './practice-areas.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(60px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('600ms ease-out'))
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('400ms'))
    ])
  ]
})
export class PracticeAreasComponent {
  practiceAreas = [
    {
      title: 'Criminal Law',
      description: 'Defending your rights with unwavering commitment and strategic defense.',
      icon: 'scale',
      color: 'from-red-900/20 to-red-800/10'
    },
    {
      title: 'Corporate Law',
      description: 'Navigating complex business landscapes with precision and expertise.',
      icon: 'scale',
      color: 'from-blue-900/20 to-blue-800/10'
    },
    {
      title: 'Civil Litigation',
      description: 'Resolving disputes through meticulous preparation and compelling advocacy.',
      icon: 'scale',
      color: 'from-amber-900/20 to-amber-800/10'
    },
    {
      title: 'Family Law',
      description: 'Protecting what matters most with compassion and legal excellence.',
      icon: 'scale',
      color: 'from-purple-900/20 to-purple-800/10'
    },
    {
      title: 'Real Estate Law',
      description: 'Securing your property interests with comprehensive legal guidance.',
      icon: 'scale',
      color: 'from-green-900/20 to-green-800/10'
    },
    {
      title: 'Intellectual Property',
      description: 'Safeguarding your innovations and creative works with expert counsel.',
      icon: 'scale',
      color: 'from-cyan-900/20 to-cyan-800/10'
    }
  ];
}
