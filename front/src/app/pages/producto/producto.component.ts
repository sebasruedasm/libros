import {Component, OnInit, inject} from '@angular/core';
import {ProductoService} from '../../services/http/producto.service';
import {ProductoInterface} from '../../interfaces/producto-interface';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/http/auth.service';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    RouterLink, CommonModule,
    RouterModule, MatIconModule,
    MatDividerModule, MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})


export class ProductoComponent implements OnInit {
  searchForm: FormGroup;
  filteredProductos: ProductoInterface[] = [];
  protected readonly localStorage = localStorage;


  private readonly _producto = inject(ProductoService);

  productos: ProductoInterface[] = [];
  allProductos: ProductoInterface[] = [];


  constructor(
    private productService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Agregar ActivatedRoute aquí
    private authService: AuthService
  ) {
    this.searchForm = this.fb.group({
      search: []
    });

  }

  ngOnInit(): void {
    this.getDataProduct();
  }

  getDataProduct(): void {
    this._producto.getAllProduct().subscribe(
      (res: ProductoInterface[]) => {
        this.productos = res;
        this.allProductos = res; // Guarda todos los productos para la búsqueda local
      }
    );
  }

  toggleDescription(productId: number): void {
    this.productos = this.productos.map(product =>
      product.id_libro === productId ? {...product, showDescription: !product.editorial} : product
    );
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

  isLogin():boolean{
    return this.authService.isLoggedIn();
  }


  searchProduct(): void {
    if(this.isLogin()){
      const searchValue = this.searchForm.get('search')?.value;
      if (searchValue) {
        this._producto.searchProductsByName(searchValue).subscribe(
          (res: any) => {
            if (res.books && res.books.length > 0) {
              this.productos = res.books;
  
  
            } else{
              Swal.fire({
                position: 'center',
                icon: 'warning',
                iconColor: '#666',
                title: res.message,
                showConfirmButton: false,
                timer: 1200
              });
              this.getDataProduct();
            }
          },
          (error) => {
            console.error('Error al buscar libros', error);
            Swal.fire({
              position: 'center',
              icon: 'warning',
              iconColor: '#666',
              title: 'Error al hacer la búsqueda.',
              showConfirmButton: false,
              timer: 1200
            });
          }
        );
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          iconColor: '#666',
          title: 'Entrada errónea o vacía',
          showConfirmButton: false,
          timer: 1200
        });
        this.getDataProduct();
      }
    }else{
      this.router.navigate(['/login']);
    }
    
  }



  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }

  deleteProducto(id: number): void {
    if(this.isLogin()){
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        iconColor:'#666',
        showCancelButton: true,
        confirmButtonColor: '#666',
        cancelButtonColor: '#333',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProducto(id).subscribe({
              next: () => {
                this.getDataProduct();
              }, error: (error) => {
                console.error('Ocurrio un error al eliminar el libro')
              }
            }
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Eliminado!",
            text: "El libro ha sido eliminado.",
            showConfirmButton: false,
            timer: 1200
          }); 
        }


        
      });
      
    }else{
      this.router.navigate(['/login']);
    }

    
  }
}
