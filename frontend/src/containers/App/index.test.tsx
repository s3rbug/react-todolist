import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { App } from "."

describe("App", () => {
	test("renders properly", () => {
		render(<App />)
	})
})
