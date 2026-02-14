import { ProductSpI } from "./productSp"

export interface CartResponseI {
  status: string
  message?:string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: ProductSpI
  price: number
}



