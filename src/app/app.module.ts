import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LiqCalcApp } from './app.component';
import { CalculoPage } from '../pages/calculo/calculo';
import { CalculadoraServiceProvider } from '../providers/calculadora-service/calculadora-service';
import { TabelaAliquotasServiceProvider } from '../providers/tabela-aliquotas-service/tabela-aliquotas-service';

@NgModule({
  declarations: [
    LiqCalcApp,
    CalculoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LiqCalcApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LiqCalcApp,
    CalculoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CalculadoraServiceProvider,
    TabelaAliquotasServiceProvider
  ]
})
export class AppModule {}
