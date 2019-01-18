import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [];
  filteredProducts = [];
  key1$: Observable<Product>;
  category$;
  category: string;

  constructor(private productService: ProductService, private category: CategoryService, route: ActivatedRoute) {
    productService.getAll().valueChanges().subscribe(products => this.products = products);
    this.category$ = this.category.getCategory();
    this.key1$ = this.category$.map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      }
    );
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;


    });
  }}
