import * as fcl from '@blocto/fcl';
import { init } from '@onflow/fcl-wc';
import dappInfo from '$lib/config/config';
import { env } from '$env/dynamic/public';

const resolver = async () => {
	return {
		appIdentifier: 'FLOAT',
		nonce: env.PUBLIC_NONCE
	};
};

export const network: 'mainnet' | 'testnet' | 'emulator' = env.PUBLIC_FLOW_NETWORK as
	| 'mainnet'
	| 'testnet'
	| 'emulator';

const fclConfigInfo = {
	emulator: {
		accessNode: 'http://127.0.0.1:8888',
		discoveryWallet: 'http://localhost:8701/fcl/authn',
		discoveryAuthInclude: []
	},
	testnet: {
		accessNode: 'https://rest-testnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/testnet/authn',
		discoveryAuthInclude: ["0x82ec283f88a62e65", "0x9d2e44203cb13051"]
	},
	mainnet: {
		accessNode: 'https://rest-mainnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/authn',
		discoveryAuthInclude: ["0xead892083b3e2c6c", "0xe5cd26afebe62781"]
	}
};

fcl.config({
	'app.detail.title': dappInfo.title,
	'app.detail.icon': dappInfo.icon,
	'fcl.accountProof.resolver': resolver,
	'flow.network': network,
	'accessNode.api': fclConfigInfo[network].accessNode,
	'discovery.wallet': fclConfigInfo[network].discoveryWallet,
	// include Dapper Wallet and Ledger. 
	// Docs: https://developers.flow.com/tools/clients/fcl-js/api#more-configuration
	"discovery.authn.include": fclConfigInfo[network].discoveryAuthInclude,
});

// add WalletConnect for mobile apps.
// Docs: https://developers.flow.com/tools/clients/fcl-js/wallet-connect
if (network === 'testnet' || network === 'mainnet') {
	init({
		projectId: env.PUBLIC_WALLET_CONNECT_PROJECT_ID,
		metadata: {
			name: 'FLOAT',
			description: 'A proof of attendance platform on the Flow blockchain.',
			url: 'https://floats.city',
			icons: ['https://floats.city/favicon.png'],
		},
		includeBaseWC: true, // makes WalletConnect show up itself
		wallets: [], // no idea
		wcRequestHook: null, // no fucking idea
		pairingModalOverride: null // ???????
	}).then(({ FclWcServicePlugin }) => {
		fcl.pluginRegistry.add(FclWcServicePlugin)
	})

}