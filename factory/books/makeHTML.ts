import fs from 'fs'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

const inputDir = 'factory/books/Books/'
const outputDir = 'factory/books/BooksHTML/'

fs.readdir(
    inputDir,
    { encoding: 'utf-8' },
    function (err, data) {
        if (err) throw err
        data.forEach((book) => {
            fs.readFile(
                `${inputDir}${book}`,
                { encoding: 'utf-8' },
                function (err1, data) {
                    if (err) throw err

                    const html = md.render(data, {})
                    
                    const htmlName = book.split('.')[0] + '.html'
                    fs.writeFile(
                        `${outputDir}${htmlName}`,
                        html,
                        function (err2) {
                            if (err2) throw err2
                        }
                    )
                }
            )

        })
    }
)