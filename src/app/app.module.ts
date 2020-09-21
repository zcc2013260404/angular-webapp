import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HammerModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AppRoutingModule, HttpClientModule, BrowserAnimationsModule,
    BrowserModule, HammerModule, IonicModule.forRoot({
      mode: 'ios',
      backButtonText: '返回'
    }),NgZorroAntdMobileModule],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
