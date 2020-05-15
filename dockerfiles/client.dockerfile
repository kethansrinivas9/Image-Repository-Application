FROM python:latest

COPY ./ ./

EXPOSE 3000
CMD python -m http.server 3000
