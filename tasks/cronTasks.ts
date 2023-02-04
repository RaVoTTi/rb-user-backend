import cron from 'node-cron'
import fs from 'fs'
import { Book, IBook } from '../api/book/book.models'
import { Order } from '../api/order/order.models'
import { nanoid } from 'nanoid'

const cronTasks = async () => {
 

    cron.schedule('0 0 * * * *', async () => {
        try {``
            const date = new Date()
            const orders = await Order.updateMany(
                {
                    condition: 'pending cashback',
                    // condition:'claimable cashback',

                    // 'pending cashback',
                    dateClaimable: { $lt: date },
                },
                {
                    // condition:'purchased',

                    condition: 'claimable cashback',
                    // dateClaimable: null
                }
            )

            console.log('Upgrade Succesfull')
        } catch (error) {
            console.error('Error in the upgrade:', error)
        }
    })
       // cron.schedule('*/5 * * * * *', function () {
    //     fs.readFile(
    //         'books/Books/books.json',
    //         { encoding: 'utf-8' },
    //         async (err, data) => {
    //             try {
    //                 if (err) throw err

    //                 let books = JSON.parse(data) as IBook[]
    //                 let newBooks = await books.map(
    //                     ({
    //                         content: oldContent,
    //                         name,
    //                         _id: oldid,
    //                         ...rest
    //                     }) => {
    //                         Book.findOne({
    //                             name: name.toLowerCase(),
    //                         }).then((book) => {
    //                             console.log(book)
    //                             if (!book) throw err

    //                             const content = fs.readFileSync(
    //                                 `books/Books/${name}.html`,
    //                                 {
    //                                     encoding: 'utf-8',
    //                                 }
    //                             )

    //                             return {
    //                                 content,
    //                                 _id: book.id,
    //                                 ...rest,
    //                             }
    //                         })
    //                     }
    //                 )
    //                 const finalBooks = JSON.stringify(newBooks)
    //                 fs.writeFile('books.json', finalBooks, function (err) {
    //                     if (err) throw err
    //                     console.log('books logged!')
    //                 })
    //             } catch (error) {
    //                 console.error(error)
    //             }
    //         }
    //     )
    // })
    // Replace with your actual cron library name


    // cron.schedule('*/5 * * * * *', function() {
    //     for (let index = 0; index < 5; index++) {
    //         console.log(nanoid(12))
            
    //     }

    // })

    // cron.schedule("*/15 * * * * *", function () {
    //     let heap = process.memoryUsage().heapUsed / 1024 / 1024;
    //     let date = new Date().toISOString();
    //     const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";

    //     //                 date | heap used | free memory
    //     let transferred = `${date}, ${heap}, ${freeMemory}\n`;

    //     // storing log In .csv file
    //     fs.appendFile("demo.csv", transferred, function (err) {
    //         if (err) throw err;
    //         console.log("server details logged!");
    //     });
    // });
    // cron.schedule('*/15 * * * * *', function () {
    //     fs.readdir(
    //         'books/Books/book.json',
    //         { encoding: 'utf-8' },
    //         function (err, data) {
    //             if (err) throw err
    //             data.forEach((book) => {
    //                 fs.readFile(
    //                     `books/Books/${book}`,
    //                     { encoding: 'utf-8' },
    //                     function (err1, data) {
    //                         if (err) throw err

    //                         const html = md.render(data, {})

    //                         fs.writeFile(
    //                             `books/Books/${book}`,
    //                             html,
    //                             function (err2) {
    //                                 if (err2) throw err2
    //                                 console.log('server details logged!')
    //                             }
    //                         )
    //                     }
    //                 )

    //             })
    //         }
    //     )
    // })

    // cron.schedule('0 0 * * * *', async () => {
    //     const aggregate = await Cashback.aggregate([
    //         {
    //             $match: {
    //                 transferred: false,
    //             },
    //         },
    //         {
    //             $group: {
    //                 _id: null,
    //                 ids: { $push: '$_id' },
    //                 transferred: {
    //                     $push: {
    //                         wallet: '$wallet',
    //                         amount: '$amount',
    //                     },
    //                 },
    //                 count: {
    //                     $sum: 1,
    //                 },
    //             },
    //         },
    //     ])

    //     if (aggregate?.[0]?.count ?? 0 > 0) {
    //         const { ids, transferred } = aggregate[0] as {
    //             ids: string[]
    //             transferred: [
    //                 {
    //                     wallet: string
    //                     amount: number
    //                 }
    //             ]
    //         }

    //         const cashback = await Cashback.updateMany(
    //             { _id: { $in: ids } },

    //             { $set: { transferred: true } }
    //         )

    //         let fileCsv =
    //             transferred.map((row) => Object.values(row).join(',')).join('\n') +
    //             '\n'

    //         // storing log In.transferred file
    //         fs.appendFile('cashback.transferred', fileCsv, function (err) {
    //             if (err) throw err
    //             console.log('server details logged!')
    //         })
    //     }
    // })
}

export default cronTasks
