import React, { useEffect } from "react"
import { useRouter } from "next/router"

type Props = {}

const Index = (props: Props) => {
	const router = useRouter()

	useEffect(() => {
		router.push("/browse")
	}, [])

	return <div></div>
}

export default Index
