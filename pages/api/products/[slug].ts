import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
| { message: string }
| IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);    
        default:
            return res.status(400).json({ message: 'Metodo no existe' });
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query;

    await db.connect();
    const productInDB = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!productInDB) {
        return res.status(404).json({ message: `No hay un producto con el slug: ${slug}` })
    }

    productInDB.images = productInDB.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return res.status(200).json(productInDB);
};
