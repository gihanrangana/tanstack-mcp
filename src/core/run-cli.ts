import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const runCli = async (args: string): Promise<string> => {
	const { stdout, stderr } = await execAsync(`npx -y @tanstack/cli ${args}`, {
		timeout: 60_000,
		maxBuffer: 10 * 1024 * 1024,
	});

	return stdout || stderr;
};

const runCliJson = async <T = unknown>(args: string): Promise<T> => {
	const raw = await runCli(`${args} --json`);
	return JSON.parse(raw) as T;
};

export { runCli, runCliJson };
