import os
from datetime import timedelta

# Secret key for JWT signing (change this in production!)
SECRET_KEY = os.environ.get("CALM_SECRET_KEY", "CHANGE_ME_SECRET_KEY")
ALGORITHM = os.environ.get("CALM_ALGORITHM", "HS256")
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("CALM_TOKEN_EXPIRE_MINUTES", "30"))
except ValueError:
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
