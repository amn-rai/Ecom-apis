import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { extname, join } from 'path';
aws.config.update({
    secretAccessKey: 'v+2vq5t26hUgtP9pZ8Y/ZL2TOPMF5axsRPgbpQmw',
    accessKeyId: 'AKIAJAKFWYCRX5FDELWA',
    region: 'eu-west-2'
});
const s3 = new aws.S3();

function uploadSingleFileToLocal(key: string) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, '../uploads/csv'));
        },
        filename: function (req, file, cb) {
            cb(null, `file-${Date.now()}${extname(file.originalname)}`);
        }
    });
    const upload = multer({ storage });
    return upload.single(key);
}
function uploadSingleFileToLocal_Invoice(key: string) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, '../uploads/invoices'));
        },
        filename: function (req, file, cb) {
            cb(null, `file-${Date.now()}${extname(file.originalname)}`);
        }
    });
    const upload = multer({ storage });
    return upload.single(key);
}
function uploadSingleFileToS3(key: string) {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: 'baclassic',
            key: function (req, file, cb) {
                cb(null, `${key}/file-${Date.now()}${extname(file.originalname)}`);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }).single(key);
}

function uploadMultipleFileToS3(key1: string, key2: string) {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: 'baclassic',
            key: function (req, file, cb) {
                cb(null, `images/file-${Date.now()}${extname(file.originalname)}`);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }).fields([
        { name: key1, maxCount: 1 },
        { name: key2, maxCount: 1 }
    ]);
}

function isImage(filename) {
    const extension = extname(filename).toLowerCase();
    switch (extension) {
        case '.jpg':
            return '.jpg';
        case '.jpeg':
            return '.jpeg';
        case '.png':
            return '.png';
        default:
            return false;
    }
}
function isVideo(filename) {
    const extension = extname(filename).toLowerCase();
    switch (extension) {
        case '.mp4':
            return '.mp4';
        case '.mov':
            return '.mov';
        case '.avi':
            return '.avi';
        case '.mkv':
            return '.mkv';
        default:
            return false;
    }
}
export {
    uploadSingleFileToS3,
    uploadSingleFileToLocal_Invoice,
    uploadMultipleFileToS3,
    isImage,
    isVideo,
    uploadSingleFileToLocal
};