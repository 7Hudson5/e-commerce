import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; //adiciona importação do RoutOutlet e RouteLink;
import { usuarioLogado, login, logout } from './core/auth'; //importa usuarioLogado, login(), e logout()
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'ROBAL STORE';
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
