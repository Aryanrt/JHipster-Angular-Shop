import { IShop } from 'app/shared/model/shop.model';

export interface IProduct {
  id?: number;
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;
  shop?: IShop;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public productName?: string,
    public description?: string,
    public price?: number,
    public quantity?: number,
    public shop?: IShop
  ) {}
}
