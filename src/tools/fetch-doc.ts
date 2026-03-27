import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { version } from "os";
import path from "path";
import z from "zod";
import { runCliJson } from "@/core/run-cli";

interface DocsResult {
	title: string;
	content: string;
	url: string;
	library: string;
	version: string;
}

const register: ToolRegistrar = (mcp: McpServer) => {
	mcp.registerTool(
		"fetch_tanstack_doc",
		{
			title: "Fetch TanStack Doc",
			description:
				"Fetch the full Markdown content of a TanStack documentation page. Use search_tanstack_docs first to find the correct path.",
			inputSchema: {
				library: z
					.string()
					.describe("Library ID, e.g. 'router', 'query', 'table', 'form'"),
				path: z
					.string()
					.describe(
						"Doc path relative to docs root, e.g. 'guide/not-found-errors' or 'framework/react/quick-start'",
					),
				version: z
					.string()
					.default("latest")
					.describe("Docs version (default: 'latest')"),
			},
		},
		async ({ library, path, version }) => {
			try {
				const args = `doc ${library} "${path}" --docs-version ${version}`;
				const data = await runCliJson<DocsResult>(args);

				return {
					content: [
						{
							type: "text" as const,
							text: `# ${data.title}\nLibrary: ${data.library}(${data.version})\nURL: ${data.url}\n\n---\n\n${data.content}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				return {
					content: [{ type: "text" as const, text: `Fetch error: ${msg}` }],
					isError: true,
				};
			}
		},
	);
};

export default register;
