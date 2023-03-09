import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function createStory(data: any) {
  try {
    const res = await fetch('/api/story/create', {
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
    const res = await fetch(`/api/story/delete/${id}`, {
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
    const res = await fetch('/api/story/update', {
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
    const res = await fetch('/api/story/updateStoryGraph', {
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

    const response = await axios.post(`/api/upload?fileName=${uuidv4()}`, formData, config);
    return response.data;
  } catch (e) {
    console.error(e);

    throw e;
  }
}
