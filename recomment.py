import numpy as np
import pandas as pd
import nltk
nltk.download('stopwords')
import re
from sklearn.feature_extraction import text
from sklearn.metrics.pairwise import cosine_similarity
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
import string
stopword=set(stopwords.words('english'))


# đọc dữ liệu 
data = pd.read_csv("data.csv")
data = data[["Movie Name", "Description", "Genre"]]

def movie_recommendation(title,data=data):
    data = data.reset_index(drop=True)
    feature = data["Movie Name"].tolist()
    tfidf = text.TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(feature)
    indices = pd.Series(data.index, index=data['Movie Name']).drop_duplicates()
    similarity = cosine_similarity(tfidf_matrix)
    index = indices[title]
    similarity_scores = list(enumerate(similarity[index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    similarity_scores = similarity_scores[0:100]
    movieindices = [i[0] for i in similarity_scores]
    data = data.iloc[movieindices].reset_index(drop=True)

    feature = data["Genre"].tolist()
    tfidf = text.TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(feature)
    indices = pd.Series(data.index, index=data['Movie Name']).drop_duplicates()
    similarity = cosine_similarity(tfidf_matrix)
    index = indices[title]
    similarity_scores = list(enumerate(similarity[index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    movieindices = [i[0] for i in similarity_scores[0:10]]
    df = data.iloc[movieindices].reset_index(drop=True).rename(columns={'Movie Name': 'name', 'Description': 'description', 'Genre': 'genre'})
    json_data = df.to_json(orient='records')
    return json_data

def getpage(page):
    page = int(page)
    df = data[page*10:(page+1)*10].rename(columns={'Movie Name': 'name', 'Description': 'description', 'Genre': 'genre'})
    json_data = df.to_json(orient='records')
    return json_data
