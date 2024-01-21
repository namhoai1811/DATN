from flask import Flask, render_template, request
from flask_cors import CORS
import pandas as pd

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
dataset.info()

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Chuẩn bị dữ liệu
# Xây dựng DataFrame từ dữ liệu sách
import pandas as pd

# Biểu diễn mỗi sách dưới dạng vector TF-IDF
tfidf_vectorizer = TfidfVectorizer(stop_words=data_into_list)
tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['title'])

# Tính toán sự tương đồng cosine giữa các sách
cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

# Đề xuất sách cho một sách cụ thể (ví dụ: Book 1)
import random
index = random.randint(0 , len(dataset) - 1)
print(dataset['title'][index])
similar_books = list(enumerate(cosine[index]))
sorted_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
# Lấy 3 sách có sự tương đồng cao nhất
recommendations = sorted_books[1:4]
# Hiển thị kết quả

@app.route("/get")
def get_bot_response():
    rs = []
    # userText = request.args.get('msg')
    for idx, similarity in recommendations:
        recommended_book = dataset['title'][idx]
        rs.append(f"Recommended: {recommended_book} (Similarity: {similarity:.3f})")
    return rs


if __name__ == "__main__":
    app.run()