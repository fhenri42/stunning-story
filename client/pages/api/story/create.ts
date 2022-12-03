/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

async function createStory(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('AAAA');
    const { body } = req;
    body.slug = uuidv4();
    const data = await fetchCMS('/api/stories?populate[0]=id', 'POST', {
      data: body,

    });

    console.log('BBBBBBBBB', data);

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default createStory;
