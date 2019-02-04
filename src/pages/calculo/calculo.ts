import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabelaAliquotasServiceProvider } from '../../providers/tabela-aliquotas-service/tabela-aliquotas-service'

@Component({
	selector: 'page-calculo',
	templateUrl: 'calculo.html',
})
export class CalculoPage {

	public aliquotasINSS: Object;
	public aliquotasIR: Object;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public aliquotasProvider: TabelaAliquotasServiceProvider) {
	}

	/**
	 * Quando carregar a tela inicial que as tabelas de aliquotas são trazidas
	 */
	ionViewDidLoad() {
		console.log('>> CalculoPage');

		if (!this.aliquotasINSS || !this.aliquotasIR) {
			this.aliquotasProvider.carregaTabelas().then(
				(hasSucess) => {
					if (hasSucess) {
						console.log("Carregou aliquotas: " + hasSucess);
					}
				},
				(erro)=>{
					console.error("carregarTabelas() : " + erro);
				}
			);
		}




		// comentario simples
		// TODO: aqui o que fazer
		// ! importante
		// ? dúvidas
	}

	public mostraTabela() {
		console.log("INSS")
		console.log(this.aliquotasProvider.aliquotasINSS)
		console.log("IR")
		console.log(this.aliquotasProvider.aliquotasIR)
	}

}
