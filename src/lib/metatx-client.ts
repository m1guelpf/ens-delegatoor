import axios from 'axios'
import { Signature } from 'ethers'
import { JSONRPCClient } from 'json-rpc-2.0'

class Client {
	client: JSONRPCClient

	constructor() {
		this.client = new JSONRPCClient(request =>
			axios.post(process.env.NEXT_PUBLIC_META_ENDPOINT, request).then(res => this.client.receive(res.data))
		)
	}

	getPayloadFor(address: string): Promise<{ next: number; nonce: number }> {
		return this.client.request('query', { address }) as Promise<{ next: number; nonce: number }>
	}

	delegateWithSig(delegatee: string, nonce: number, expiry: number, sig: Signature): Promise<{ result: string }> {
		return this.client.request('delegate', { delegatee, nonce, expiry, r: sig.r, s: sig.s, v: sig.v }) as Promise<{
			result: string
		}>
	}
}

export default new Client()
