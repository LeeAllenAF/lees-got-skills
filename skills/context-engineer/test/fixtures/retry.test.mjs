import assert from 'node:assert/strict';
import { maxAttempts } from './retry.mjs';
assert.equal(maxAttempts, 3);
