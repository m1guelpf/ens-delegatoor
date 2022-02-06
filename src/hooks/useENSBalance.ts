import useSWR from 'swr'
import { ethers } from 'ethers'
import { useContext, useMemo } from 'react'
import { formatEther } from 'ethers/lib/utils'
import Web3Context from '@/context/Web3Context'
import { ENSToken, ENSToken__factory } from '@/contracts'

const useENSBalance = (): number | null => {
	const { web3, userAddress } = useContext<{ web3: ethers.providers.Web3Provider; userAddress: string }>(Web3Context)

	const tokenContract = useMemo<ENSToken>(() => {
		if (!web3) return

		return ENSToken__factory.connect(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, web3)
	}, [web3])

	const { data: balanceOf } = useSWR(
		() => userAddress && 'ens-balance',
		() => tokenContract.balanceOf(userAddress)
	)

	return balanceOf ? parseInt(formatEther(balanceOf)) : null
}

export default useENSBalance
