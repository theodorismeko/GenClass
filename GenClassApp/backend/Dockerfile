# Use official python:3.10 as the base image
FROM python:3.10

# Set the working directory
WORKDIR /backend

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app source code
COPY . .

# Expose port
EXPOSE 80

