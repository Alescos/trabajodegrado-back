const multer = require('multer');
const path = require('path');

// type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../../images'),
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: diskstorage,
});

export default upload;
