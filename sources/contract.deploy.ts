import { Address, beginCell, contractAddress, toNano, Dictionary, Slice } from "ton";
import { Airdrop, storeAirdropTON_Without_Comment, storeJettonAirdrop } from "./output/sample_Airdrop";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";

(async () => {
    // Parameters
    let Address_1 = Address.parse("ADDRESS_1");
    let Address_2 = Address.parse("ADDRESS_2");
    let Address_3 = Address.parse("ADDRESS_3");

    const user_list: Dictionary<bigint, Address> = Dictionary.empty();
    user_list.set(0n, Address_1);
    user_list.set(1n, Address_2);
    user_list.set(2n, Address_3);
    // user_list.set(3n, Address_2);
    // user_list.set(4n, Address_2);
    // user_list.set(5n, Address_2);
    // user_list.set(6n, Address_2);
    // user_list.set(7n, Address_1);
    // user_list.set(8n, Address_1);

    const myDict_value: Dictionary<bigint, bigint> = Dictionary.empty();
    myDict_value.set(0n, toNano("0.05"));
    myDict_value.set(1n, toNano("0.05"));
    myDict_value.set(2n, toNano("0.05"));
    // myDict_value.set(3n, toNano("0.05"));
    // myDict_value.set(4n, toNano("0.05"));
    // myDict_value.set(5n, toNano("0.05"));
    // myDict_value.set(6n, toNano("0.05"));
    // myDict_value.set(7n, toNano("0.05"));
    // myDict_value.set(8n, toNano("0.05"));

    let packed_2 = beginCell()
        .store(
            storeAirdropTON_Without_Comment({
                $$type: "AirdropTON_Without_Comment",
                length: 7n, // How many items
                ton_user_list: user_list,
                ton_sending_value: myDict_value,
            })
        )
        .endCell();

    // ======== NEW ======= // 
    const myDict_jetton : Dictionary<bigint, bigint> = Dictionary.empty();
    myDict_jetton.set(0n, toNano("200"));
    myDict_jetton.set(1n, toNano("1000"));
    myDict_jetton.set(2n, toNano("10"));
    // myDict_jetton.set(3n, toNano("52123"));
    // myDict_jetton.set(4n, toNano("6"));
    // myDict_jetton.set(5n, toNano("330"));
    // myDict_jetton.set(6n, toNano("33333"));
    // myDict_jetton.set(7n, toNano("4.55553"));
    // myDict_jetton.set(8n, toNano("9.00003"));

    // let jetton_master = Address.parse("EQAclD27vf1ED8ld5OqPkzXkiLYPRNLeVhkCnyoqFBOsZS_F");
    // 預先取得這個「空投合約」所持有的「Jetton Wallet 地址」
    let the_airdropContract_jetton_wallet = Address.parse("EQBAiup7Ov3Zm1STNiLO5f963iEkQlYI5eebr1G-edME6zS-");
    let packed_jetton = beginCell()
    .store(
        storeJettonAirdrop({
            $$type: 'JettonAirdrop',
            length: 2n,
            sender_jetton_wallet: the_airdropContract_jetton_wallet, // address
            jetton_user_list: user_list,
            jetton_sending_value: myDict_jetton
        })
    ).endCell();


    let init = await Airdrop.init();
    let address = contractAddress(0, init);
    let deployAmount = toNano("1.5");
    let testnet = true;

    const data = Buffer.from("Hello, world!");

    // create a new slice from a hex string
    const hexString = "deadbeef";
    // const sc = hexString.slice(1);

    // Print basics
    printHeader("TestAirdrop");
    printAddress(address);
    // printDeploy(init, deployAmount, packed_2, testnet);

    // Do deploy
    // await deploy(init, deployAmount, packed_2, testnet);
    await deploy(init, deployAmount, packed_jetton, testnet);

    // await deploy(init, deployAmount, hexString, testnet);
})();
