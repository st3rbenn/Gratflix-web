import { XMLParser } from "fast-xml-parser"
import axios from "axios"

const xmlParser = new XMLParser({
	attributeNamePrefix: "",
	ignoreAttributes: false,
	parseAttributeValue: true,
	trimValues: true,
	stopNodes: ["parse-me-as-string"],
})

type PlexCommonArray = Array<{
	tag: string
}>

type PlexMediaContainerVideoMediaPart = {
	Part: {
		id: number
		key: string
		duration: number
		file: string
		size: number
		container: string
		videoProfile: string
	}
	id: number
	duration: number
	bitrate: number
	videoProfile: string
}

type PlexMediaContainerVideo = {
	Media: PlexMediaContainerVideoMediaPart
	Genre: PlexCommonArray
	Director: PlexCommonArray
	Writer: PlexCommonArray
	Country: object
	Collection: object
	Role: PlexCommonArray
	ratingKey: number
	key: string
	guid: string
	studio: string
	type: string
	title: string
	contentRating: string
	summary: string
	rating: number
	audienceRating: number
	skipCount: number
	year: number
	tagline: string
	thumb: string
	art: string
	duration: number
	originallyAvailableAt: string
	addedAt: number
	updatedAt: number
	audienceRatingImage: string
	chapterSource: string
	ratingImage: string
}

type PlexMediaContainer = {
	Video: Array<PlexMediaContainerVideo>
	size: number
	allowSync: number
	art: string
	identifier: string
	librarySectionID: number
	librarySectionTitle: string
	librarySectionUUID: string
	mediaTagPrefix: string
	mediaTagVersion: number
	sortAsc: number
	thumb: string
	title1: string
	title2: string
	viewGroup: string
	viewMode: number
}

type PlexResponse = {
	"?xml": { version: number; encoding: string }
	MediaContainer: PlexMediaContainer
}

const toFullnameObject = (fullname: string) => ({ fullname });

type FilmMeta = {
  fullname: string
}

const CHUNK_SIZE = 20

// const progressBar = (current: number, total: number) => {
// 	const length = 50 // Longueur de la barre de progression
// 	const position = Math.ceil((current / total) * length)
// 	const bar = Array(length)
// 		.fill("-")
// 		.map((c, i) => (i < position ? "=" : c))
// 		.join("")
// 	process.stdout.clearLine(0)
// 	process.stdout.cursorTo(0)
// 	process.stdout.write(`[${bar}] ${((current / total) * 100).toFixed(2)}%`)
// }

// const sendDataToDatabase = async (actor: Actor) => {
// 	console.log("actor", actor)
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxMjY4MDUwLCJleHAiOjE2OTM4NjAwNTB9.EFtKLxZcqgzDFAn6Lesg8KRPJ0aI_rvEDT7S3awIZLw`,
// 			"content-type": "application/json",
// 		},
// 	}

// 	try {
// 		await fetch(
// 			"http://localhost:1337/content-manager/collection-types/api::actor.actor",
// 			{
// 				method: "POST",
// 				...config,
// 			}
// 		)

// 		console.log(actor.fullname, "added to database ✅")
// 	} catch (e) {
// 		console.log("ERROOOOOOOOOOOOR 🛑", e)
// 	}
// }

export const parsePlexResponse = async (xml?: string) => {
	console.log("START PARSING")
	try {
		let res = await fetch(
			"https://plex.tenta-zone.fr/library/sections/3/all?X-Plex-Client-Identifier=469w2zc6l54h91elzqnc38be&X-Plex-Token=vLHzuw2hXUXxdh9KKAPu&X-Plex-Language=en"
		)

		const xmlResult: PlexResponse = await xmlParser.parse(await res.text())
		let actorNames: string[] = []
		let actors: Actor[] = Array.from(actorNames).map((fullname) => ({
			fullname,
		}))
		// console.log("RESPONNNNNNSE", xmlResult)
		for (const video of xmlResult?.MediaContainer?.Video) {
			console.log(`VIDEO${video}`)
			// for (const actor of video.Role) {
			// }
		}

		console.log("START --------------------------", actors)

		//i want to wait 2 seconds between each request
		// for (let i = 0; i < actors.length; i++) {
		// 	await sendDataToDatabase(actors[i])
		// 	await new Promise((resolve) => setTimeout(resolve, 1000))
		// 	progressBar(i, actors.length)
		// }

		console.log("DONE")
	} catch (e) {
		console.log(e)
	}
}

// console.log(res.MediaContainer.Video)

//ALL REQUEST STRAPI

//PUT REQUEST
//ACTOR LIKE
// http://localhost:1337/content-manager/collection-types/api::actor.actor/${id}

//POST REQUEST
//ACTOR CREATE
// http://localhost:1337/content-manager/collection-types/api::actor.actor
