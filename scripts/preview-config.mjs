import { createHash } from 'node:crypto';
import { realpath } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
export const port = Number(process.env.PORT || 8766);
export const projectId = createHash('sha256').update(root).digest('hex');
export const stopPath = '/__preview/stop';
