import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const router = express.Router();

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface IErrType {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const fullPath = path.join(filename, dir);

  router.use(express.json());

  router.get('/cells', async (req: Request, res: Response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (error) {
      const hasErrCode = (x: any): x is IErrType => {
        return x.code;
      };

      if (hasErrCode(error)) {
        if (error.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        } else {
          throw error;
        }
      } else {
        if (error instanceof Error) console.log('...', error.message);
      }
    }
  });

  router.post('/cells', async (req: Request, res: Response) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'OK' });
  });

  return router;
};
