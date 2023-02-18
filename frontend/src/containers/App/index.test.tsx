import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { App } from "."

describe("App", () => {
	test("renders properly", () => {
		render(<App />)
		const appWrapper = screen.getByTestId("app-wrapper")
		expect(appWrapper).toBeInTheDocument()
	})
})
