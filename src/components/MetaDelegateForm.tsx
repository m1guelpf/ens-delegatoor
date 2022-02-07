import { useState } from 'react'
import useWeb3 from '@/hooks/useWeb3'
import useMetaDelegate from '@/hooks/useMetaDelegate'

const MetaDelegateForm = () => {
	const { web3 } = useWeb3()
	const delegateTo = useMetaDelegate()

	const [txHash, setTxHash] = useState<string>(null)
	const [delegatee, setDelegatee] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)

	const submitForm = async event => {
		setLoading(true)
		event.preventDefault()

		if (!web3) return alert('Please connect your wallet first.')

		const address = delegatee.match(/^(?:0x[a-fA-F0-9]{40})$/) ? delegatee : await web3.resolveName(delegatee)

		console.log(address)

		try {
			setTxHash(await delegateTo(address))
		} catch (error) {
			console.error(error)
			alert('Something went wrong! Please try again :)')
		}

		setLoading(false)
	}

	if (txHash) {
		return (
			<p>
				Transaction submitted!{' '}
				<a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
					See on Etherscan &rarr;
				</a>
			</p>
		)
	}

	return (
		<form onSubmit={submitForm} className="flex items-center justify-center">
			<label htmlFor="address" className="sr-only">
				Delegatee address or ENS name
			</label>
			<div className="mt-1 flex rounded-md shadow-sm">
				<div className="focus-within:z-10">
					<input
						type="text"
						id="address"
						className="focus:ring-gray-800 focus:border-gray-800 block w-full rounded-none rounded-l-md border-gray-300"
						placeholder="Address or ENS"
						value={delegatee}
						disabled={isLoading}
						onChange={event => setDelegatee(event.target.value)}
						required
						pattern="^(?:0x[a-fA-F0-9]{40})|(?:\w{2,}\.eth)$"
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
						/>
					</svg>
					<span>{isLoading ? 'Delegating...' : 'Delegate'}</span>
				</button>
			</div>
		</form>
	)
}

export default MetaDelegateForm
