# Use official python:3.10 as the base image
FROM python:3.10

# Create working directory for Docker image and container
WORKDIR /code

# Copy the requirements file only first (for caching)
COPY ./requirements.txt /code/requirements.txt

# Install dependencies in the `requirements.txt` file.
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the ./app directory inside the /code directory
COPY ./app /code/app

# Run the uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]