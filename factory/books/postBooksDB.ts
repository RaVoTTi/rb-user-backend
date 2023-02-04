import mongoose from "mongoose";
import { Book, IBook } from "../../api/book/book.models";
import dbConnection from "../../config/database";
import fs from 'fs'

(async () => {
    const inputFileBooks = 'factory/books/books.json'
    try {
        const { MONGODB_CNN_TEST } = process.env

        await mongoose.connect("mongodb://fasedaff:8vDnUwekVQUh6nRAQg@154.56.51.88:27017/rb" || '') // It doesn't work  
        console.log('Database Online')

        const data = fs.readFileSync(inputFileBooks, 'utf-8');
        const booksJSON = JSON.parse(data);

        for (const book of booksJSON) {
            const bookDoc = new Book({ ...book });
            await bookDoc.save();
        }

        console.log('Data insertion completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the database connection when done
        mongoose.connection.close();

    }
})();






