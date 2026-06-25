import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-public.html',
  styleUrl: './navbar-public.css'
})
export class NavbarPublicComponent { }