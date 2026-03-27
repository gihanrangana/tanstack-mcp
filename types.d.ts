import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

declare global {
	type ToolRegistrar = (mcp: McpServer) => void;
}
