import { Routes } from '@angular/router';
import { SingleTrackForm } from './single-track-form/single-track-form';

export const routes: Routes = [
  { path: '', redirectTo: 'single-track-scrobble', pathMatch: 'full' },
  { path: 'single-track-scrobble', component: SingleTrackForm },
  { path: '**', redirectTo: 'single-track-scrobble' },
];
