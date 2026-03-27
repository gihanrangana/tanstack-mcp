import { runCli } from "@/core/run-cli";

const register: ToolRegistrar = (mcp) => {
	mcp.registerTool(
		"pin_tanstack_versions",
		{
			title: "Pin TanStack Versions",
			description:
				"Pin versions of all TanStack libraries in the current project's package.json.",
		},
		async () => {
			try {
				const output = await runCli("pin-versions");

				return {
					content: [
						{
							type: "text" as const,
							text: `Versions pinned:\n\n${output}`,
						},
					],
				};
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				return {
					content: [
						{ type: "text" as const, text: `Pin versions error: ${msg}` },
					],
					isError: true,
				};
			}
		},
	);
};

export default register;
