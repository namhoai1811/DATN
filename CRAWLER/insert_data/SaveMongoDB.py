from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
uri = "mongodb+srv://mathoanghon18112000:hoainam12@cluster0.mvwile5.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    db = client['test']
    file_path = 'all_data_.csv'
    # file_path = '../data-standard/ibds.csv'
    data = pd.read_csv(file_path,  encoding = 'utf-8')
    print("1111")
    data_dict = data.to_dict(orient='records')
    # Chọn hoặc tạo một collection trong MongoDB
    collection = db['postsss']
    # Insert dữ liệu vào MongoDB
    collection.insert_many(data_dict)
    print("Dữ liệu đã được import vào MongoDB.")
except Exception as e:
    print(e)