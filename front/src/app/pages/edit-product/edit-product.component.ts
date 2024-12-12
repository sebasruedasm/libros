import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, Form, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {ProductoService} from '../../services/http/producto.service';
import Swal from 'sweetalert2';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AuthService } from '../../services/http/auth.service';
import { maxTwoDecimalPlacesValidator } from '../../validators/maxTwoDecimalPlacesValidator';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})


export class EditProductComponent implements OnInit {
  token = localStorage.getItem("token");
  editForm: FormGroup;
  productId!: number;
  protected readonly localStorage = localStorage;

  parsedImages: any = [];
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private authService: AuthService
  ) {
    this.editForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      autor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      anyo: ['', [Validators.required, Validators.min(1500), Validators.max(new Date().getFullYear()),Validators.pattern(/^[0-9]+$/)]],
      ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      images: ['', Validators.required],
      editorial: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(60)]]
    });
  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.loadProductData();
      }
    });
    this.checkAuth(); 
  }

  checkAuth(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }


  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.editForm.patchValue({
          titulo: data.titulo,
          autor: data.autor,
          anyo: data.anyo,
          ciudad: data.ciudad,
          images: data.images,
          editorial: data.editorial,
        });
      },
      error: (err) => {
        console.error('Error loading product data', err);
      },
    });
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  isLogin():boolean{
    return this.authService.isLoggedIn();
  }
  
 logout(): void {
  this.authService.logout();
  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Tu sesion ha terminado",
    showConfirmButton: false,
    iconColor:'#666',
    timer: 1200
  });
  this.router.navigate(['/login']);
}

  onSubmit(): void {
    if(this.isLogin()){
      if (this.editForm.valid) {
        const productData = {
          titulo: this.editForm.value.titulo,
          autor: this.editForm.value.autor,
          anyo: this.editForm.value.anyo,
          ciudad: this.editForm.value.ciudad,
          images: this.editForm.value.images,
          editorial: this.editForm.value.editorial,
        }
        this.productService.updateProducto(this.productId, productData).subscribe(
          (response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Actualizado!",
              text: "El libro ha sido actualizado.",
              showConfirmButton: false,
              timer: 1200
            }).then(() => {
              this.router.navigate(['/producto']);
            });
          },
          (error) => {
            console.error('Error updating product', error);
            Swal.fire({
              title: 'Error actualizando libro',
              text: 'Hubo un problema al actualizar el libro. Por favor, inténtalo de nuevo.',
              icon: 'error'
            });
          }
        );
      } else {
        const errorMessages = this.getFormValidationErrors();
        Swal.fire({
          title: 'Error al actualizar libro',
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
  
    for (const controlName in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(controlName)) {
        const control = this.editForm.get(controlName);
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