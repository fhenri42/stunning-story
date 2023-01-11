/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getToken } from 'next-auth/jwt';

const { serverRuntimeConfig } = getConfig();

async function deleteStory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getToken({ req, secret: serverRuntimeConfig.SECRET });

    const { query } = req;
    await fetchCMS(`/api/stories/${query.id}`, 'DELETE', session.jwt);
    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default deleteStory;
