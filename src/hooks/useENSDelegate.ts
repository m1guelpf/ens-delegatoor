import useSWR from 'swr'
import { ethers } from 'ethers'
import { useContext, useMemo } from 'react'
import Web3Context from '@/context/Web3Context'
import { ENSToken, ENSToken__factory } from '@/contracts'

const useENSDelegate = (): { address: string; ensName: string | null } | null => {
	const { web3, userAddress } = useContext<{ web3: ethers.providers.Web3Provider; userAddress: string }>(Web3Context)

	const tokenContract = useMemo<ENSToken>(() => {
		if (!web3) return

		return ENSToken__factory.connect(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, web3)
	}, [web3])

	const { data: delegatedTo } = useSWR(
		() => userAddress && 'ens-delegate',
		() =>
			tokenContract.delegates(userAddress).then(async delegateAddress => {
				return { address: delegateAddress, ensName: await web3.lookupAddress(delegateAddress) }
			})
	)

	return delegatedTo
}

export default useENSDelegate
