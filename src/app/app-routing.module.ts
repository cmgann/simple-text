import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommaDelimitationComponent } from './comma-delimitation/comma-delimitation.component';
import { HomeComponent } from './home/home.component';
import { TextReplaceComponent } from './text-replace/text-replace.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'comma', component: CommaDelimitationComponent},
  {path: 'text-replace', component: TextReplaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
