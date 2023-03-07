import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

function getStrapiURL(path = '') {
  return `${serverRuntimeConfig.STRAPI_URL || 'http://localhost:1337'}${path}`;
}

// Helper to make requests to Strapi
export async function fetchMe(path, method, jwt) {
  try {
    const headers = new Headers();
    headers.append(
      'Authorization',
      `Bearer ${jwt || serverRuntimeConfig.STRAPI_TOKEN}`,
    );

    headers.append('Content-Type', 'application/json');
    const requestUrl = getStrapiURL(path);

    const response = await fetch(requestUrl, {
      method,
      headers,
    });

    const me = await response.json();
    return me;
  } catch (err) {
    console.error('An error occurred: ', err);
    throw err;
  }
}
