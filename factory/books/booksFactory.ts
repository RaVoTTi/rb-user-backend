import cron from 'node-cron'
import fs from 'fs'
import { Book, IBook } from '../../api/book/book.models'

const booksFactory = async () => {
    //*
    // cron.schedule('*/5 * * * * *', async function () {
    //     try {
    //         const data = await fs.promises.readFile('tasks/books.json', {
    //             encoding: 'utf-8',
    //         })
    //         const rawIds = await fs.promises.readFile('tasks/ids.json', {
    //             encoding: 'utf-8',
    //         })

    //         let books = JSON.parse(data) as IBook[]
    //         let ids = JSON.parse(rawIds) as { [key: string]: string }

    //         const newBooksPromises = books.map(
    //             async ({ content: oldContent, name, _id: oldid, ...rest }) => {
    //                 const book = ids[name.toLocaleLowerCase()] ?? 'id'

    //                 if (!book) {
    //                     throw new Error('Book not found') // Replace with a more descriptive error message
    //                 }

    //                 const content = await fs.promises.readFile(
    //                     `books/Books/${name}.html`,
    //                     { encoding: 'utf-8' }
    //                 )

    //                 return {
    //                     content,
    //                     _id: book,
    //                     name,
    //                     ...rest,
    //                 }
    //             }
    //         )

    //         const newBooks = await Promise.all(newBooksPromises)
    //         const finalBooks = JSON.stringify(newBooks)

    //         await fs.promises.writeFile('tasks/result.json', finalBooks)
    //         console.log('books logged!')
    //     } catch (error) {
    //         console.error('Error processing books:', error)
    //     }
    // })

    cron.schedule('*/15 * * * * *', async function () {
        // const data = await fs.promises.readFile('factory/books/result.json', {
        //     encoding: 'utf-8',
        // })
        // let books = JSON.parse(data) as IBook[]

        // await books.forEach(({ _id, name: capitalice, ...rest }) => {
        //     const name = capitalice.toLocaleLowerCase()

        //     const book = Book.findByIdAndUpdate(
        //         { _id },
        //         { name, ...rest },
        //         { new: true }
        //     )

        //     console.log(book.name, 'Updated')
        // })

        // console.log('Books updated')
        // Read and parse the JSON file
        const data = await fs.readFileSync('factory/books/result.json', {
            encoding: 'utf-8',
        })
        let books = JSON.parse(data) as IBook[]


        const updatePromises = books.map(
            async ({ _id, name: capitalice, ...rest }) => {
                const name = capitalice.toLocaleLowerCase()
                console.log(capitalice)

                // Update book in the database
                const book = await Book.findByIdAndUpdate(
                    { _id },
                    { name, ...rest },
                    { new: true }
                )

                return book
            }
        )

        // Wait for all books to be updated
        const updatedBooks = await Promise.all(updatePromises)

        console.log(`${updatedBooks.length} books updated`)
    })
}
export default booksFactory
