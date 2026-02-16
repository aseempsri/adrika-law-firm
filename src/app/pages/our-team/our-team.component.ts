import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ScrollingStripComponent } from '../../components/scrolling-strip/scrolling-strip.component';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NavbarComponent, ScrollingStripComponent],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.css',
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
export class OurTeamComponent {
  teamMembers = [
    {
      name: 'Adv. Rajesh Sharma',
      role: 'Senior Partner',
      specialization: 'Criminal Defense',
      experience: '15+ Years',
      description: 'Renowned for strategic defense and unwavering commitment to justice.'
    },
    {
      name: 'Adv. Priya Mehta',
      role: 'Partner',
      specialization: 'Corporate Law',
      experience: '12+ Years',
      description: 'Expert in navigating complex business legal landscapes.'
    },
    {
      name: 'Adv. Arjun Desai',
      role: 'Senior Associate',
      specialization: 'Civil Litigation',
      experience: '10+ Years',
      description: 'Meticulous preparation and compelling advocacy in dispute resolution.'
    },
    {
      name: 'Adv. Kavita Nair',
      role: 'Associate',
      specialization: 'Family Law',
      experience: '8+ Years',
      description: 'Compassionate guidance protecting what matters most to families.'
    }
  ];
}
