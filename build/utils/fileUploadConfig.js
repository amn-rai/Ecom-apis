"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleFileToLocal = exports.isVideo = exports.isImage = exports.uploadMultipleFileToS3 = exports.uploadSingleFileToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = require("path");
aws_sdk_1.default.config.update({
    // secretAccessKey: '',
    // accessKeyId: '',
    region: ''
});
const s3 = new aws_sdk_1.default.S3();
function uploadSingleFileToLocal(key) {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.join(__dirname, '../uploads/file/'));
        },
        filename: function (req, file, cb) {
            cb(null, `file-${Date.now()}${path_1.extname(file.originalname)}`);
        }
    });
    const upload = multer_1.default({ storage });
    return upload.single(key);
}
exports.uploadSingleFileToLocal = uploadSingleFileToLocal;
function uploadSingleFileToS3(key) {
    return multer_1.default({
        storage: multer_s3_1.default({
            s3: s3,
            bucket: 'baclassic',
            key: function (req, file, cb) {
                cb(null, `${key}/file-${Date.now()}${path_1.extname(file.originalname)}`);
            },
            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE
        })
    }).single(key);
}
exports.uploadSingleFileToS3 = uploadSingleFileToS3;
function uploadMultipleFileToS3(key1, key2) {
    return multer_1.default({
        storage: multer_s3_1.default({
            s3: s3,
            bucket: 'baclassic',
            key: function (req, file, cb) {
                cb(null, `images/file-${Date.now()}${path_1.extname(file.originalname)}`);
            },
            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE
        })
    }).fields([
        { name: key1, maxCount: 1 },
        { name: key2, maxCount: 1 }
    ]);
}
exports.uploadMultipleFileToS3 = uploadMultipleFileToS3;
function isImage(filename) {
    const extension = path_1.extname(filename).toLowerCase();
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
exports.isImage = isImage;
function isVideo(filename) {
    const extension = path_1.extname(filename).toLowerCase();
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
exports.isVideo = isVideo;
//# sourceMappingURL=fileUploadConfig.js.map