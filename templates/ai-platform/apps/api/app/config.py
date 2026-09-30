from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=(".env", "../../.env"), extra="ignore")

    app_env: str = "development"
    app_name: str = "__PROJECT_TITLE__"
    database_url: str
    redis_url: str = "redis://127.0.0.1:56379/0"
    cors_origins: list[str] = Field(default_factory=lambda: ["http://127.0.0.1:3000"])


@lru_cache
def get_settings() -> Settings:
    return Settings()
