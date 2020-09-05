import { instance } from "./api";

export const uiApi = {
	async getUiApi() {
		return instance.get("ui").then((response) => response.data);
	},
	async setIsLight(isLight: boolean) {
		return instance.put("ui", { isLight });
	},
};
