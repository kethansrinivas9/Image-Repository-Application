FROM python:latest

COPY ./ ./application

EXPOSE 3000
CMD python -m http.server 3000
