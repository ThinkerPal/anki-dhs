import csv
import requests
import sqlite3
import nltk
import os

def check_update():
    try:
        nltk.data.find("corpora/stopwords")
    except:
        nltk.download("stopwords")

    QUESTIONS_URL = "https://docs.google.com/spreadsheets/d/1ZKAM4522rK_0evwH4UYnySMh1ZJ6YoA15gyN_D6HziQ/export?format=csv&gid=0"
    response = requests.get(QUESTIONS_URL)

    try:
        response.raise_for_status()
    except:
        print("An error occurred. Are you offline?")
    else:
        questions_file = open("questions.csv", "wb")
        questions_file.write(response.content)
        questions_file.close()

    ls =[]
    with open('questions.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            ls.append(row)

    indb = []
    if "db" in os.listdir():
        # print(os.listdir())
        # print("done app")
        # print(os.getcwd())
        # input()
        connection = sqlite3.connect("db/backend.db") 
    elif "backend.db" not in os.listdir():
        print(os.listdir())
        connection = sqlite3.connect("../db/backend.db")
    else:
        print(os.listdir())
        connection = sqlite3.connect("backend.db")

    a = connection.execute("SELECT QUESTION FROM CARDS")
    indb = [i[0] for i in a]

    changed = 0
    for i in range(1,len(ls)):
        if ls[i][1] not in indb:
            connection.execute("INSERT INTO CARDS(CARDID,DECKID,QUESTION,ANSWER,FAMILIARITY,TIME,TOPIC) VALUES(?,?,?,?,?,?,?)", (i,1,ls[i][1],ls[i][5],0,ls[i][4],ls[i][2]))
            changed += 1

    connection.commit()
    connection.close()
    print(f"Number of changed records: {changed}")

if __name__ == "__main__":
    check_update()