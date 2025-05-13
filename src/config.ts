/**
 * Configuration globale de l'application
 */
export const config = {
  api: {
    baseUrl: 'https://yummeal-server.deno.dev'
  },
  facebook: {
    pixelId: process.env.REACT_APP_FB_PIXEL_ID || '123456789012345',
    accessToken: process.env.REACT_APP_FB_ACCESS_TOKEN || '',
    testEventCode: process.env.REACT_APP_FB_TEST_EVENT_CODE || ''
  },
  tracking: {
    enabled: process.env.NODE_ENV === 'production'
  }
};
