import {Routes} from '@angular/router';
import {ProductoComponent} from './pages/producto/producto.component';
import {LoginComponent} from './pages/login/login.component';
import {InicioComponent} from './pages/inicio/inicio.component';
import {AddProductComponent} from './pages/addProduct/addProduct.component';
import {EditProductComponent} from "./pages/edit-product/edit-product.component";
import { MainProductComponent } from './pages/main-product/main-product.component';
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'producto',
    component: MainProductComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-product',
        
      },
      {
        path: 'list-product',
        component: ProductoComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        canActivate: [authGuard]
      },
      
    ]
  },
  // Ruta comodín para manejar rutas no coincidentes
  {
    path: '**',
    redirectTo: '/inicio'
  }
];
