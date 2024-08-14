#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 \"Post Title\""
    exit 1
fi

# Replace spaces with dashes and convert to lowercase for the slug
SLUG=$(echo "$1" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)

# Get the current date in the required format
DATE=$(date +%Y-%m-%d)

# Full filename
FILENAME="_posts/$DATE-$SLUG.md"

# Create a new markdown file with frontmatter
cat << EOF > $FILENAME
---
published: true
layout: post
title: "$1"
author: vertis
minutes_read: 
feature_image:
  url: 
caption: ""
meta_description: ""
tags:
  - 
---

EOF

echo "New markdown post created: $FILENAME"
