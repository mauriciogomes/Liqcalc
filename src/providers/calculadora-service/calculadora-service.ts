import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TabelaAliquotasServiceProvider } from '../tabela-aliquotas-service/tabela-aliquotas-service';


@Injectable()
export class CalculadoraServiceProvider {

	constructor(public http: HttpClient, public tabelaAliquota: TabelaAliquotasServiceProvider) {
		console.log('Hello CalculadoraServiceProvider Provider');
	}

	/**
	 * Retorna um objeto com três atributos: salarioLiquido, valorINSS e valorIR
	 * @param salarioBruto 
	 */
	public efetuarCalculo(salarioBruto: number): Object{
		//const aliquotas = this.tabelaAliquota.selecionaAliquotas(salarioBruto); //todo precisa ser inss
		
		let objAliquota;
		try{
			objAliquota = this.tabelaAliquota.selecionarAliquotaINSS(salarioBruto);	
		}catch(erro){
			const msgErro = `Falha ao efetuar cálculo: ${erro.message}`;
			console.error(msgErro);
			throw new Error(msgErro);
		}		
		const aliquotaINSS = objAliquota.INSS;
		let valorINSS;
		if(objAliquota.tetoINSS && salarioBruto > objAliquota.tetoINSS){
			valorINSS = objAliquota.tetoINSS * aliquotaINSS / 100;			
		}else{
			valorINSS = salarioBruto * aliquotaINSS / 100;
		}

		const salarioBaseParaIR = salarioBruto - valorINSS;
		
		try{
			objAliquota = this.tabelaAliquota.selecionarAliquotaIR(salarioBaseParaIR);
		}catch(erro){
			const msgErro = `Falha ao efetuar cálculo: ${erro.message}`;
			console.error(msgErro);
			throw new Error(msgErro);
		}
		const aliquotaIR = objAliquota.IR;
		const deducaoIR = objAliquota.deducaoIR;
		const valorIR = (salarioBaseParaIR * aliquotaIR / 100) - deducaoIR;

		const salarioLiquido = salarioBaseParaIR - valorIR;

		return {salarioLiquido, valorINSS, valorIR};
		
	}


}
