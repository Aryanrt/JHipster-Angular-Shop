import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'app/shared/model/product.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | undefined;
  currentLogin: string | undefined;

  constructor(protected activatedRoute: ActivatedRoute, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.currentLogin = account?.login;
      //account?.login
    });
    this.activatedRoute.data.subscribe(({ product }) => (this.product = product));
  }

  previousState(): void {
    window.history.back();
  }
}
