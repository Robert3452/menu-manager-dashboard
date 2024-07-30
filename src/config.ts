export const httpServices = {
  menuManager: process.env.NEXT_PUBLIC_MENU_MANAGER,
  apiKey: process.env.API_KEY,
  authManager: process.env.NEXT_PUBLIC_AUTH_MANAGER,
  expirationToken: process.env.EXPIRATION_TOKEN,
};

export const gtmConfig = {
  containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
};
