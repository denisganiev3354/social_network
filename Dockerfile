FROM python:alpine3.23

ENV POETRY_VERSION=2.4.1 \
    POETRY_VIRTUALENVS_CREATE=false \
    PYTHONPATH=/app

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-interaction --no-ansi --no-root --only main

CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8000", "--workers", "4"]