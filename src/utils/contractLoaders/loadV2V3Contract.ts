import { Contract, ContractInterface } from "@ethersproject/contracts";
import { Signer } from "ethers/lib/ethers";
import { V3ContractName } from "../../models/contracts";
import { loadJBTiered721DelegateProjectDeployerContract } from "./JBTiered721DelegateProjectDeployer";
import { loadJBTiered721DelegateStoreContract } from "./JBTiered721DelegateStoreContract";

export interface ForgeDeploy {
  receipts: { contractAddress: string }[];
  transactions: { contractName: string; contractAddress: string }[];
}

export interface ContractJson {
  address: string | undefined;
  abi: ContractInterface | undefined;
}

export type SignerOrProvider = Signer;

export const loadV2V3Contract = async (
  contractName: V3ContractName,
  network: string,
  signerOrProvider: SignerOrProvider
): Promise<Contract | undefined> => {
  let contractJson: ContractJson | undefined = undefined;

  if (contractName === V3ContractName.JBTiered721DelegateProjectDeployer) {
    contractJson = await loadJBTiered721DelegateProjectDeployerContract();
  } else if (contractName === V3ContractName.JBTiered721DelegateStore) {
    contractJson = await loadJBTiered721DelegateStoreContract();
  }

  if (!contractJson || !contractJson.address || !contractJson.abi) {
    console.info(
      `Contract load skipped [contract=${contractName} network=${network}]`
    );
    return;
  }

  return new Contract(contractJson.address, contractJson.abi, signerOrProvider);
};
