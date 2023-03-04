import { Address, beginCell, contractAddress, toNano, Dictionary } from "ton";
import { TestTest, storeInput } from "./output/sample_TestTest";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";

(async () => {
    // Parameters
    let oo = Address.parse("kQCBaqWlyNpFCfNNEQzXVSrr5aIy69copAOPsadgWn_l6vGD");
    let o2 = Address.parse("EQBBvGkvdAalLwkXgjLuVL-IgSvn-oPw_GLaOeUpu21Hvupz");
    let Address_1 = Address.parse("EQCPbbXp5NOjc6AetAOOHRgGljUYALhHWJDX3kgU1z00zcXG");
    let Address_2 = Address.parse("EQCI9Wn-bnJD5Et-1X9tRHZMPTS9rxhqxTyKWb-6HIXByL7L");
    let Address_3 = Address.parse("EQAvAAU6P8haSIR0pWw2Klxe7a370fIshVICaGKizJPZGiZ1L");

    const user_list: Dictionary<bigint, Address> = Dictionary.empty();
    user_list.set(0n, Address_1);
    user_list.set(1n, Address_2);
    user_list.set(2n, Address_3);
    user_list.set(3n, Address_2);
    user_list.set(4n, Address_2);
    user_list.set(5n, Address_2);
    user_list.set(6n, Address_2);
    user_list.set(7n, oo);
    user_list.set(8n, o2);

    const myDict_value: Dictionary<bigint, bigint> = Dictionary.empty();
    myDict_value.set(0n, toNano("0.1"));
    myDict_value.set(1n, toNano("0.1"));
    myDict_value.set(2n, toNano("0.1"));
    myDict_value.set(3n, toNano("0.1"));
    myDict_value.set(4n, toNano("0.1"));
    myDict_value.set(5n, toNano("0.1"));
    myDict_value.set(6n, toNano("0.1"));
    myDict_value.set(7n, toNano("0.1"));
    myDict_value.set(8n, toNano("0.1"));

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

    let init = await TestTest.init(o2);
    let address = contractAddress(0, init);
    let deployAmount = toNano("1");
    let testnet = true;

    // Print basics
    printHeader("SampleTactContract");
    printAddress(address);
    // printDeploy(init, deployAmount, packed_2, testnet);

    // Do deploy
    await deploy(init, deployAmount, packed_2, testnet);
})();
