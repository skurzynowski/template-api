import { Provider } from '@nestjs/common';
import dotenv from 'dotenv';

import { ENV_SYNTAX_PARSER_TOKEN } from './constants';
import { EnvSyntaxParser } from './interfaces/env-syntax-parser';

export const envSyntaxParserProvider: Provider = {
  provide: ENV_SYNTAX_PARSER_TOKEN,
  useFactory: async (): Promise<EnvSyntaxParser> => {
    return dotenv;
  },
};
