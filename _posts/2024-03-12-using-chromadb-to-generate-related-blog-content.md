---
published: true
layout: post
title: "Using ChromaDB to Generate Related Blog Content"
author: vertis
minutes_read: 3
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/623eaa5b-22de-4fb6-ccbb-e38e9bea8e00/w=800
  preview_url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/623eaa5b-22de-4fb6-ccbb-e38e9bea8e00/w=450
caption: ""
meta_description: ""
tags:
  - 
---

I generate my blog with Jekyll. I’ve always loved the simplicity and flexibility that Jekyll provides. Jekyll allows us to store data as yaml in `_data` and retrieve it later. I wanted to copy [Simon Willison](https://simonwillison.net/2023/Oct/23/embeddings/#related-content-using-embeddings) and generate related content. I don't have anywhere near the number of articles but it's the exercise that matters.

Unlike Simon, I really want to use existing tools to do the embedding. Simon is working on quite a number of Python packages. I'm going to start by using [ChromaDB](https://www.trychroma.com/) to do the heavy-lifting.  [ChromaDB](https://www.trychroma.com/) describes itself as "the AI-native open-source embedding database".

It's written in Python, which is pretty standard for ML tools. This is a minor downside for us, because Jekyll is Ruby based, but given that we're just going to store this in `_data` anyway, I can just run it on my machine before pushing for now -- I'll just have to remember.

First we install the dependencies:

```bash
pip install chromadb
pip install pyyaml
```

Then create a python script to run the embedding and save the results to a file.

```python
import os
import yaml
import chromadb
from chromadb.utils import embedding_functions

chroma_client = chromadb.Client()
default_ef = embedding_functions.DefaultEmbeddingFunction()

collection = chroma_client.create_collection(name="vertis-io", embedding_function=default_ef, metadata={ "hnsw:space": "cosine" })

folder_name = "."
allowed_paths = ["_posts"]
markdown_files = []

for root, dirs, files in os.walk(folder_name):
    if any(allowed_path in root for allowed_path in allowed_paths):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                markdown_files.append(file_path)


for file_path in markdown_files:
    try:
        with open(file_path, "r", encoding="utf-8") as o:
            content = o.read()  # Changed from readlines to read
            file_name = os.path.basename(file_path)
            collection.add(
                documents=[content],  # Directly using read content
                metadatas=[{"source": file_name}],
                ids=[file_name]  # Removed f-string as it's unnecessary
            )
    except UnicodeDecodeError:
        # some files are not utf-8 encoded; let's ignore them for now.
        pass

related_content = {}

for file_path in markdown_files:
    try:
        file_name = os.path.basename(file_path)
        doc = collection.get(ids=[file_name], include=["embeddings", "metadatas"])
        if doc:
            doc_embeddings = doc['embeddings']
            nearest_matches = collection.query(
                query_embeddings=doc_embeddings,
                n_results=5,
                where={"source": {"$ne": file_name}}
            )
            filtered_ids = [id for id, distance in zip(nearest_matches['ids'], nearest_matches['distances'][0]) if distance < 0.5]
            related_content[file_name] = filtered_ids
    except UnicodeDecodeError:
        # some files are not utf-8 encoded; let's ignore them for now.
        pass

with open('_data/related_content.yml', 'w', encoding='utf-8') as file:
    yaml.dump(related_content, file, allow_unicode=True)


```

From there it's a simple matter to use the data in `_data/related_content.yml` to generate the similar articles.

```liquid
{% raw %}
{% assign related_content = site.data.related_content[page.name] %}
{% if related_content.size > 0 %}
    <section class="mt-12">
        <h2 class="text-2xl font-bold">Related Content</h2>
        <ul class="mt-4 list-disc">
            {% for post_filename in related_content %}
                {% assign post = site.posts | where: "name", post_filename | first %}
                {% if post %}
                    <li>
                        <a class="text-blue-500 hover:underline" href="{{ post.url }}">{{ post.title }}</a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </section>
{% endif %}
{% endraw %}
```

Styling as appropriate.
