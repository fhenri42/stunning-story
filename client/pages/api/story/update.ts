/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

async function updateStorySchema(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('AAAA');
    const { body, query } = req;
    console.log(body);

    // TODO create the data
    // const data = fetchCMS('/api/stories', 'POST', {
    //   data: body,

    // });
    console.log('BBBBBBBBB');
    // const reponse: any = await fetch(

    //   `${publicRuntimeConfig.POWERZ_ROCKETCHAT_HTTP_URI}api/v1/login`,
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       user: 'backoffice@powerz.tech',
    //       password: serverRuntimeConfig.RC_ADMIN_PASSWORD,
    //     }),
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   },
    // );
    // if (!reponse.ok) {
    //   const { detail } = await reponse.json();
    //   throw { detail, status: reponse.status };
    // }
    // const data = await reponse.json();
    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default updateStorySchema;
