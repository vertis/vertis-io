import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Handle redirect from old blog domain
    if (event.url.hostname === 'blog.vertislabs.org') {
        return new Response(null, {
            status: 301,
            headers: {
                Location: `https://vertis.io${event.url.pathname}${event.url.search}`
            }
        });
    }

    const response = await resolve(event);
    return response;
};
