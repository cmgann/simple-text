import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import {MatNativeDateModule} from '@angular/material/core';
import {MaterialModule} from './shared/material.module';
import { CommaDelimitationComponent } from './comma-delimitation/comma-delimitation.component';
import { PatternDialog, TextReplaceComponent } from './text-replace/text-replace.component';

import { commaDelimatedService } from './shared/comma-delimitation.service';
import { textReplaceService } from './shared/text-replace.service';
import { HomeComponent } from './home/home.component';
import { CommaDelimitedDialog, DialogService, TextReplaceDialog } from './header/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CommaDelimitationComponent,
    TextReplaceComponent,
    PatternDialog,
    HomeComponent,
    CommaDelimitedDialog,
    TextReplaceDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [commaDelimatedService,textReplaceService,DialogService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
