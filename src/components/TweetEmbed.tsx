import { script } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

declare global {
	interface Window {
		twttr: any
	}
}

const TweetEmbed = ({ tweetId, children }): any => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isComponentMounted = true

		script('https://platform.twitter.com/widgets.js', () => {
			if (!window.twttr) return

			if (!isComponentMounted) return

			window.twttr.widgets.createTweet(tweetId, ref?.current, {}).then(() => setLoading(false))
		})

		return () => {
			isComponentMounted = false
		}
	}, [])

	return (
		<>
			{loading && children}
			<div className="flex justify-center w-full" ref={ref} />
		</>
	)
}

export default TweetEmbed
