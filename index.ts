/**
 * Package entry point for US Coffee Roasters
 * Exports data, types, and utility functions
 */

import roasters from "./data.json";
import type { Roaster } from "./src/types";

// Export data as both default and named export
export { roasters };
export default roasters;

// Export TypeScript types
export type { Roaster };

// Export utility functions
export {
  findByState,
  searchByName,
  findByWebsite,
  filterByStates,
} from "./src/utils/search";

export { getStats, getStateCounts, getStates } from "./src/utils/stats";
