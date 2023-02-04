#!/bin/bash
# npx ts-node factory/books/makeHTML.ts &&
# for book in  factory/books/Evaluations/*; do
#     bookJSON="${book//.md/.json}"
#     newBook="${bookJSON//Evaluations/EvaluationsJSON}"

    
#     cp "$book" "$newBook"
# done 
# npx ts-node factory/books/makeImages.ts &&
# npx ts-node factory/books/makeImageSM.ts  

# npx ts-node factory/books/makeJSON.ts
#npx ts-node factory/books/postBooksDB.ts

path=factory/books/
rm $path"Images/"* $path"ImagesWebp/"* $path"BooksHTML/"* $path"Books/"* $path"Evaluations/"* $path"EvaluationsJSON/"* 

