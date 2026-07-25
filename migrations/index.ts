import * as migration_20260725_160330_init from './20260725_160330_init';

export const migrations = [
  {
    up: migration_20260725_160330_init.up,
    down: migration_20260725_160330_init.down,
    name: '20260725_160330_init'
  },
];
