import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req, saveLocally, fields = formidable.fields, files = formidable.Files) => {
    const options = formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/assets/upload");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/assets/upload"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/assets/upload"));
    }
    const file = await readFile(req, true);
    const fileName = file.files.myImage.newFilename;
    res.json({ data: fileName, status: true, message: "Image is uploaded successfully." });
};

export default handler;