import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardioFeedComponent } from './components/cardio-feed/cardio-feed.component';
import { CardioSettingsComponent } from './components/cardio-settings/cardio-settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardContainerComponent } from './components/shared/card-container/card-container.component';
import { CardContainerHeaderComponent } from './components/shared/card-container/card-container-header/card-container-header.component';
import { CardContainerBodyComponent } from './components/shared/card-container/card-container-body/card-container-body.component';
import { CardContainerFooterComponent } from './components/shared/card-container/card-container-footer/card-container-footer.component';
import { AddCardioComponent } from './components/add-cardio/add-cardio.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './pages/settings/settings.component';
import { BackComponent } from './components/shared/back/back.component';
import { ContainerComponent } from './components/shared/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    CardioFeedComponent,
    CardioSettingsComponent,
    DashboardComponent,
    CardContainerComponent,
    CardContainerHeaderComponent,
    CardContainerBodyComponent,
    CardContainerFooterComponent,
    AddCardioComponent,
    SettingsComponent,
    BackComponent,
    ContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
