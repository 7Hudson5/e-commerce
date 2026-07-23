import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produtos.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [ Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {

// ! remover a lista de produtos, agora os dados vão ser carregados via API Fakerstoreapi
  produtos = signal <
   
  {nome: string ; preco: number} []> ([]);

// ? criar estado de carregamento, 
// ** true: requisição em andamento, exibir dados no template
// ! false: esconder indicador e exibir a lista de produtos
carregando = signal(true);

//!cria um método para a requisição dos produtos
carregarProdutos(){

  this.carregando.set(true);

  this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('erro ao carregar os produtos:, ', erro);
          this.carregando.set(false);
        },
  });
}

exibirProduto (nome:string){
   //console.log ('Produto selecionado: ', nome);
   this.produtoSelecionado.set(nome);
}
adicionarProduto(){
 this.produtos.update(listaAtual => [
   ...listaAtual, { nome: 'Processador Core i5 14550FS', preco: 2500 }
 ]);

}
totalProdutos = computed(() => this.produtos().length);
valorTotal = computed(() => { 
 return this.produtos().reduce
 ((total, item) => total + item.preco, 0);
});
subtituiProdutos(){
   this.produtos.set([
      { nome: 'Teclado', preco: 40 },
        { nome:'Mouse', preco: 10 },
         { nome:'Monitor', preco:100 },
          { nome:'Desktop', preco:500 },
           { nome:'Headset', preco:25 },
   ]);

}
// ? metodo http (API) foi modificado para (produto services)!!!
constructor(){
  //! carregar a API
  this.carregarProdutos();

  //! effects continuam iguais
 effect(() => {
   console.log('Lista de Produtos Alterados:', this.produtos());
 });

 effect(() => {
   console.log('Valor total atualizado: ', this.valorTotal());
 });

 effect(() => {
if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) Minha Loja`
  }
 });

 }
 produtoSelecionado = signal<string | null> (null);
 carrinho = signal< { nome: string; preco: number }[]>([]);

 adicionarAoCarrinho(produto:{nome:string; preco:number}){
   this.carrinho.update(listaAtual =>
      [...listaAtual,produto]);}
   quantidadeCarrinho = computed(() => this.carrinho().length);

   totalCarrinho = computed(()=> {
      return this.carrinho().reduce((total, item) => 
      total + item.preco,0);
   
});

//? ================= INJECT ===================
private produtosService = inject(produtosService);
}