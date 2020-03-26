import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShop } from 'app/shared/model/shop.model';
import { ShopService } from './shop.service';
import { ShopDeleteDialogComponent } from './shop-delete-dialog.component';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Component({
  selector: 'jhi-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit, OnDestroy {
  shops?: IShop[];
  eventSubscriber?: Subscription;
  currentSearch: string;
  currentAccount: Account | undefined;
  currentUser: User | undefined;
  users: User[] | null = null;
  userListSubscription?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;
  currentLogin: string | undefined;

  constructor(
    protected shopService: ShopService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.shopService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));

      //
      // this.userService
      //   .query({
      //     page: this.page - 1,
      //     size: this.itemsPerPage,
      //     sort: this.sort()
      //   })
      //   .subscribe((res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers));
      // //
      return;
    }

    this.shopService.query().subscribe((res: HttpResponse<IShop[]>) => (this.shops = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.currentLogin = account?.login;
      //account?.login
    });
    this.loadAll();
    this.registerChangeInShops();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShop): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShops(): void {
    this.eventSubscriber = this.eventManager.subscribe('shopListModification', () => this.loadAll());
  }

  delete(shop: IShop): void {
    const modalRef = this.modalService.open(ShopDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shop = shop;
  }
}
