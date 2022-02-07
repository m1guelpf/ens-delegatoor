import { ethers } from 'ethers'
import { useCallback, useContext } from 'react'
import Client from '@/lib/metatx-client'
import Web3Context from '@/context/Web3Context'

const useMetaDelegate = () => {
	const { web3, userAddress } = useContext<{ web3: ethers.providers.Web3Provider; userAddress: string }>(Web3Context)

	const delegateTo = useCallback(
		async (delegatee: string): Promise<string> => {
			const { next, nonce } = await Client.getPayloadFor(userAddress)

			if (next === null || next > new Date().getTime() / 1000)
				throw alert(
					`This address can't delegate for free${
						next === null ? '' : ` for the next ${Math.ceil(next - new Date().getTime() / 1000)} seconds`
					}.`
				)

			const expiry = Math.ceil(new Date().getTime() / 1000 + 10 * 60) // 10 min

			const signature = ethers.utils.splitSignature(
				await web3.getSigner()._signTypedData(
					{
						name: 'Ethereum Name Service',
						version: '1',
						chainId: await web3.getSigner().getChainId(),
						verifyingContract: process.env.NEXT_PUBLIC_TOKEN_CONTRACT,
					},
					{
						Delegation: [
							{ name: 'delegatee', type: 'address' },
							{ name: 'nonce', type: 'uint256' },
							{ name: 'expiry', type: 'uint256' },
						],
					},
					{ delegatee, nonce, expiry }
				)
			)

			const { result } = await Client.delegateWithSig(delegatee, nonce, expiry, signature)

			return result
		},
		[web3, userAddress]
	)

	return delegateTo
}

export default useMetaDelegate
