import z from "zod";
import { runCliJson } from "@/core/run-cli";

const register: ToolRegistrar = (mcp) => {
	mcp.registerTool(
		"create_tanstack_project",
		{
			title: "Create TanStack Project",
			description:
				"Create a new TanStack Start application with optional add-ons.",
			inputSchema: {
				projectName: z.string().describe("Name of the project to create"),
				targetDir: z
					.string()
					.optional()
					.describe("Target directory for the application root"),
				addOnConfig: z
					.string()
					.optional()
					.describe("JSON string with add-on configuration options"),
				git: z
					.boolean()
					.default(true)
					.describe("Whether to initialize a git repository (default: true)"),
				force: z
					.boolean()
					.default(false)
					.describe("Force creation even if target directory is not empty"),
			},
		},
		async ({ projectName, targetDir, addOnConfig, git, force }) => {
			try {
				const parts = [`create "${projectName}"`];

				if (targetDir) parts.push(`--target-dir "${targetDir}"`);
				if (addOnConfig) parts.push(`--add-on-config "${addOnConfig}"`);
				if (!git) parts.push(`--no-git`);
				if (force) parts.push(`--force`);

				const data = await runCliJson<unknown>(parts.join(" "));

				return {
					content: [
						{
							type: "text" as const,
							text: `Project created successfully:\n\n${JSON.stringify(data, null, 2)}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				return {
					content: [{ type: "text" as const, text: `Create error: ${msg}` }],
					isError: true,
				};
			}
		},
	);
};

export default register;
