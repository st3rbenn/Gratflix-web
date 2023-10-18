import CustomHeader from "@/components/header/CustomHeader"
import Loader from "@/components/loader/Loader"
import { AspectRatio, Box, Button, Grid, Image } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { parsePlexResponse } from "../../xmlParser"

type Props = {}

const index = (props: Props) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	const handleClick = async () => {
		await parsePlexResponse()
	}

	return (
		<Box w="100%" pos="relative">
			{isLoading ? (
				<Grid
					columns={4}
					w="fit-content"
					style={{ gap: "20px" }}
					pos="absolute"
					top="136px"
					left="70px"
				>
					<Loader />
				</Grid>
			) : (
				<AspectRatio ratio={16 / 9} top={-45}>
					<img
						style={{ objectFit: "contain", width: "100%", height: "100%" }}
						src="https://kelleyfrank.files.wordpress.com/2021/06/the-conjuring-3-poster_orig.jpg"
					/>
				</AspectRatio>
			)}

			<Button onClick={handleClick}>Click me</Button>
		</Box>
	)
}

export default index
