/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getToken } from 'next-auth/jwt';

const { serverRuntimeConfig } = getConfig();

async function updateStorySchema(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getToken({ req, secret: serverRuntimeConfig.SECRET });

    const { body } = req;
    await fetchCMS(`/api/stories/${body.id}`, 'PUT', session.jwt, {
      data: body,
    });

    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default updateStorySchema;
