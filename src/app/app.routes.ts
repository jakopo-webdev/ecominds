import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SimulationComponent } from './components/simulation/simulation.component';
import { EcoMissionsComponent } from './components/eco-missions/eco-missions.component';
import { MissionDetailsComponent } from './components/mission-details/mission-details.component';
import { AccessibilitySettingsComponent } from './components/accessibility-settings/accessibility-settings.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'eco-missions', component: EcoMissionsComponent },
  { path: 'mission-details/:id', component: MissionDetailsComponent },
  { path: 'accessibility-settings', component: AccessibilitySettingsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', redirectTo: '/home' }
];