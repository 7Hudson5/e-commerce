import { Routes } from '@angular/router';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { Carrinho } from './features/carrinho/carrinho/carrinho';
import { Component } from '@angular/core';

export const routes: Routes = [
    {
        path:'',
        component: ListaProdutos, 
    },
    {
        path:'carrinho',
        component: Carrinho,
    },
];
