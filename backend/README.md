# DC Bus System Backend (Django)

This is the newly configured Django backend for the DC Bus System.

## Project Structure

- `dcbus_backend/`: Main project configuration folder (settings, main urls).
- `api/`: The main application folder dealing with the system logic.
  - `models.py`: Database models mapping to our SQL tables (Buses and Audit Logs).
  - `serializers.py`: Defines how models are converted to/from JSON.
  - `views.py`: Defines Django REST framework ViewSets for complete CRUD endpoints.
  - `urls.py`: Defines the routing endpoints for the API app.
- `db.sqlite3`: The local development SQLite database.
- `requirements.txt`: Python dependencies required for this project.

## Setup Instructions

1. **Install Python environment (if not already done)**
   Make sure you have Python 3.8+ installed.

2. **Install dependencies**
   Open your terminal in the `backend/` directory and run:
   ```bash
   pip install -r requirements.txt
   ```

3. **Database Setup**
   The initial migrations have already been run, so the database `db.sqlite3` is ready. 
   *(In the future, when making changes to `models.py`, run `python manage.py makemigrations` and `python manage.py migrate`)*

4. **Run the server**
   Execute the following command to start the Django development server:
   ```bash
   python manage.py runserver
   ```

## Endpoints Summary

The endpoints are automatically managed by Django REST Framework's DefaultRouter:

- **Buses:** 
  - `GET /api/buses/`
  - `POST /api/buses/`
  - `GET /api/buses/{id}/`
  - `PUT /api/buses/{id}/`
  - `DELETE /api/buses/{id}/`

- **Logs:** 
  - `GET /api/logs/`
  - `POST /api/logs/`
  - `GET /api/logs/{id}/`
  - `PUT /api/logs/{id}/`
  - `DELETE /api/logs/{id}/`

The application utilizes `django-cors-headers` so it's ready to accept cross-origin requests from your frontend HTML pages!
