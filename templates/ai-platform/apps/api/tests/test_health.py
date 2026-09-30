import pytest
from httpx import ASGITransport, AsyncClient

from app.database import get_db
from app.main import app


class FakeSession:
    async def execute(self, _statement: object) -> None:
        return None


async def fake_db():
    yield FakeSession()


@pytest.mark.asyncio
async def test_health() -> None:
    app.dependency_overrides[get_db] = fake_db
    try:
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "database": "ok"}
    finally:
        app.dependency_overrides.clear()
