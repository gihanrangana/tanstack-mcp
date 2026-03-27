import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as tools from "@/tools";
import packageJson from "../../package.json";

// ─── Server ───────────────────────────────────────────────────────────────────
export class Server {
	private mcp: McpServer;

	constructor() {
		this.mcp = new McpServer({
			name: packageJson.name,
			version: packageJson.version,
		});

		this.registerTools();
	}

	private registerTools() {
		for (const register of Object.values(tools)) {
			register(this.mcp);
		}
	}

	async start() {
		const transport = new StdioServerTransport();
		await this.mcp.connect(transport);
		console.error(
			`${packageJson.name} v${packageJson.version} server started on stdio`,
		);
	}
}

export interface IServer extends Server {}

const server = new Server();
export default server;
