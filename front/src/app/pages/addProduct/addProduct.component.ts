import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ProductoService} from '../../services/http/producto.service';
import { AuthService } from '../../services/http/auth.service';
import { maxTwoDecimalPlacesValidator } from '../../validators/maxTwoDecimalPlacesValidator';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './addProduct.component.html',
  styleUrl: './addProduct.component.scss'
})
export class AddProductComponent {
  productForm: FormGroup;
  private productoService = inject(ProductoService);
  protected readonly localStorage = localStorage;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.productForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      autor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      anyo: ['', [Validators.required, Validators.min(1500), Validators.max(new Date().getFullYear()),Validators.pattern(/^[0-9]+$/)]],
      ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      images: ['', Validators.required],
      editorial: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(60)]]
    });
  }

  isLogin():boolean{
    return this.authService.isLoggedIn();
  }
  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }
  logout(): void {
   this.authService.logout();
   
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Tu sesion ha terminado",
      showConfirmButton: false,
      iconColor:'#666',
      timer: 1200,
      
    });
    this.router.navigate(['/login']);
  }

    
  onSubmit(): void {
    if(this.isLogin()){
      if (this.productForm.valid) {
        const productData: any = {
          titulo: this.productForm.value.titulo,
          autor: this.productForm.value.autor,
          anyo: this.productForm.value.anyo,
          ciudad: this.productForm.value.ciudad,
          images: this.productForm.value.images,
          editorial: this.productForm.value.editorial,
        }
        this.productoService.addProducto(productData).subscribe(
          (res:any) => {
            console.log('Book added successfully', res.message);
            Swal.fire({
              title: 'Libro añadido exitosamente',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#666',
            }).then(() => {
              this.router.navigateByUrl('/producto')
            });
          },
          (error) => {
            console.error('Error adding product', error);
            Swal.fire({
              title: 'Error añadiendo libro',
              text: 'Hubo un problema al añadir el libro. Por favor, inténtalo de nuevo.',
              icon: 'error'
            });
          }
        );
      } else {
        console.error('Error adding book');
        const errorMessages = this.getFormValidationErrors();
        Swal.fire({
          title: 'Error al agregar libro',
          text: errorMessages,
          confirmButtonColor: '#666',
          icon: 'error'
        });
      }
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  getFormValidationErrors(): string {
    const errorMessages: string[] = [];
  
    for (const controlName in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(controlName)) {
        const control = this.productForm.get(controlName);
        if (control && control.errors) {
          for (const errorKey in control.errors) {
            if (control.errors.hasOwnProperty(errorKey)) {
              switch (errorKey) {
                case 'required':
                  errorMessages.push(`El campo "${controlName}" es obligatorio.`);
                  break;
                case 'minlength':
                  errorMessages.push(`El campo "${controlName}" debe tener al menos ${control.errors[errorKey].requiredLength} caracteres.`);
                  break;
                case 'maxlength':
                  errorMessages.push(`El campo "${controlName}" no debe exceder ${control.errors[errorKey].requiredLength} caracteres.`);
                  break;
                case 'min':
                  errorMessages.push(`El campo "${controlName}" debe ser mayor o igual a ${control.errors[errorKey].min}.`);
                  break;
                case 'max':
                  errorMessages.push(`El campo "${controlName}" debe ser menor o igual a ${control.errors[errorKey].max}.`);
                  break;
                case 'pattern':
                  errorMessages.push(`El campo "${controlName}" tiene un formato inválido.`);
                  break;
                default:
                  errorMessages.push(`El campo "${controlName}" tiene un error no identificado (${errorKey}).`);
                  break;
              }
            }
          }
        }
      }
    }
  
    return errorMessages.join('\n');
  }
  
}
