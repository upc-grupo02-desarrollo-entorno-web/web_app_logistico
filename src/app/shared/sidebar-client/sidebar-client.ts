import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-client',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css',
})
export class SidebarClient {}