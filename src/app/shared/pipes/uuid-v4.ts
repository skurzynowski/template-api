import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';

export const ParseUUIDV4Pipe = new ParseUUIDPipe({ version: '4' });
