import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product } from '../../../models';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
        default:
            res.status(400).json({ message: 'Bad request' });
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder;
    // Verificar que el usuario este autenticado
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Debe estar autenticado para hacer esto'});
    }

    const productListIds = orderItems.map(product => product._id);
    await db.connect();
    const dbProductList = await Product.find({ _id: { $in: productListIds } });

    try {
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProductList.find(prod => prod._id === current._id)?.price;

            if (!currentPrice) {
                throw new Error('Verifique el carrito de nuevo. El producto no existe');
            }

            return (currentPrice * current.quantity) + prev
        }, 0);
    } catch (error) {

    }

    return res.status(201).json(req.body);
};
