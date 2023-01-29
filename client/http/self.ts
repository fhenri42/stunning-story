import axios from 'axios';
import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';

const { publicRuntimeConfig } = getConfig();

const selfUrl = publicRuntimeConfig.SELF_URL;

export async function createStory(data: any) {
  try {
    const res = await fetch(`${selfUrl}/api/story/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteStory(id: any) {
  try {
    const res = await fetch(`${selfUrl}/api/story/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function updateStory(data: any) {
  try {
    const res = await fetch(`${selfUrl}/api/story/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateOnlyStoryGraph(data: any) {
  try {
    const res = await fetch(`${selfUrl}/api/story/updateStoryGraph`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function fileUpload(formData: any) {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log('Current progress:', Math.round((event.loaded * 100) / event.total));
      },
    };

    const response = await axios.post(`${selfUrl}/api/upload?fileName=${uuidv4()}`, formData, config);
    return response.data;
  } catch (e) {
    console.error(e);

    throw e;
  }
}
