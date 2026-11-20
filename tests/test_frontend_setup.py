import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FRONTEND = ROOT / "frontend"

SCAFFOLD_FILES = [
    "package.json",
    "vite.config.js",
    "index.html",
    "src/main.jsx",
    "src/App.jsx",
    "src/App.test.jsx",
    "src/pages/Home.jsx",
    "src/pages/About.jsx",
    "src/pages/Home.test.jsx",
    "src/pages/About.test.jsx",
    "src/setupTests.js",
]


def _read(rel):
    path = FRONTEND / rel
    assert path.is_file(), f"missing {path}"
    return path.read_text(encoding="utf-8")


def _package():
    return json.loads(_read("package.json"))


def _h1_text(source):
    match = re.search(r"<h1[^>]*>(.*?)</h1>", source, re.S)
    assert match, "no <h1> heading found"
    return match.group(1).strip()


def test_package_json_has_react_deps_and_scripts():
    pkg = _package()
    for dep in ("react", "react-dom", "react-router-dom"):
        assert dep in pkg.get("dependencies", {}), dep
    for script in ("dev", "build", "test"):
        assert pkg.get("scripts", {}).get(script), script


def test_testing_dev_dependencies_and_jsdom_config():
    dev = _package().get("devDependencies", {})
    for dep in (
        "vitest",
        "jsdom",
        "@testing-library/react",
        "@testing-library/jest-dom",
        "@testing-library/user-event",
    ):
        assert dep in dev, dep
    config = _read("vite.config.js")
    assert "jsdom" in config
    assert "setupFiles" in config
    assert "@testing-library/jest-dom" in _read("src/setupTests.js")


def test_page_components_exist():
    home = _h1_text(_read("src/pages/Home.jsx"))
    about = _h1_text(_read("src/pages/About.jsx"))
    assert home and about
    assert home != about


def test_app_defines_routes_and_entrypoint():
    app = _read("src/App.jsx")
    assert "Routes" in app
    assert re.search(r"path=[\"']/[\"']", app)
    assert re.search(r"path=[\"']/about[\"']", app)
    assert re.search(r"<(Nav)?Link\b[^>]*to=[\"']/[\"']", app)
    assert re.search(r"<(Nav)?Link\b[^>]*to=[\"']/about[\"']", app)
    assert "BrowserRouter" in _read("src/main.jsx")
    assert "src/main.jsx" in _read("index.html")


def test_js_unit_tests_exist():
    for rel in ("src/App.test.jsx", "src/pages/Home.test.jsx", "src/pages/About.test.jsx"):
        source = _read(rel)
        assert "MemoryRouter" in source, rel
        assert "@testing-library/react" in source, rel
        assert "render" in source, rel


def test_frontend_scaffold_files_present():
    missing = [f for f in SCAFFOLD_FILES if not (FRONTEND / f).is_file()]
    assert not missing, missing


def test_gitignore_and_readme_document_frontend():
    gitignore = (ROOT / ".gitignore").read_text(encoding="utf-8").splitlines()
    entries = [line.strip().strip("/") for line in gitignore]
    assert any(e.endswith("node_modules") for e in entries)
    assert any(e.endswith("dist") for e in entries)
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert "frontend" in readme
    assert "npm install" in readme
    assert "npm test" in readme
