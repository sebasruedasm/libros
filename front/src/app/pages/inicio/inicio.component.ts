import {Component, HostListener} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink,RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/http/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, MatIconModule, RouterLinkActive, MatDividerModule, MatButtonModule, MatToolbarModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  isScrolled = false;

  protected readonly localStorage = localStorage;

  
  constructor(
    private authService: AuthService,
  ){}


  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }

  logOut(): void {
    localStorage.clear();
    Swal.fire({
      position: "center",
      icon: "warning",
      iconColor:'#666',
      title: "Tu sesion ha terminado",
      showConfirmButton: false,
      timer: 1200
    });

  }
  

}
