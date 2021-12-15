import { HttpClient } from '@angular/common/http';
import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  input_name:any='';
  input_price:any='';
  input_amount:any='';
  input_supplier:any='';
  @Input() products = [];
  @Input() suppliers = [];
  apiUrl: string = "http://localhost:3000/";
  validity_message='none';
  @Output("reRender") set_data_emmiter:EventEmitter<any> = new EventEmitter();

  constructor( private http:HttpClient) { }

  ngOnInit(): void {

  }
  checkSupplierExists():string{
    let check_Exists ="false";
    this.suppliers.forEach(s_element => {
      
      if(s_element['name']==this.input_supplier){
        check_Exists = s_element['code'];
      }
    });
    return check_Exists;
  }

  saveNewProduct(){
    if(this.input_amount =="" || this.input_name==""|| this.input_price=="" || this.input_supplier==""){
      this.validity_message = 'must fill all inputs';
      return;
    }
    let supplier_exists = this.checkSupplierExists();
    let product_exists = false;
    
    this.products.forEach(p_element => {
      if(p_element['name']==this.input_name)
      { 
        product_exists = true;
        
        this.http.put(this.apiUrl+'updateExistingProduct',{
          "code": p_element['code'],
          "name":this.input_name,
          "price": this.input_price,
          "amount": this.input_amount,
          "supplierCode": supplier_exists
         }).subscribe((result: any) => {
          this.validity_message = 'none';
          this.set_data_emmiter.emit();
          return;
         });
         
         
         
        }
      
    });
    if(supplier_exists!="false" && !product_exists)
    {
       this.http.post(this.apiUrl+'addNewProduct',{
        "code": "f000"+(this.products.length+1),
        "name":this.input_name,
        "price": this.input_price,
        "amount": this.input_amount,
        "supplierCode": supplier_exists
       }).subscribe((result: any) => {
        this.validity_message = 'none';
        this.set_data_emmiter.emit();
        return;
       });
       
       
       
    }
    if(supplier_exists=="false"){
      this.validity_message = 'supplier does not exist  in the system';
    }
  }
}
