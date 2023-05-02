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
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error("Favor enviar somente arquivos de imagens"));
        }
        callback(null, true);
    },
});

export default imageUpload;