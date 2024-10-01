import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LeftContainerComponent } from "./left-container/left-container.component";
import { RightContainerComponent } from "./right-container/right-container.component";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LeftContainerComponent,
    RightContainerComponent
  ],
  imports: [
    CurrencyPipe,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})

export class AppModule { }
