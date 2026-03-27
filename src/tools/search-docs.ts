import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { runCliJson } from "@/core/run-cli";

interface SearchResult {
	query: string;
	totalHits: number;
	results: Array<{
		title: string;
		url: string;
		snippet: string;
		library: string;
		breadcrumb: string[];
	}>;
}

const register: ToolRegistrar = (mcp: McpServer) => {
	mcp.registerTool(
		"search_tanstack_docs",
		{
			title: "Search TanStack Docs",
			description:
				"Search the official TanStack documentation. Returns titles, URLs, and snippets.",
			inputSchema: {
				query: z.string().describe("Search query, e.g. 'file-based routing'"),
				library: z
					.string()
					.optional()
					.describe("Filter to a specific library ID, e.g. 'router', 'query'"),
				framework: z
					.string()
					.optional()
					.describe("Filter to a specific framework, e.g. 'react', 'vue'"),
				limit: z
					.number()
					.int()
					.min(1)
					.max(50)
					.default(10)
					.describe("Max results (default 10, max 50)"),
			},
		},
		async ({ query, library, framework, limit }) => {
			try {
				const parts = [`search-docs "${query}"`];

				if (library) parts.push(`--library ${library}`);
				if (framework) parts.push(`--framework ${framework}`);

				parts.push(`--limit ${limit}`);

				const data = await runCliJson<SearchResult>(parts.join(" "));

				const text = data.results
					.map((r, i) => {
						return `${i + 1}. [${r.library}] ${r.title}\n     URL: ${r.url}\n ${r.snippet || r.breadcrumb.join(" > ")}`;
					})
					.join("\n\n");

				return {
					content: [
						{
							type: "text" as const,
							text: `Found ${data.totalHits} total hits (showing ${data.results.length}):\n\n${text}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);

				return {
					content: [{ type: "text" as const, text: `Search error: ${msg}` }],
					isError: true,
				};
			}
		},
	);
};

export default register;
