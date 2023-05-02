import { Request } from "express";
import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
    destination: function(req: Request, file, cb: CallableFunction) {
        let folder;
        if(req.baseUrl.includes('pets')) {
            folder = "pets";
        }
        else if(req.baseUrl.includes('auth')) {
            folder = "users";
        }
        cb(null, `src/public/imgs/${folder}`);
    },
    filename: function(req: Request, file, cb: CallableFunction) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback) {
        console.log(req.body);
        console.log('file', file);
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error("Favor enviar somente arquivos de imagens"));
        }
        console.log('passou do if');
        callback(null, true);
    },
});

export default imageUpload;