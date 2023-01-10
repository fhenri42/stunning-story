/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getToken } from 'next-auth/jwt';

import qs from 'qs';

const { serverRuntimeConfig } = getConfig();

async function updateStorySchema(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getToken({ req, secret: serverRuntimeConfig.SECRET });

    const { body } = req;
    console.log('BODY', body);
    const data = await fetchCMS(`/api/stories/${body.id}`, 'PUT', session.jwt, {
      data: body,
    });
    console.log('BBBBBBBBB', data);

    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default updateStorySchema;
