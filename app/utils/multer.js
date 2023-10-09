const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createHttpError = require('http-errors');

function pathUploadFile(req) {
    const pathRoutes = path.join(__dirname, '..', '..', 'public', 'uploads', 'blogs');
    fs.mkdirSync(pathRoutes, { recursive: true });
    req.body.imagepath = path.join('uploads', 'blogs');
    return pathRoutes
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = pathUploadFile(req);
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = String(Date.now() + ext);
        req.body.filename = fileName;
        const validateExt = fileName.split('.')[1];
        if (['jpg', 'png', 'gif', 'jpeg'].includes(validateExt)) {
            cb(null, fileName)
        } else {
            cb(createHttpError.BadRequest('invalid file extension'))
        }

    }
})

const fileFilter = 1 * 1000 * 1000

const uploadFile = multer({ storage }, { fileFilter })

module.exports = {
    uploadFile
}