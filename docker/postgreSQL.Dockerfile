
# Use the official PostgreSQL image as a base
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=datalake
ENV POSTGRES_USER=user_1
ENV POSTGRES_PASSWORD=pass_1

# Copy initialization scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
