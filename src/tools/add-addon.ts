import z from "zod";
import { runCli } from "@/core/run-cli";

const register: ToolRegistrar = (mcp) => {
	mcp.registerTool(
		"add_tanstack_addon",
		{
			title: "Add TanStack Add-on",
			description:
				"Add one or more add-ons to an existing TanStack Start project.",
			inputSchema: {
				addons: z
					.array(z.string())
					.min(1)
					.describe("Names of add-ons to install, e.g. ['tailwind', 'clerk']"),
				forced: z
					.boolean()
					.default(false)
					.describe("Force the add-on to be added (default: false)"),
			},
		},
		async ({ addons, forced }) => {
			try {
				const parts = [`add ${addons.join(" ")}`];
				if (forced) parts.push(`--force`);

				const output = await runCli(parts.join(""));

				return {
					content: [
						{
							type: "text" as const,
							text: `Add-on(s) added:\n\n${output}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				return {
					content: [{ type: "text" as const, text: `Add-on error: ${msg}` }],
					isError: true,
				};
			}
		},
	);
};

export default register;
