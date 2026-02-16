import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-scrolling-strip',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './scrolling-strip.component.html',
  styleUrl: './scrolling-strip.component.css'
})
export class ScrollingStripComponent {
  icons = Array.from({ length: 20 });
  // Create enough duplicates for seamless scroll - we'll animate by exactly one set
  doubleIcons = [...this.icons, ...this.icons, ...this.icons];
}
