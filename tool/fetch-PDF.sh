#! /usr/bin/env bash

if [ ! $1 ] || [ ! $2 ]; then
    cat <<EOF

Usage:

    fetch-PDF.sh folder/with/PDF/URL/text/files folder/save/PDF/Markdown/files"

EOF
    exit 1
fi

grep -Ei https?://.+\.pdf -r $1 -oh | xargs -I {} curl --create-dirs --output-dir $2 -O {}
(
    cd $2
    find ../$2 -type f | xargs -I {} pnpm --package=@bsorrentino/pdf-tools dlx pdftools pdf2md {}
)
