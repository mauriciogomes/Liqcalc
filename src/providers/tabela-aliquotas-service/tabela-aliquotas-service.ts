import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/**
 * @name TabelaAliquotasProvider
 * @author Maurício Jacques Gomes
 * @description Provider para carregar e guardar os dados das tabelas de aliquotas de INSS e IR.
 * Ao iniciar a aplicação o procedimento carregarTabelas() deve ser chamado. Para utilizar os
 * dados devem ser utilizados os atributos 'aliquotasINSS' e 'aliquotasIR'.
 */
@Injectable()
export class TabelaAliquotasServiceProvider {

	public aliquotasINSS: Array<Object>;
	public aliquotasIR: Array<Object>;

	private _urlAssets: string = '../../assets/';

	constructor(public http: HttpClient) {
		console.log("(Iniciou provider) tabela aliquota");
	}

	/**
	 * Responsável por carregar as tabelas com as aliquotas necessárias para a realização dos cálculos.
	 * Elas ficam disponíveis de forma pública no provider 
	 */
	public carregaTabelas(): Promise<boolean>{
		console.log("TabelaAliquotasServiceProvider.carregaTabelas()");
		// Esse método pode ser melhorado utilizando o encadeamento de promise já que o then retorna
		// uma promise também (ex. p.then((valor)=>{...}).then(...) )
		
		const promiseINSS = new Promise<boolean>((resolve, reject)=>{
			this.carregaTabelaINSS().then((hasLoaded)=>{
				if(hasLoaded)
					resolve(true)
				else
					reject(hasLoaded)
			})
		});
 
		const promiseIR = new Promise<boolean>((resolve, reject)=>{
			promiseINSS.then(
				(hasLoadedINSS)=>{
					if(!hasLoadedINSS) reject("Não carregou INSS; " + hasLoadedINSS);

					this.carregaTabelaIR().then((hasLoaded)=>{
						if(hasLoaded)
							resolve(true)
						else
							reject("Não carregou IR; " + hasLoaded)
					});
				},
				(erro)=>{
					reject("Erro ao carregar tabelas; " + erro)
				}
			)
		});
			
		return promiseIR;
		
	}


	public selecionarAliquotaINSS(salarioBruto){
		const aliquota = {'INSS': 0};

		// Garantir que as aliquotas já foram carregadas
		if(!Array.isArray(this.aliquotasINSS) || this.aliquotasINSS.length == 0){
			throw new Error("Aliquotas de INSS não foram carregadas.");
		}

		this.aliquotasINSS.forEach((faixa:any, indice, arrAliquotas)=>{
			console.log(`linha ${faixa}`);
			if(salarioBruto >= faixa.valorInicial && salarioBruto <= faixa.valorFinal){
				aliquota['INSS'] = faixa.aliquota;
				return;
			}else if( indice === arrAliquotas.length - 1 ){
				// foi necessário saber se é a ultima faixa de valores já que o valor final (teto)
				// não indica que o salário não cai na regra
				aliquota['INSS'] = faixa.aliquota;
				aliquota['tetoINSS'] = faixa.valorFinal;
			}
		});

		return aliquota;
	}

	// As aliquotas precisam ser carregadas separadas porque só há
	// salário base depois do cálculo de INSS 
	public selecionarAliquotaIR(salarioBase){
		const aliquota = {'IR': 0, 'deducaoIR': 0};

		// Garantir que as aliquotas já foram carregadas
		if(!Array.isArray(this.aliquotasIR) || this.aliquotasIR.length == 0){
			throw new Error("Aliquotas de IR não foram carregadas.");
		}

		this.aliquotasIR.forEach((faixa:any)=>{
			if(salarioBase >= faixa.valorInicial 
					&& (salarioBase <= faixa.valorFinal || faixa.valorFinal == -1) ){
				aliquota['IR'] = faixa.aliquota ? faixa.aliquota : 0;
				aliquota['deducaoIR'] = faixa.deduzir ? faixa.deduzir : 0;
			}
		});
		
		return aliquota;
	}

	/**
	 * A função seleciona a tabela do ano apropriado e a torna acessível à aplicação
	 */
	private carregaTabelaINSS(): Promise<boolean>{
		return new Promise((resolve)=>{
			this.http.get(this._urlAssets + 'tabela-inss.json')
			.subscribe( (response: Response) => {
					console.log("carregaTabelaINSS() -> Meu response : ");
					console.log(response);
					this.aliquotasINSS = response['2018'];
					resolve(true);
				},
				this.trataErro
			);
		});
		
	}

	private carregaTabelaIR(): Promise<boolean>{
		return new Promise((resolve)=>{
			this.http.get(this._urlAssets + 'tabela-ir.json')
			.subscribe( 
				(response: Response) => {
					console.log("carregaTabelaIR() -> Meu response : ");
					console.log(response);
					//TODO pegar a tabela do ano corrente ou anterior (ex. previne caso haja tabela futura)
					this.aliquotasIR = response['2018'];
					resolve(true);
				},
				this.trataErro
			);
		});
	}

	private trataErro(erro: Response){
		console.error( erro );
		Promise.reject("Carregamento de tabela de aliquota. " + erro.json());
	}

}
