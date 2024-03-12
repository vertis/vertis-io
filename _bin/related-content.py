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
