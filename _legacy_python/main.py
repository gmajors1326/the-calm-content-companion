from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from db import init_db
from routers import auth as auth_routes
from routers import content as content_routes

app = FastAPI(title="Calm Content Backend")


@app.on_event("startup")
def startup_event():
    init_db()



def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Calm Content Backend",
        version="1.0.0",
        description="Backend for Calm Content with users, content, auth. Includes migrations, RBAC, and environment-based config.",
        routes=app.routes,
    )
    # Security scheme for JWT Bearer tokens
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    # Apply the security requirement globally for endpoints that declare security dependencies
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
