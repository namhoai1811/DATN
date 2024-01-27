from flask import Flask, render_template, request
from flask_cors import CORS
import pandas as pd
import random
import json

app = Flask(__name__)
CORS(app)
file_stopword = 'vietnamese-stopwords.txt'

my_file = open(file_stopword, "r", encoding="utf-8")

# reading the file
data = my_file.read()

# replacing end splitting the text
# when newline ('\n') is seen.
data_into_list = data.split("\n")
my_file.close()


dataset = pd.read_csv("all_data_after_deduplication.csv")
dataset = dataset.fillna('')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

import pandas as pd

# Biểu diễn mỗi sách dưới dạng vector TF-IDF
tfidf_vectorizer = TfidfVectorizer(stop_words=data_into_list)
# tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['title'])
tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['title'] + ' ' + dataset['description'] + ' ' + dataset['province'])

# Tính toán sự tương đồng cosine giữa các sách
cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    index = random.randint(0, len(dataset) - 1)
    print(userText)
    index = dataset.index[dataset['title'] == userText].tolist()[0]
    # index = dataset.index[dataset['title'] == dataset['title'][index]].tolist()[0]

    similar_books = list(enumerate(cosine_similarities[index]))
    sorted_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
    # Lấy 3 sách có sự tương đồng cao nhất
    top_indices = [index for index, score in sorted_books[1:11]]
    rs = dataset.loc[top_indices].to_dict(orient='records')

    rs = json.dumps(rs, ensure_ascii=False)
    return rs


if __name__ == "__main__":
    app.run()