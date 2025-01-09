import type { PageServerLoad } from './$types';

// The home page now only uses siteConfig from $lib/config
// which is imported directly in the page component
export const load: PageServerLoad = async () => {
  return {};
};
