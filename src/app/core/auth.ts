//cria um autenticador de usuario

import { signal, Signal } from "@angular/core";

//! define valor inicial do signal usuarioLogado com (false)
export const usuarioLogado = signal (false);

//! define signal usuarioLogado como (true), permite acesso as rotas
export function login(){
    usuarioLogado.set(true);
}

//! define signal usuarioLogado como (false), bloqueia acesso as rotas
export function logout(){
    usuarioLogado.set(false);
}