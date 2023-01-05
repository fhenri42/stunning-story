import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const selfUrl = publicRuntimeConfig.SELF_URL;

export async function createStory(data: any) {
  try {
    console.log('startRequest');
    const res = await fetch(`${selfUrl}/api/story/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateStory(data: any) {
  try {
    console.log('startRequest');
    const res = await fetch(`${selfUrl}/api/story/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// export async function deleteStory(slug) {
//   try {
//     const res = await fetch(`${selfUrl}/api/page/delete?slug=${slug}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (res.status !== 200) {
//       console.log('res', res.message);

//       throw new Error(res.message);
//     }
//     const json = await res.json();
//     return json;
//   } catch (e) {
//     console.log('Mais non =>', e);
//     throw e;
//   }
// }
