const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'f7c026ce99b33a3999b45057738e3c13a833ae05190dde88d0605280ff2aa66e84e1529e240e10cf098d5473f254c607c4b23b6936c576e119394188442fc75f6397b4b3b400a93d5dc89a0389f5e7481b993748dcc0cae96a53566c253deb51cd24a336bfe51e9a0d4cf07fd865f90dc061a4d238ac13b4a0cc7ff3b5f951d9';
const cache = {};

function getStrapiURL(path = '') {
  return `${STRAPI_URL || 'http://localhost:1337'}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchCMS(path) {
  if (cache[path] && cache[path].data && Date.now() - cache[path].time < 10 * 60 * 1000) { // 10-min cache
    return cache[path].data;
  }

  try {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    const { data, error } = await response.json();
    cache[path] = {};
    if (data && data.length > 0) {
      // Collection type
      cache[path].data = data;
      cache[path].time = Date.now();
    } else if (data && data.attributes) {
      // Single type
      cache[path].data = data.attributes;
      cache[path].time = Date.now();
    } else {
      console.error(path, error);
    }
  } catch (err) {
    console.error('An error occurred: ', err);
  }

  return cache[path] && cache[path].data ? cache[path].data : {};
}
