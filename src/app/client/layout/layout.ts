import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarClient } from '../../shared/sidebar-client/sidebar-client';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarApp, SidebarClient],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
