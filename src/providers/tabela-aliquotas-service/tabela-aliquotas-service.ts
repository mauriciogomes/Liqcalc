import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import '../../assets/tabela-ir.json';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TabelaAliquotasServiceProvider {

	public aliquotasINSS: Promise<Object>;
	public aliquotasIR: Promise<Object>;

	private _urlAssets: string = '../../assets/';

	constructor(public http: HttpClient) {
		
	}

	public carregaTabelas(){
		try{
			this.carregaTabelaINSS();
			this.carregaTabelaIR();

		}catch( erro ){
			throw( erro );
		}
	}

	private carregaTabelaINSS(): void{
		
		this.http.get(this._urlAssets + 'tabela-inss.json')
			.subscribe( (response: Response) => {
					this.aliquotasINSS = response.json();
				},
				this.trataErro
			);
	}

	private carregaTabelaIR(){

	}

	private trataErro(erro: Response){
		console.error( erro );
		throw("Carregamento de tabela de aliquota. " + erro.json());
	}

}
