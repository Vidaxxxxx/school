# install a lightweight and compatible python image
FROM python:3.8-slim

# my contact and add some meta-data for an unique image
LABEL maintainer="david.laun@epitech.eu"

# Create a folder app in the root container
WORKDIR /app

# Copy all the files in the /app directory from the container
COPY . /app

# run the command to install all dependancies in requirement.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 80 available
EXPOSE 80

# Run the app
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
