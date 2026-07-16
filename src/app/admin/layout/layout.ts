import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarApp } from '../../shared/navbar-app/navbar-app';
import { SidebarAdmin } from '../../shared/sidebar-admin/sidebar-admin';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, NavbarApp, SidebarAdmin],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class AdminLayout {}