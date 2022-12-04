/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import qs from 'qs';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

async function createPage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    const cmsQuery = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },

      },
      {
        encodeValuesOnly: true,
      },
    );
    console.log(cmsQuery, cmsQuery);
    const [page] = await fetchCMS(`/api/pages?${cmsQuery}`, 'GET');
    console.log('page', page);
    const data = await fetchCMS(`/api/pages/${page.id}`, 'DELETE');

    res.json(data);
  } catch (error) {
    console.log(error);
    console.log('', error.details);
    res.status(error.status).json({ message: error.message });
  }
}

export default createPage;
