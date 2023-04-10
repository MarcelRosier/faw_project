import json

with open("books.json", 'r') as file:
    books = json.load(file)
    for i, book in enumerate(books, start=1):
        book['id'] = i
        books[i-1] = book

with open("id_books.json", 'w') as f:
    json.dump(books, f)
