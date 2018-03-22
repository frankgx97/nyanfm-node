FROM python:2.7-alpine3.7

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN pip install -r requirements.txt

EXPOSE 5000

CMD export FLASK_APP=app.py && \
    flask run --host=0.0.0.0