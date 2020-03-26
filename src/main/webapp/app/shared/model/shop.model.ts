import { IProduct } from 'app/shared/model/product.model';
import { IUser } from 'app/core/user/user.model';

export interface IShop {
  id?: number;
  shopName?: string;
  products?: IProduct[];
  user?: IUser;
}

export class Shop implements IShop {
  constructor(public id?: number, public shopName?: string, public products?: IProduct[], public user?: IUser) {}
}
