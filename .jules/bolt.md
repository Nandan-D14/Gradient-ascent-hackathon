## 2026-01-24 - Testing FastAPI with Global Side Effects
**Learning:** When testing a FastAPI app that initializes external services (like Firebase) at the module level, use `patch.dict(sys.modules, ...)` to mock these dependencies before importing the app. This prevents the actual initialization code from running and requiring real credentials.
**Action:** Use `unittest.mock.patch.dict` context manager to wrap imports of the application module in unit tests.
