#!/bin/bash
#

while IFS= read -r line; do
    touch "./Books/$line.md"

    touch "./Evaluations/$line.md"
done < ./books

