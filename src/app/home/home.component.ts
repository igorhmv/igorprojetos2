import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AppRoutingModule } from '../app-routing.module';
import { Item } from '../models/item';
import { RelatorioServiceService } from '../services/relatorio-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  DataControl = new FormControl('', [Validators.required]);

  data: string = '';

  sucessos = [{
    'nome': 'Sim',
    'selecionado': false
  },
  {
    'nome': 'Não',
    'selecionado': false
  }
  ];

  t:string = this.sucessos[0].nome;

  show(){
  var sts = false;
  for(let i = 0; i < this.sucessos.length; i++)
  {
    if (this.sucessos[i].selecionado == true)
    {
      sts = true;
      this.t = this.sucessos[i].nome;
      break;
    }
  }

  return sts;
  };

    atualizaCheckbox(opcao:any){
      if(opcao.selecionado == true){
        opcao.selecionado = false;
      }else{
        opcao.selecionado = true;
      }
    }

  dataSourceRelatorio = new MatTableDataSource;

  displayedColumns: string[] = ['seq_item_enviado',
    'cd_importacao',
    'cd_atendimento',
    'data',
    'observacao',
    'sucesso',
    'xml'
  ];

constructor(private relatorioservice: RelatorioServiceService) { }

  visualizarDados(){
    console.log('ola');
    this.dataSourceRelatorio = new MatTableDataSource;

    //var data = document.querySelector('form')?.getElementsByTagName('input')[0].value;
    //var atendimento = document.querySelector('form')?.getElementsByTagName('input')[1].value;

    var data = document.getElementsByTagName('input')[0].value;
    var atendimento = document.getElementsByTagName('input')[1].value;

    if(data === undefined || data === null || atendimento === undefined || atendimento === null){
      alert("dados inválidos");
      return;
    }



    data = data.replace('-','.');
    data = data.replace('-','.');

    var atrData = data.split('.');

    let dataResult = atrData[2]+'.'+atrData[1]+'.'+atrData[0];

    if(!dataResult.match("[0-9]{2}.[0-9]{2}.[0-9]{4}")){
      dataResult = "";

    }
    var sucessoSelecionado = '';
    if(this.sucessos[0].selecionado && !this.sucessos[1].selecionado){
      sucessoSelecionado = 'S';
    }else if(!this.sucessos[0].selecionado && this.sucessos[1].selecionado){
      sucessoSelecionado = 'N';
    }else if(this.sucessos[0].selecionado && this.sucessos[1].selecionado){
      sucessoSelecionado = 'SN';
    }


    this.relatorioservice.getRelatorio(dataResult,atendimento,sucessoSelecionado).subscribe((itens:Item[])=>{

      if (itens.length === 0) {

        alert('relatório sem dados');
      }else{

        this.dataSourceRelatorio.data = itens;
      }
    },
      erro => {
       // console.log('erro');
        this.relatorioservice.handleError;

      }
   )
  }


}
