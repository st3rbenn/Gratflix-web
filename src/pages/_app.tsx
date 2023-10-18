import { AppProps } from "next/app"
import Head from "next/head"
import { Flex, MantineProvider } from "@mantine/core"
import { Lexend } from "@next/font/google"
import { useEffect, useState } from "react"
import { theme } from "@/config/theme.config"
import CustomHeader from "@/components/header/CustomHeader"

const lexend = Lexend({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal"],
})

export default function App(props: AppProps) {
	const { Component, pageProps } = props
	const [showChild, setShowChild] = useState(false)

	useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}
	if (typeof window === "undefined") {
		return <></>
	} else {
		return (
			<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
				<Head>
					<title>Page title</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, height=device-height"
					/>
				</Head>
				<Flex
					is="main"
					style={{
						...lexend.style,
						display: "flex",
						flexDirection: "row",
						minHeight: "100vh",
						overflow: "hidden",
					}}
				>
					<CustomHeader />
					<Component {...pageProps} />
				</Flex>
			</MantineProvider>
		)
	}
}
