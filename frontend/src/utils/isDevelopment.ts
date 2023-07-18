export function isDevelopment(): boolean {
	return !import.meta.env.MODE || import.meta.env.MODE === "development"
}
