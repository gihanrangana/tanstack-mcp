import z from "zod";
import { runCliJson } from "@/core/run-cli";

interface EcosystemResult {
	query: Record<string, string>;
	count: number;
	partners: Array<{
		id: string;
		name: string;
		tagline: string;
		category: string;
		categoryLabel: string;
		url: string;
		libraries: string[];
	}>;
}

const register: ToolRegistrar = (mcp) => {
	mcp.registerTool(
		"list_tanstack_ecosystem",
		{
			title: "List TanStack Ecosystem",
			description:
				"List TanStack ecosystem partners — hosting, auth, databases, learning resources, etc.",
			inputSchema: {
				category: z
					.string()
					.optional()
					.describe("Filter by category, e.g. 'hosting', 'auth', 'learning'"),
				library: z
					.string()
					.optional()
					.describe("Filter by TanStack library ID, e.g. 'router'"),
			},
		},
		async ({ category, library }) => {
			try {
				const parts = ["ecosystem"];
				if (category) parts.push("--category", category);
				if (library) parts.push("--library", library);

				const data = await runCliJson<EcosystemResult>(parts.join(" "));

				const text = data.partners
					.map((p) => {
						return `• ${p.name} — ${p.tagline}\n  Category: ${p.categoryLabel}\n  URL: ${p.url}${p.libraries.length ? `\n  Libraries: ${p.libraries.join(", ")}` : ""}`;
					})
					.join("\n\n");

				return {
					content: [
						{
							type: "text" as const,
							text: `${data.count} ecosystem partners:\n\n${text}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				return {
					content: [{ type: "text" as const, text: `Error: ${msg}` }],
					isError: true,
				};
			}
		},
	);
};

export default register;
