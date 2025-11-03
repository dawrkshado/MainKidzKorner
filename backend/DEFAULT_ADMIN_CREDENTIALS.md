# Default Admin User Credentials

A default admin user is automatically created when you run migrations. This ensures you can always log in even after deleting the database.

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@kidzkorner.com`
- **Role:** Admin


**Change the password immediately after first login!** The default password is not secure and should only be used for initial setup.

## How It Works
This means even if you delete `db.sqlite3`, running migrations will recreate the admin user automatically.


