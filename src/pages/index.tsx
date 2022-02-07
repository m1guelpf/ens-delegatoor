import useWeb3 from '@/hooks/useWeb3'
import MetaTags from '@/components/MetaTags'
import { ZERO_ADDRESS } from '@/lib/constants'
import { formatAddressShort } from '@/lib/utils'
import TweetEmbed from '@/components/TweetEmbed'
import useENSBalance from '@/hooks/useENSBalance'
import useENSDelegate from '@/hooks/useENSDelegate'
import ConnectWallet from '@/components/ConnectWallet'
import MetaDelegateForm from '@/components/MetaDelegateForm'

const Home = () => {
	const ensBalance = useENSBalance()
	const delegatedTo = useENSDelegate()
	const { userAddress, userENS } = useWeb3()

	return (
		<>
			<MetaTags />
			<div className="p-4 md:py-10 md:px-0 flex flex-col items-center justify-center min-h-screen space-y-10 max-w-2xl mx-auto">
				<ConnectWallet />
				<p className="text-black text-2xl md:text-4xl leading-relaxed font-medium md:text-center">
					Hi{' '}
					{userENS || formatAddressShort(userAddress) || <span className="text-gray-600">{'{ensName}'}</span>}
					! You currently hold {ensBalance ?? <span className="text-gray-600">{'{balanceOf}'}</span>} $ENS
					tokens, which have{' '}
					{delegatedTo?.address == ZERO_ADDRESS ? (
						'not been delegated'
					) : (
						<>
							been delegated to{' '}
							{delegatedTo?.ensName || formatAddressShort(delegatedTo?.address) || (
								<span className="text-gray-600">{'{delegate}'}</span>
							)}
						</>
					)}
					.
				</p>
				<p className="text-black text-2xl md:text-4xl leading-relaxed font-medium md:text-center">
					Thinking about changing your delegation? You can do it through{' '}
					<a
						className="text-blue-400 underline"
						href="https://claim.ens.domains/delegate-ranking"
						target="_blank"
						rel="noreferrer"
					>
						the ENS website
					</a>
					, or using the form below. Here&apos;s who the community recommends:{' '}
				</p>
				<TweetEmbed tweetId={'1490177252142759943'}>
					<a
						href="https://twitter.com/m1guelpf/status/1490177252142759943?s=20"
						target="_blank"
						rel="noreferrer"
						className="font-regular text-base text-blue-400 underline block"
					>
						What are some @ensdomains delegates we should be recommending to those looking to re-delegate
						their $ENS? - @m1guelpf (via Twitter)
					</a>
				</TweetEmbed>
				<div className="space-y-6 mx-auto">
					<p className="text-black text-xl md:text-3xl leading-relaxed font-medium md:text-center">
						If you want to delegate to an address, but don&apos;t want to pay for the gas, you can use the
						form below to delegate via meta-transactions.
					</p>
					<MetaDelegateForm />
				</div>
			</div>
		</>
	)
}

export default Home
