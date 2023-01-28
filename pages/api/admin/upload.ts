import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

type Data = {
  message: string
}

/* Next.js realiza un body parser del body. Para el caso de las imagenes (que son archivos, no son puro texto)
que enviamos en el body no vamos a querer que realice ese parse del body, por lo cual para indicarle a Next que no
serialice lo que viene en el body debemos hacer la siguiente configuracion: */
export const config = {
  api: {
    bodyParser: false,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);  
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const parseFiles = async (req: NextApiRequest) => {

};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await parseFiles(req);

  return res.status(200).json({ message: 'imagen subida' });
};
