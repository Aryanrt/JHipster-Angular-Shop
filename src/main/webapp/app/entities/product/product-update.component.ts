import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from 'app/entities/shop/shop.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  shops: IShop[] = [];
  currentLogin: string | undefined;

  editForm = this.fb.group({
    id: [],
    productName: [],
    description: [],
    price: [],
    quantity: [],
    shop: []
  });

  constructor(
    protected productService: ProductService,
    protected shopService: ShopService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.currentLogin = account?.login;
      //account?.login
    });
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.shopService.query().subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      productName: product.productName,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      shop: product.shop
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      productName: this.editForm.get(['productName'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      shop: this.editForm.get(['shop'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IShop): any {
    return item.id;
  }
  filterShops(): IShop[] {
    return this.shops.filter(u => u.user?.login === this.currentLogin);
  }
}
