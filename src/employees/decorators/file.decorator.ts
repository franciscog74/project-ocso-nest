import { HttpException, HttpStatus, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";

export const FileInterceptorDecorator = UseInterceptors(
    FileInterceptor("file", {
        storage: diskStorage({
            destination: "./src/employees/employee-photos",
            filename: (req, file, cb) => {
                cb(null, req.params.id + path.extname(file.originalname));
            }
        }),
        fileFilter: (_req, file, cb) => {
            const extension = path.extname(file.originalname);
            const allowedExtensions = ['.png', '.jpg', '.jpeg'];
            if (file.size > 5242880)
                cb(new HttpException(`Validation failed (current file size is `
                    + `${extension}, maximum size is 5KB)`,
                    HttpStatus.BAD_REQUEST), false);
            if (!allowedExtensions.includes(extension))
                cb(new HttpException(`Validation failed (current file type is `
                    + `${extension}, expected type is /.(png|jpg|jpeg)/)`,
                    HttpStatus.BAD_REQUEST), false);
            else
                cb(null, true);
        }
    }
    ));