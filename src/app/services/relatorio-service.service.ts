import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Item } from '../models/item';

import { retry, catchError } from 'rxjs/operators';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};

@Injectable({
  providedIn: 'root'
})
export class RelatorioServiceService {

  url = environment.url + 'api/relatorio/item';

  constructor(private httpClient: HttpClient) { }


  public getRelatorio(data:string,atendimento:string,sucesso:string ) {
    
    if(atendimento.length == 0){
      atendimento = '';
    }
    return this.httpClient.get<Item[]>(`${this.url}?data=${data}&cd_atendimento=${atendimento}&sucesso=${sucesso}`
    ,{
      
      headers:headers}
    ).pipe(
      retry(2),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  };


}
