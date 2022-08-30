import Web3 from 'web3'
import detectEthereumProvider from "@metamask/detect-provider";

export const getAddr = async () => {
    let res = await (window['ethereum'] as any).request({ method: 'eth_requestAccounts' })
    return res[0]
}
export default async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
        const web3 = new Web3((provider as any));
        return web3
    } else {
        console.error("Please install Metamask");
        return {}
    }
}
