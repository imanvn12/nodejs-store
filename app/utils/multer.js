const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createHttpError = require('http-errors');
// =========================================================================================

function pathUploadFile(req) {
    const pathRoutes = path.join(__dirname, '..', '..', 'public', 'uploads', 'blogs');
    fs.mkdirSync(pathRoutes, { recursive: true });
    req.body.imagepath = path.join('uploads', 'blogs').replace(/\\/g, '/');

    return pathRoutes
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = pathUploadFile(req);
        console.log(filePath);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = String(Date.now() + ext);
        console.log(fileName);
        req.body.filename = fileName;
        const validateExt = fileName.split('.')[1];
        if (['jpg', 'png', 'gif', 'jpeg'].includes(validateExt)) {
            cb(null, fileName)
        } else {
            cb(createHttpError.BadRequest('invalid file extension'))
        }

    }
})
// =====================================================================================================

function pathUploadvideo(req) {
    const pathRoutes = path.join(__dirname, '..', '..', 'public', 'uploads', 'video');
    fs.mkdirSync(pathRoutes, { recursive: true });
    req.body.videopath = path.join('uploads', 'video');
    return pathRoutes
}


const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = pathUploadvideo(req);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = String(Date.now() + ext);
        req.body.videoname = videoname;
        const validateExt = file.mimetype;
        if (['video/mp4', 'video/mkv', 'video/mpg', 'video/mov'].includes(validateExt)) {
            cb(null, fileName)
        } else {
            cb(createHttpError.BadRequest('invalid file extension'))
        }

    }
})

const fileFilter = 3 * 1000 * 1000
const videoFilter = 100 * 1000 * 1000

const uploadFile = multer({ storage }, { fileFilter })
const uploadvideo = multer({ storage: storageVideo }, { fileFilter: videoFilter })

module.exports = {
    uploadFile,
    uploadvideo
}