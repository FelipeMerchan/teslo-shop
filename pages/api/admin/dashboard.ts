import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, User, Product } from '../../../models';

type Data = {
  lowInventory: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfOrders: number;
  numberOfProducts: number;
  paidOrders: number;
  productsWithNoInventory: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  const [
    lowInventory,
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithNoInventory,
  ] = await Promise.all([
    Product.find({ inStock: { $lte: 10 } }).count(),
    User.find({ role: 'client' }).count(),
    Order.count(),
    Product.count(),
    Order.find({ isPaid: true }).count(),
    Product.find({ inStock: 0 }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    lowInventory,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithNoInventory,
  })
}
