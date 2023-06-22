import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingleTrackFormComponent } from './single-track-form/single-track-form.component';

const routes: Routes = [
  { path: 'single-track-scrobble', component: SingleTrackFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }