import mongoose from "mongoose";
import { Book, IBook } from "../../api/book/book.models";
import dbConnection from "../../config/database";
import fs from 'fs'
import sharp from 'sharp'
import { CLOUDINARY_KEY, CLOUDINARY_PRIVATE_KEY } from "../../config";
import { v2 as cloudinary } from 'cloudinary'



(async () => {
    try {
        const { MONGODB_CNN_TEST } = process.env

        await mongoose.connect(MONGODB_CNN_TEST || '') // It doesn't work  
        console.log('Database Online')
        cloudinary.config({
            cloud_name: 'dvzlb1euk',
            api_key: CLOUDINARY_KEY,
            api_secret: CLOUDINARY_PRIVATE_KEY,
            secure: true
        });
        const inputImgDir = 'factory/books/Images/'
        const outputImgDir = 'factory/books/ImagesWebp/'
        const inputFileBooks = 'factory/books/rb.Allbooks.json'
        const outputFileBooks = 'factory/books/rb.newBooks.json'


        const data = fs.readFileSync(
            inputFileBooks,
            { encoding: 'utf-8' },
        )
        const books = JSON.parse(data) as IBook[]

        const newBooksPromise = books.map(async (book) => {

            const testImage = book.image
            const testImageSM = book.imageSM


            if (testImage && !testImageSM) {

                const imageArray = testImage.split('/')
                const file = imageArray[imageArray.length - 1]
                const fileRaw = file.split('.')[0]

                if (!fs.existsSync(`${inputImgDir}${file}`)) return { ...book };


                await sharp(`${inputImgDir}${file}`).resize({ height: 200 }).webp().toFile(`${outputImgDir}${fileRaw}-sm.webp`)
                const { secure_url } = await cloudinary.uploader.upload(`${outputImgDir}${fileRaw}-sm.webp`)
                return {
                    ...book,
                    imageSM: secure_url,

                }
            } else {
                return { ...book }
            }



        })
        const newBooks = await Promise.all(newBooksPromise);
        console.log(newBooks[0]);
        const booksString = JSON.stringify(newBooks)

        fs.writeFileSync(inputFileBooks, booksString)

        console.log("Books was Made")


    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the database connection when done
        mongoose.connection.close();

    }
})();
