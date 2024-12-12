import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.scss'
})
export class MainProductComponent {

}
