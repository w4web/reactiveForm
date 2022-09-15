import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService } from 'src/app/shared/services/msg.service';
import { Product } from 'src/app/shared/models/product.model';
import { nameValidator } from 'src/app/shared/validators/common.validator';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})

export class EditProductComponent implements OnInit {

  id!: string;
  product!: Product;
  isAdd = true;
  form!: FormGroup;
  submitted = false;

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor( 
    private productService: ProductService, 
    private msgService: MsgService,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      id: [],
      image: ['', [Validators.required]],
      name: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.pattern("^[a-zA-Z]+$"),
        nameValidator(/jayesh/i) // Parameters could be omitted
      ]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    if ( this.id ) {

      this.isAdd = false;

      this.productService.find(this.id).subscribe(res => {

        this.product = res['body']['data'];
        this.form.patchValue(this.product);
        
      });

    }

  }

  previousState(): void {
    window.history.back();
  }

  // convenience getter for easy access to form fields

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    if( this.id !== undefined ) {
      this.editProduct();
    } else {
      this.addProduct();
    }

  }

  addProduct() {
    this.productService.create(this.form.value).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.success('Success!', 'Product added successfully!');
        }
        this.resetFields();
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  editProduct() {
    this.productService.update(this.id, this.form.value).subscribe({
      next: (res: any) => {
        if(res.status == 201) {
          this.msgService.success('Success!', 'Product edited successfully!');
        }
      },
      error: (err: any) => {
        this.msgService.errorHandle(err);
      }
    });
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

}
