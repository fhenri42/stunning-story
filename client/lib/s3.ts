import aws from 'aws-sdk';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const s3 = new aws.S3({
//   endpoint: 'https://s3.gra.cloud.ovh.net',
//   s3ForcePathStyle: true,
//   region: 'eu3',
  accessKeyId: serverRuntimeConfig.accessKeyId,
  secretAccessKey: serverRuntimeConfig.secretAccessKey,
});

s3.config.httpOptions.timeout = 0;

export default s3;
