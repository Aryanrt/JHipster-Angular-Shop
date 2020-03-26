import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IShop, Shop } from 'app/shared/model/shop.model';
import { ShopService } from './shop.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-shop-update',
  templateUrl: './shop-update.component.html'
})
export class ShopUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  currentLogin: string | undefined;
  currentId: string | undefined;

  editForm = this.fb.group({
    id: [],
    shopName: [],
    user: []
  });

  constructor(
    protected shopService: ShopService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shop }) => {
      this.updateForm(shop);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
    this.accountService.identity().subscribe(account => {
      this.currentLogin = account?.login;

      //this.users.
      //this.currentId = account?.;
      //account?.login
    });
  }

  updateForm(shop: IShop): void {
    this.editForm.patchValue({
      id: shop.id,
      shopName: shop.shopName,
      user: shop.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shop = this.createFromForm();
    //Shop aaaaaaaaa;
    // Shop a = new Shop(shop.id);
    ///////////////
    this.accountService.identity().subscribe(account => {
      //shop = this.userService.find(<string>account?.login).subscribe();
      // shop.user = this.userService.find(<string>account?.login).subscribe();
      //this.shopTemp?.id = shop.id;
      //account?.login
      /*
      this.users.forEach(x => {
        if (x.login == account?.login) {
          console.log('Found')
        }
        else {
          console.log('Not found')
        }*/
    });
    //this.users.

    // })
    // this.shopTemp?.shopName = shop.shopName;
    //this.shopService.update()
    /////////////
    if (shop.id !== undefined) {
      this.subscribeToSaveResponse(this.shopService.update(shop));
    } else {
      this.subscribeToSaveResponse(this.shopService.create(shop));
    }
  }

  private createFromForm(): IShop {
    return {
      ...new Shop(),
      id: this.editForm.get(['id'])!.value,
      shopName: this.editForm.get(['shopName'])!.value,
      user: this.filterUsers().pop()
      //user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShop>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
  //this.users.filter((u) => u.login === this.currentLogin);
  filterUsers(): IUser[] {
    return this.users.filter(u => u.login === this.currentLogin);
  }
}
