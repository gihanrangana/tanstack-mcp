import z from "zod";
import { runCli, runCliJson } from "@/core/run-cli";

interface LibrariesResult {
	group: string;
	count: number;
	libraries: Array<{
		id: string;
		name: string;
		tagline: string;
		frameworks: string[];
		latestVersion: string;
		docsUrl?: string;
		githubUrl?: string;
	}>;
}

const register: ToolRegistrar = (mcp) => {
	mcp.registerTool(
		"list_tanstack_libraries",
		{
			title: "List TanStack Libraries",
			description:
				"List all official TanStack libraries with version info, supported frameworks, and docs URLs.",
			inputSchema: {
				group: z
					.enum(["state", "headlessUI", "performance", "tooling"])
					.optional()
					.describe("Filter by group"),
			},
		},
		async ({ group }) => {
			try {
				const args = group ? `libraries --group ${group}` : "libraries";
				const data = await runCliJson<LibrariesResult>(args);

				const text = data.libraries
					.map((lib) => {
						return `• ${lib.id} (${lib.latestVersion}) — ${lib.tagline}\n  Frameworks: ${lib.frameworks.join(", ") || "n/a"}\n  Docs: ${lib.docsUrl || `https://tanstack.com/${lib.id}/latest`}`;
					})
					.join("\n\n");

				return {
					content: [
						{
							type: "text" as const,
							text: `${data.group} - ${data.count} libraries:\n\n${text}`,
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
