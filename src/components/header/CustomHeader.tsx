import { Container, Flex, Group, Header, Image, Text } from "@mantine/core"
import React, { use, useEffect } from "react"
import logo from "@assets/img/Logo.png"
import Link from "next/link"
import { useRouter } from "next/router"

const data = [
	{
		link: "/browse",
		label: "browse",
	},
	{
		link: "/categorie",
		label: "categorie",
	},
]

type Props = {}

const CustomHeader = (props: Props) => {
	const router = useRouter()
	const links = data.map((link) => (
		<a href={link.link} key={link.label} style={{ textDecoration: "none" }}>
			<Text
				weight={400}
				size={router.pathname === link.link ? "md" : "sm"}
				style={{ color: router.pathname === link.link ? "white" : "#e5e5e5" }}
			>
				{link.label}
			</Text>
		</a>
	))

	useEffect(() => {
		console.log(router.pathname)
	}, [router.pathname])

	return (
		<Header
			height={56}
			pos="fixed"
			pb={3}
			pt={4}
			bg="transparent"
			withBorder={false}
		>
			<Flex align="center" mb={10} mt={10} ml={50} mr={50}>
				<Link href="/browse">
					<Image
						src={logo.src}
						alt="logo de Gratflix"
						maw="100%"
						width="100px"
					/>
				</Link>
				<Group spacing={20} ml={20}>
					{links}
				</Group>
			</Flex>
		</Header>
	)
}

export default CustomHeader
