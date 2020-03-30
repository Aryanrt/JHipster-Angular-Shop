import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.AnotheroneShopModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.AnotheroneProductModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AnotheroneEntityModule {}
