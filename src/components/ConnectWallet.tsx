import useWeb3 from '@/hooks/useWeb3'
import { formatAddressShort } from '@/lib/utils'

const ConnectWallet = () => {
	const { web3, userAddress, userENS, connectWallet, disconnectWallet } = useWeb3()

	return (
		<button
			className="border-2 border-black text-black text-lg p-2"
			onClick={web3 ? disconnectWallet : connectWallet}
		>
			{userENS || formatAddressShort(userAddress) || 'Connect Wallet'}
		</button>
	)
}

export default ConnectWallet
