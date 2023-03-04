import {
    TonClient,
    WalletContractV4,
    internal,
    beginCell,
    toNano,
    contractAddress,
    Address,
    fromNano,
    TonClient4,
    Dictionary,
} from "ton";
import { mnemonicToPrivateKey } from "ton-crypto";
import { TestTest, storeInput } from "./output/sample_TestTest";
// import * as dotenv from "dotenv";
// dotenv.config();

let Address_1 = Address.parse("EQCBaqWlyNpFCfNNEQzXVSrr5aIy69copAOPsadgWn_l6koJ");
// let Address_2 = Address.parse("EQCI9Wn-bnJD5Et-1X9tRHZMPTS9rxhqxTyKWb-6HIXByL7L");
// let Address_3 = Address.parse("EQAvAAU6P8haSIR0pWw2Klxe7a370fIshVICaGKizJPZGiZ1L");

async function main() {
    // Create Client
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });

    let mnemonics = (process.env.mnemonics || "").toString();
    let keyPair = await mnemonicToPrivateKey([mnemonics]);

    // Create wallet contract
    let workchain = 0; // Usually you need a workchain 0
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_address = client.open(wallet);
    console.log("Wallet Address: \n" + wallet_address.address);

    // Get balance
    let balance: bigint = await wallet_address.getBalance();
    console.log("Current deployment wallet balance = ", fromNano(balance).toString(), "💎TON");

    let init = await TestTest.init(Address_1);
    let contract_address = contractAddress(0, init);
    // let contract_dataFormat = GameCollections.fromAddress(contract_address);

    let item_id = 0n; // 🔴 Reviewer（審核人的 NFT Item ID）
    let contract_dataFormat = TestTest.fromAddress(contract_address);
    let contract = client.open(contract_dataFormat);

    const user_list: Dictionary<bigint, Address> = Dictionary.empty();
    user_list.set(0n, Address_1);

    const myDict_value: Dictionary<bigint, bigint> = Dictionary.empty();
    myDict_value.set(0n, toNano("0.1"));

    let packed_2 = beginCell()
        .store(
            storeInput({
                $$type: "Input",
                length: 6n, // How many items
                user_list: user_list,
                sending_value: myDict_value,
            })
        )
        .endCell();

    console.log("\nSending Txs......");
    let seqno: number = await wallet_address.getSeqno();

    let transfer = await wallet_address.sendTransfer({
        seqno: seqno,
        secretKey: keyPair.secretKey,
        messages: [
            internal({
                to: contract.address,
                value: toNano("0.6"),
                init: {
                    code: init.code,
                    data: init.data,
                },
                bounce: true,
                body: packed_2, // TDODO
            }),
        ],
    });
    console.log("==== Txs Sent ===");
}
main();
