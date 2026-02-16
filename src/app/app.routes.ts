import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PracticeAreasComponent } from './pages/practice-areas/practice-areas.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'practice-areas', component: PracticeAreasComponent },
  { path: 'our-team', component: OurTeamComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent }
];
