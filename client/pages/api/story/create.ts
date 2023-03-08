/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { fetchMe } from '@lib/me';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from 'next-auth/jwt';

const { serverRuntimeConfig } = getConfig();
async function createStory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session : any = await getToken({ req, secret: serverRuntimeConfig.SECRET });
    const { body } = req;
    body.slug = uuidv4();
    body.publishedAt = null;
    body.author = session.id;
    const data = await fetchCMS('/api/stories?populate[0]=id', 'POST', session.jwt, {
      data: body,
    });
    if (!data) {
      throw new Error('Something went wrong');
    }
    const me: any = await fetchMe(
      '/api/users/me?populate[0]=stories',
      'GET',
      session.jwt,
    );
    let newStories = [];
    if (me.stories) {
      newStories = [...me.stories, data.id];
    } else {
      newStories = [data.id];
    }
    await fetchCMS(`/api/users/${session.id}`, 'PUT', session.jwt, {
      ...session.user,
      image: session.picture,
      stories: newStories,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
}

export default createStory;
