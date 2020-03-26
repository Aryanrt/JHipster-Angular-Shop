import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShop } from 'app/shared/model/shop.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-shop-detail',
  templateUrl: './shop-detail.component.html'
})
export class ShopDetailComponent implements OnInit {
  shop: IShop | null = null;
  currentLogin: string | undefined;

  constructor(protected activatedRoute: ActivatedRoute, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.currentLogin = account?.login;
      //account?.login
    });
    this.activatedRoute.data.subscribe(({ shop }) => (this.shop = shop));
  }

  previousState(): void {
    window.history.back();
  }
}
