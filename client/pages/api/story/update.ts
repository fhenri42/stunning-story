/* eslint-disable @typescript-eslint/no-throw-literal */
import { fetchCMS } from '@lib/cms';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import qs from 'qs';

async function updateStorySchema(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
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
    const [story] = await fetchCMS(`/api/stories?${cmsQuery}`, 'GET');
    const data = await fetchCMS(`/api/stories/${story.id}`, 'PUT', {
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
