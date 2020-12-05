import { Provider } from '@nestjs/common';
import fs from 'fs-extra';

import { NATIVE_FILE_SYSTEM_TOKEN } from './constants';
import { NativeFileSystem } from './interfaces/native-file-system';

export const nativeFileSystemProvider: Provider = {
  provide: NATIVE_FILE_SYSTEM_TOKEN,
  useFactory: async (): Promise<NativeFileSystem> => {
    return fs;
  },
};
