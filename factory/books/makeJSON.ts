import fs from 'fs'
import { IBook } from '../../api/book/book.models'



const inputEvalDir = 'factory/books/EvaluationsJSON/'
const inputHTMLDir = 'factory/books/BooksHTML/'
const outputDir = 'factory/books/'


fs.readdir(
    inputEvalDir,
    { encoding: 'utf-8' },
    async function (err, booksEvaluations) {
        const books = await booksEvaluations.map((file) => {
            const fileRaw = file.split('.')[0]
            const data = fs.readFileSync(`${inputEvalDir}${file}`, { encoding: 'utf-8' })


            if(data){

                const book = JSON.parse(data) as IBook
                // console.log(book)
                const content = fs.readFileSync(`${inputHTMLDir}${fileRaw}.html`, { encoding: 'utf-8' })
                
                return {
                    ...book,
                    content,
                    subject: "64f374de3cf19f490e4fb427",
                    autor: "64f375163cf19f490e4fb42a"
                }
            }
            else {
                return {}
            }
        })
        const booksString = JSON.stringify(books)
        fs.writeFile(`${outputDir}books.json`, booksString , function (err) {
            if (err) throw err
            console.log('The Books was made')
        })

    }
)
