import { HttpClient } from '@angular/common/http';
import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  all_products:any = [];
  all_suppliers:any = [];
  products_suppliers:any = [];

  apiUrl: string = "http://localhost:3000/";

  constructor(private http:HttpClient) { 
    
    
  }

  ngOnInit(): void {
    this.setData();
  }
  
  setData()
  {
    
    this.http.get(this.apiUrl+'getAllProducts',{responseType:"json"}).subscribe(result => {
      this.all_products = result;
      this.all_products = this.all_products['data']['products'];
      
      this.http.get(this.apiUrl+'getAllSuppliers',{responseType:"json"}).subscribe(result => {
        this.all_suppliers = result;
        this.all_suppliers = this.all_suppliers['data']['suppliers'];
        this.all_products.forEach((p_element: any) => {
          this.all_suppliers.forEach((s_element: any) => {
              if(p_element['supplierCode'] == s_element['code'])
              {
                this.products_suppliers.push(s_element['name']);
              }
          });
        });
      });
    });  
    
  }

}
