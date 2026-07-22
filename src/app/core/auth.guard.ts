//cria um auth guard

import { CanActivateFn } from "@angular/router";
import { usuarioLogado } from "./auth";
export const authGuard: CanActivateFn = () => {
    return usuarioLogado();
};