import path from 'path';

import { Command } from 'commander';
import { serve } from '@jbook-test/local-api';

interface IErrType {
  code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'Port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(parseInt(options.port), filename, dir, !isProduction);
      console.log(
        `Opened ${filename}.\nNavigate to PORT: localhost:${options.port} to edit the file.`
      );
    } catch (error) {
      const hasErrCode = (x: any): x is IErrType => {
        return x.code;
      };

      if (hasErrCode(error)) {
        if (error.code === 'EADDRINUSE') {
          console.log('Port is in use. Try to running on a different port.');
        }
      } else {
        if (error instanceof Error) console.log('...', error.message);
      }

      process.exit(1);
    }
  });
