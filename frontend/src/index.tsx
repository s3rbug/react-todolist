import { createRoot } from "react-dom/client"
import { App } from "./containers"
import "./index.css"
import { Provider } from "react-redux"
import store from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import "./i18n/config"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
