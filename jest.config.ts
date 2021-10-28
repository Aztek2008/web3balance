import type { Config } from '@jest/types';

// Or async function
const verbose = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};

export default verbose;
