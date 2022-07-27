@echo off
pip install flask
pip install rake_nltk
pip install pysqlite3
pip install -U flask-cors
python -c "import nltk;nltk.download('stopwords')"
call npm install --force
