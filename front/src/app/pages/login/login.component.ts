import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive,RouterOutlet, Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../services/http/auth.service';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {MatToolbarModule} from '@angular/material/toolbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.getToken(username, password).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name_user', username);
          this.router.navigate(['/producto']);
          console.log("logeo exitoso")


          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sesion Iniciada!",
            showConfirmButton: false,
            timer: 1200
          }); 
      },
        
        error => {
          console.error('Login failed', error);
          Swal.fire({
            title: "Credenciales invalidas",
            text: "Los campos pueden estar incorrectos",
            icon: "warning",
            iconColor:'#666',
            confirmButtonColor: '#666',
          })
        }
      );
    }else{
      Swal.fire({
        title: "Por favor verifica tu username y contraseña",
        text: "Los campos no pueden estar vacios o pueden estar incorrectos",
        icon: "warning",
        iconColor:'#666',
        confirmButtonColor: '#666',
      })
    }
  }

}
