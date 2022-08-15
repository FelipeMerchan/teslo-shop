import type { NextApiRequest, NextApiResponse } from 'next';

import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces/products';
import { Product } from '../../../models';

type Data =
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'GET':
            return getProducts(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request',
            });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all' } = req.query;

    let condition = {};

    if(gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender };
    }

    await db.connect();
    /* Si no le pasamos ningun parametro al metodo find va a
    retornar todos los elementos. Usando lean hacemos que traiga menos informacion
    de cada elemento:  */
    const products = await Product.find(condition)
                                  /* Podemos seleccionar los campos que necesitemos: */
                                  .select('title images price inStock slug -_id')
                                  /* con -(nombre del campo) podemos deseleccionar */
                                  .lean();
    await db.disconnect();

    /* Por defecto el estado de la respuesta es 200, por lo que
    es opcional colocarlo. Es mejor solo porque es claro para cualquier dev
    cual es el estado que estamos regresando. */
    return res.status(200).json(products);
}
