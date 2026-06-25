import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarPublicComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout { }