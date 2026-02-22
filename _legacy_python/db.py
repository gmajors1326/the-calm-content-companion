import sqlite3
from pathlib import Path
import os
import datetime as _dt

DB_PATH = Path(os.environ.get("CALM_DEV_DB", "dev.db")).as_posix()


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def run_migrations():
    # Lightweight SQLite migrations using SQL file in migrations/001_init.sql
    mig_path = Path(__file__).parent / "migrations" / "001_init.sql"
    if mig_path.exists():
        conn = get_connection()
        try:
            with conn:
                conn.executescript(mig_path.read_text())
        finally:
            conn.close()


def init_db():
    run_migrations()
    # Ensure tables exist (idempotent)
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          hashed_password TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          role TEXT DEFAULT 'user'
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS contents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          title TEXT NOT NULL,
          body TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """
    )
    conn.commit()
    conn.close()


def get_user_by_email(email: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()
    return row


def create_user(email: str, hashed_password: str, role: str = "user"):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (email, hashed_password, role) VALUES (?, ?, ?)", (email, hashed_password, role))
        conn.commit()
    except sqlite3.IntegrityError:
        # Return existing user if already present
        existing = get_user_by_email(email)
        conn.close()
        return existing
    user_id = cur.lastrowid
    cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()
    conn.close()
    return user


def get_user_by_id(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()
    conn.close()
    return user


def update_user(user_id: int, email: str = None, hashed_password: str = None, role: str = None):
    conn = get_connection()
    cur = conn.cursor()
    fields = []
    params = []
    if email is not None:
        fields.append("email = ?")
        params.append(email)
    if hashed_password is not None:
        fields.append("hashed_password = ?")
        params.append(hashed_password)
    if role is not None:
        fields.append("role = ?")
        params.append(role)
    if not fields:
        conn.close()
        return None
    sql = f"UPDATE users SET {', '.join(fields)} WHERE id = ?"
    params.append(user_id)
    cur.execute(sql, tuple(params))
    conn.commit()
    cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()
    conn.close()
    return user


def delete_user(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()


def create_content(user_id: int, title: str, body: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contents (user_id, title, body) VALUES (?, ?, ?)",
        (user_id, title, body),
    )
    conn.commit()
    content_id = cur.lastrowid
    cur.execute("SELECT * FROM contents WHERE id = ?", (content_id,))
    content = cur.fetchone()
    conn.close()
    return content


def get_contents_by_user(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, body, created_at FROM contents WHERE user_id = ?", (user_id,))
    rows = cur.fetchall()
    conn.close()
    return rows


def get_content_by_id(content_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM contents WHERE id = ?", (content_id,))
    row = cur.fetchone()
    conn.close()
    return row


def update_content(content_id: int, title: str = None, body: str = None):
    conn = get_connection()
    cur = conn.cursor()
    fields = []
    params = []
    if title is not None:
        fields.append("title = ?"); params.append(title)
    if body is not None:
        fields.append("body = ?"); params.append(body)
    if not fields:
        conn.close()
        return None
    sql = f"UPDATE contents SET {', '.join(fields)} WHERE id = ?"
    params.append(content_id)
    cur.execute(sql, tuple(params))
    conn.commit()
    cur.execute("SELECT * FROM contents WHERE id = ?", (content_id,))
    content = cur.fetchone()
    conn.close()
    return content


def delete_content(content_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM contents WHERE id = ?", (content_id,))
    conn.commit()
    conn.close()


def get_all_contents():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT contents.id, contents.title, contents.body, contents.created_at, contents.user_id, users.email AS owner_email FROM contents LEFT JOIN users ON contents.user_id = users.id")
    rows = cur.fetchall()
    conn.close()
    return rows
