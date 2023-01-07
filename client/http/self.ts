import axios from 'axios';
import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';

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
export async function fileUpload(formData: any) {
  try {
    console.log('startRequest');

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log('Current progress:', Math.round((event.loaded * 100) / event.total));
      },
    };

    const response = await axios.post(`${selfUrl}/api/upload?fileName=${uuidv4()}`, formData, config);
    console.log(response);
    return response.data;
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
