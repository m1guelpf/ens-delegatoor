import Head from 'next/head'
import coverImage from '@images/card.jpg'

const MetaTags = () => {
	const meta = {
		title: 'Who is voting with my $ENS?',
		description: `Delegates have control over what happens to the ENS DAO. Here's who you're currently delegating your $ENS to.`,
		image: `https://ens-delegatoor.vercel.app${coverImage.src}`,
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<meta name="description" content={meta.description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://ens-delegatoor.vercel.app/" />
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://ens-delegatoor.vercel.app/" />
			<meta property="twitter:title" content={meta.title} />
			<meta property="twitter:description" content={meta.description} />
			<meta property="twitter:image" content={meta.image} />
		</Head>
	)
}

export default MetaTags
