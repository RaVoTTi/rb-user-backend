import fs from 'fs'
import { IBook } from '../../api/book/book.models'

import { v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp'

const inputImgDir = 'factory/books/Images/'
const outputImgDir = 'factory/books/ImagesWebp/'
const inputEvalDir = 'factory/books/EvaluationsJSON/'



cloudinary.config({
    cloud_name: 'dvzlb1euk',
    api_key: '521813789316421',
    api_secret: 'j_GEePYIqEYGBxnfjk_o_zfVrsU',
    secure: true
});

fs.readdir(
    inputImgDir,
    { encoding: 'utf-8' },
    async function (err, images) {
        const books = await images.forEach(async (file) => {
            const fileRaw = file.split('.')[0]
            const data = fs.readFileSync(`${inputEvalDir}${fileRaw}.json`, { encoding: 'utf-8' })
            
            if(!data) {
                
                console.log(fileRaw)
                return
            }
            
            await Promise.all([
                sharp(`${inputImgDir}${file}`).resize({ height: 200 }).webp({ quality: 80 }).toFile(`${outputImgDir}${fileRaw}-sm.webp`),
                sharp(`${inputImgDir}${file}`).resize({ height: 400 }).webp({ quality: 80 }).toFile(`${outputImgDir}${fileRaw}.webp`),
            ])
            const book = JSON.parse(data) as IBook
            const [
                { secure_url: imageSM },
                { secure_url: image },
            ] = await Promise.all([
                cloudinary.uploader.upload(`${outputImgDir}${fileRaw}-sm.webp`),
                cloudinary.uploader.upload(`${outputImgDir}${fileRaw}.webp`)

            ])


            const newBook = {
                ...book,
                image,
                imageSM
            }
            const bookString = JSON.stringify(newBook)


            fs.writeFileSync(`${inputEvalDir}${fileRaw}.json`, bookString)

        })
        console.log("Books was Made")


    }
)