# TanStack MCP Server

🚀 **The ultimate bridge between AI coding agents and the TanStack ecosystem.**

An official-grade [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that brings the full power of the **TanStack CLI** directly into your AI assistant. It enables your AI to search official documentation, discover libraries, fetch guides, and scaffold new projects—all without leaving the chat.

---

## 🌟 Key Features

- **Keyless Doc Search**: Search the official TanStack documentation (Algolia backend) without needing any API keys.
- **Full-Text Guides**: Fetch real-time Markdown content for any page in the ecosystem.
- **Project Scaffolding**: Create new TanStack Start applications with AI-assisted commands.
- **Ecosystem Discovery**: List 16+ libraries, ecosystem partners (hosting, auth, DB), and version info.
- **CLI Power**: Direct access to scaffolding, add-ons, and version pinning tools.

---

## 🛠️ Tools Reference

| Tool | Purpose |
| :--- | :--- |
| `search_tanstack_docs` | Search the official TanStack documentation with query, library, and framework filters. |
| `fetch_tanstack_doc` | Retrieve the full Markdown content of a doc page (e.g., `router`, `guide/file-based-routing`). |
| `list_tanstack_libraries` | Discover all official TanStack libraries (Query, Router, Table, Form, etc.). |
| `list_tanstack_ecosystem` | Find partners for hosting, auth, databases, and more. |
| `create_tanstack_project` | Bootstrap a new TanStack Start project with custom add-on configs. |
| `add_tanstack_addon` | Install add-ons (Tailwind, Clerk, etc.) into an existing project. |
| `pin_tanstack_versions` | Pin all TanStack library versions in your `package.json` for stability. |

---

## 💻 Configuration

You can run the server using **npx** or **Docker**.

### Method 1: NPX (Recommended)
Add this to your MCP settings file:

```json
{
  "mcpServers": {
    "tanstack": {
      "command": "npx",
      "args": ["-y", "tanstack-mcp"]
    }
  }
}
```

### Method 2: Docker
Requirements: **Docker Desktop** must be running.

```json
{
  "mcpServers": {
    "tanstack": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "gihan92/tanstack-mcp:latest"
      ]
    }
  }
}
```


---

## 🚀 Local Development

To contribute or test the server locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tanstack-mcp.git
   cd tanstack-mcp
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run in development mode**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

---

## 📝 Credits & License
This server is a wrapper around the official `@tanstack/cli`. All documentation and library data are property of **TanStack**.

**Author:** gihan92
