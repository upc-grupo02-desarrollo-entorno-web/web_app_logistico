import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario = '';
  clave = '';
  error = false;

  constructor(private auth: Auth, private router: Router) {}

  ingresar(): void {
    const usuarioAutenticado = this.auth.login(this.usuario, this.clave);

    if (!usuarioAutenticado) {
      this.error = true;
      return;
    }

    this.error = false;
    const destino = usuarioAutenticado.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
    this.router.navigate([destino]);
  }
}