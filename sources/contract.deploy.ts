import { Address, beginCell, contractAddress, toNano, Dictionary, Slice } from "ton";
import { Airdrop, storeAirdropTON_Without_Comment } from "./output/sample_Airdrop";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";

(async () => {
    // Parameters
    let Address_1 = Address.parse("");
    let Address_2 = Address.parse("");
    let Address_3 = Address.parse("");

    const user_list: Dictionary<bigint, Address> = Dictionary.empty();
    user_list.set(0n, Address_1);
    user_list.set(1n, Address_2);
    user_list.set(2n, Address_3);
    user_list.set(3n, Address_2);
    user_list.set(4n, Address_2);
    user_list.set(5n, Address_2);
    user_list.set(6n, Address_2);
    user_list.set(7n, Address_1);
    user_list.set(8n, Address_1);

    const myDict_value: Dictionary<bigint, bigint> = Dictionary.empty();
    myDict_value.set(0n, toNano("0.03"));
    myDict_value.set(1n, toNano("0.03"));
    myDict_value.set(2n, toNano("0.03"));
    myDict_value.set(3n, toNano("0.03"));
    myDict_value.set(4n, toNano("0.03"));
    myDict_value.set(5n, toNano("0.03"));
    myDict_value.set(6n, toNano("0.03"));
    myDict_value.set(7n, toNano("0.03"));
    myDict_value.set(8n, toNano("0.03"));

    let packed_2 = beginCell()
        .store(
            storeAirdropTON_Without_Comment({
                $$type: "AirdropTON_Without_Comment",
                length: 7n, // How many items
                user_list: user_list,
                sending_value: myDict_value,
            })
        )
        .endCell();

    let init = await Airdrop.init();
    // let init = await Echo.init();
    let address = contractAddress(0, init);
    let deployAmount = toNano("1");
    let testnet = true;

    const data = Buffer.from("Hello, world!");

    // create a new slice from a hex string
    const hexString = "deadbeef";
    // const sc = hexString.slice(1);

    // Print basics
    printHeader("TestAirdrop");
    printAddress(address);
    printDeploy(init, deployAmount, packed_2, testnet);

    // Do deploy
    await deploy(init, deployAmount, packed_2, testnet);
    // await deploy(init, deployAmount, hexString, testnet);
})();
