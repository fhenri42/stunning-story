/* eslint-disable compat/compat */
import { marked } from 'marked';
import getConfig from 'next/config';
import fetch from 'node-fetch';

const { serverRuntimeConfig } = getConfig();
const cache = {};

marked.setOptions({
  gfm: true,
  breaks: true,
});

function getStrapiURL(path = '') {
  return `${serverRuntimeConfig.STRAPI_URL || 'http://localhost:1337'}${path}`;
}

// The website uses en-us as locale, whereas the CMS uses en-US (uppercase)
export function formatCMSLocale(locale) {
  const [language, country] = locale.split('-');

  return `${language}-${country.toUpperCase()}`;
}

export function formatMarkdownToHTML(md) {
  return marked.parse(md);
}

// Helper to make requests to Strapi
export async function fetchCMS(path, method, jwt, payload) {
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
      body: JSON.stringify(payload),
    });

    console.log(requestUrl, {
      method,
      headers,
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    return res.data;
    // cache[path] = {};
    // if (data && data.length > 0) {
    //   // Collection type
    //   cache[path].data = data;
    //   cache[path].time = Date.now();
    // } else if (data && data.attributes) {
    //   // Single type
    //   cache[path].data = data.attributes;
    //   cache[path].time = Date.now();
    // } else {
    //   throw error;
    // }
  } catch (err) {
    console.error('An error occurred: ', err);
    throw err;
  }
}
