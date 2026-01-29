from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import List
import jwt

from db import get_contents_by_user, create_content, get_user_by_id
from config import SECRET_KEY, ALGORITHM
from datetime import datetime, timezone

from pydantic import BaseModel

router = APIRouter(prefix="/contents", tags=["contents"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class ContentCreate(BaseModel):
    title: str
    body: str = ""


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication")
        from db import get_user_by_id
        user = get_user_by_id(int(user_id))
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication")
        return user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication")


@router.get("/")
def list_contents(current_user: dict = Depends(get_current_user)):
    user_id = current_user[0]
    contents = get_contents_by_user(user_id)
    # Map to simple dicts for response
    return [dict(id=r[0], title=r[1], body=r[2], created_at=r[3]) for r in contents]


@router.post("/")
def create_content_endpoint(content: ContentCreate, current_user: dict = Depends(get_current_user)):
    user_id = current_user[0]
    content_row = create_content(int(user_id), content.title, content.body)
    return dict(id=content_row[0], title=content_row[1], body=content_row[2], created_at=content_row[3])
