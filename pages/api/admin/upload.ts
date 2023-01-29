import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import Formidable from 'formidable';

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

const saveFile = async (file: Formidable.File) => {
  /* Cuando cargamos las imagenes ya existen en una carpeta temporal del servidor.
  Podemos acceder a esto haciendo uso del file system (fs) (filepath es el path
  de la imagen en esa carpeta temporal):  */
  const data = fs.readFileSync(file.filepath);
  /*Para hacer la escritura y movimiento de ese archivo a una carpeta en donde no se vaya
  a borrar (ya que la carpeta temporal como su nombre lo indica es algo que se borrara en
  algun momento) debemos usar writeFileSync: */
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  /* Elimina el archivo que se encuentra en el file system temporal: */
  fs.unlinkSync(file.filepath);
  return;
}

const parseFiles = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new Formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      console.log({ error, fields, files });

      if (error) {
        return reject(error);
      }

      await saveFile(files.file as Formidable.File);
      resolve(true);
    })
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await parseFiles(req);

  return res.status(200).json({ message: 'Imagen subida' });
};
