/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import qs from 'qs';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

async function updatePageSchema(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    console.log('AAAA', body);

    const cmsQuery = qs.stringify(
      {
        filters: {
          slug: {
            $eq: body.slug,
          },
        },

      },
      {
        encodeValuesOnly: true,
      },
    );
    const [page] = await fetchCMS(`/api/pages?${cmsQuery}`, 'GET');
    console.log(page);
    // TODO create the data
    const data = await fetchCMS(`/api/pages/${page.id}`, 'PUT', {
      data: body,
    });
    console.log('BBBBBBBBB', data);

    res.json('OK');
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
}

export default updatePageSchema;
