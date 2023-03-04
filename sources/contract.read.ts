import { beginCell, Address, contractAddress, ContractProvider, TonClient, fromNano } from "ton";
import { printSeparator } from "./utils/print";

// Contract Abi //
import { TestTest } from "./output/sample_TestTest";

(async () => {
    // Parameters
    let Address_1 = Address.parse("EQCBaqWlyNpFCfNNEQzXVSrr5aIy69copAOPsadgWn_l6koJ");
    let Address_2 = Address.parse("EQCI9Wn-bnJD5Et-1X9tRHZMPTS9rxhqxTyKWb-6HIXByL7L");
    let Address_3 = Address.parse("EQAvAAU6P8haSIR0pWw2Klxe7a370fIshVICaGKizJPZGiZ1L");

    let init = await TestTest.init();

    // 生成 Collection 目標合約地址（與 Init 參數有關）
    let contract_address = contractAddress(0, init);
    console.log("==========================");

    const client = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        apiKey: "36ab376244e2bfd59354fd2b014b46bd5ae13c6c33e942dbe6f0c165068ebce7",
    });

    console.log("Loading contract data...");
    console.log("Calling - Collection Address\n => " + contract_address);
    let contract_dataFormat = TestTest.fromAddress(contract_address);
    let contract = client.open(contract_dataFormat);
    printSeparator();

    for (let i = BigInt(0); i <= BigInt(2); i++) {
        let data_0 = await contract.getGetRecordMap1(i);
        let data_0_2 = await contract.getGetRecordMap2(i);

        console.log(data_0 + " --- " + data_0_2);
    }
})();
