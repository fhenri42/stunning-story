/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getToken } from 'next-auth/jwt';

import qs from 'qs';

const { serverRuntimeConfig } = getConfig();

async function deleteStory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getToken({ req, secret: serverRuntimeConfig.SECRET });

    const { query } = req;
    console.log('BODY', query);
    const data = await fetchCMS(`/api/stories/${query.id}`, 'DELETE', session.jwt);
    console.log('BBBBBBBBB', data);

    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default deleteStory;
