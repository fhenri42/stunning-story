import nextConnect from 'next-connect';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from 'lib/s3';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'o-plums-staging',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${req.query.fileName}`);
    },

    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
const apiRoute = nextConnect<any, any>({
  onError(error, req, res) {
    console.log('req.file', req.file);
    res
      .status(500)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    console.log('req.method', req.method);
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('bg-image'));

apiRoute.post(async (req, res) => {
  try {
    res.status(200).json({
      data: 'success',
      url: `${req.file.location}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
