/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

async function createPage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    console.log(body);
    const data = await fetchCMS('/api/pages', 'POST', {
      data: body,
    });
    console.log('BBBBBBBBB', data);

    res.json(data);
  } catch (error) {
    console.log(error);
    console.log('', error.details);
    res.status(error.status).json({ message: error.message });
  }
}

export default createPage;
