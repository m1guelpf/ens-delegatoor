export const formatAddressShort = (address: string): string | null => {
	if (!address) return null

	// Skip over ENS names
	if (address.includes('.')) return address

	return `${address.slice(0, 4)}…${address.slice(address.length - 4, address.length)}`
}

export const script = (url: string, onLoad: () => void) => {
	var script = document.createElement('script')
	script.src = url
	script.async = true

	script.addEventListener('load', onLoad)
	script.addEventListener('error', onLoad)

	document.head.appendChild(script)
}
