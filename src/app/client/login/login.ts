import { Component, signal } from '@angular/core';
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
  error = signal(false);

  constructor(private auth: Auth, private router: Router) {}
  ingresar(): void {
    this.auth.login(this.usuario, this.clave).subscribe({
      next: (respuesta) => {
        this.error.set(false);
        const destino = respuesta.usuario.rol === 'admin' ? '/admin/dashboard' : '/cliente/dashboard';
        this.router.navigate([destino]);
      },
      error: () => {
        this.error.set(true);
      }
    });
  }

}
