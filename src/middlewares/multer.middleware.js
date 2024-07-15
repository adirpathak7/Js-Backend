import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/temp')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.failedname + '-' + uniqueSuffix)
        cb(null, file.originalname)
        console.log('Multer file is' + this.filename);
    }
})

export const upload = multer({ storage, })