import { Route, Routes } from "@angular/router";
import { AddProductComponent } from "./addProduct/addProduct.component";

export const RouterChild : Routes = [
   
    {
        path:'add-product',
        component: AddProductComponent
    }
]