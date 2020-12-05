import { Module } from '@nestjs/common';

import { envSyntaxParserProvider } from './providers/env-syntax-parser/env-syntax-parser';
import { nativeFileSystemProvider } from './providers/native-file-system/native-file-system';
import { FileSystemService } from './services/main/main';

@Module({
  providers: [nativeFileSystemProvider, envSyntaxParserProvider, FileSystemService],
  exports: [nativeFileSystemProvider, envSyntaxParserProvider, FileSystemService],
})
export class FileSystemModule {}
