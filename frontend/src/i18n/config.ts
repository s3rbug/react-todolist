import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./en/index.json"
import ua from "./ua/index.json"
import { LOCALS } from "../redux/types/ui"
import store from "../redux/store"
import { uiActions } from "../redux/slices/ui"
import { isDevelopment } from "../utils/isDevelopment"

const resources = {
	[LOCALS.EN]: {
		translation: en,
	},
	[LOCALS.UA]: {
		translation: ua,
	},
}

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init(
		{
			debug: isDevelopment(),
			resources,
			fallbackLng: LOCALS.EN,
		},
		() => {
			store.dispatch(
				uiActions.setLanguage({ lang: i18next.language as LOCALS })
			)
		}
	)

if (i18next.services?.formatter) {
	i18next.services.formatter.add("lowercase", (value: string) => {
		return value?.toLowerCase()
	})
	i18next.services.formatter.add("uppercase", (value: string) => {
		return value?.toUpperCase()
	})
}

export default i18next
