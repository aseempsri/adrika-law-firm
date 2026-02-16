import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ScrollingStripComponent } from '../../components/scrolling-strip/scrolling-strip.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, NavbarComponent, ScrollingStripComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
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
export class AboutComponent {
  milestones = [
    { year: '2010', title: 'Foundation', description: 'Adrika Law Firm established with a vision of justice and excellence.' },
    { year: '2015', title: 'Expansion', description: 'Expanded practice areas to serve diverse legal needs.' },
    { year: '2020', title: 'Recognition', description: 'Recognized as a leading law firm in the region.' },
    { year: '2025', title: 'Innovation', description: 'Continuing to innovate and serve with unwavering dedication.' }
  ];

  values = [
    {
      title: 'Justice',
      description: 'We believe in the fundamental right to fair representation and equal justice under the law.'
    },
    {
      title: 'Integrity',
      description: 'Our practice is built on honesty, transparency, and ethical conduct in all matters.'
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in legal representation and client service.'
    },
    {
      title: 'Compassion',
      description: 'We understand that legal matters affect lives, and we approach each case with empathy.'
    }
  ];
}
