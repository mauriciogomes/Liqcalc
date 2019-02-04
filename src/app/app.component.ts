import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CalculoPage } from '../pages/calculo/calculo';

import { TabelaAliquotasServiceProvider } from '../providers/tabela-aliquotas-service/tabela-aliquotas-service';

@Component({
  templateUrl: 'app.html'
})
export class LiqCalcApp {
  rootPage:any = CalculoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, tabelaAliquotas: TabelaAliquotasServiceProvider ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      
      

      // oculta o splash somente depois de tudo carregado
      splashScreen.hide();
    });
  }
}

