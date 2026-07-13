import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar-app',
  imports: [RouterLink],
  templateUrl: './navbar-app.html',
  styleUrl: './navbar-app.css',
})
export class NavbarApp {

  constructor(private auth: Auth, private router: Router) {}

  get usuario() {
    return this.auth.obtenerUsuarioActual();
  }

  get inicio(): string {
    return this.usuario?.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
  }

  salir(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}