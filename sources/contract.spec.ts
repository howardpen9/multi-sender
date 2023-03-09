import { toNano, Dictionary, Address } from "ton";
import { ContractSystem } from "ton-emulator";
// import { TestTest, storeInput } from "./output/sample_TestTest";
import { Echo } from "./output/sample_Echo";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let nonOwner2 = system.treasure("non-owner-2");

        let contract = system.open(await TestTest.fromInit());
        let track = system.track(contract.address);
        let logger = system.log(contract.address);

        const user_list: Dictionary<bigint, Address> = Dictionary.empty();
        user_list.set(0n, owner.address);
        user_list.set(1n, nonOwner.address);
        user_list.set(2n, nonOwner2.address);

        const myDict_value: Dictionary<bigint, bigint> = Dictionary.empty();
        myDict_value.set(0n, toNano("0.012"));
        myDict_value.set(1n, toNano("0.023"));
        myDict_value.set(2n, toNano("0.01"));

        await contract.send(
            owner,
            { value: toNano(1) },
            {
                $$type: "Input",
                length: 2n,
                user_list: user_list, // Dictionary<bigint, Address>
                sending_value: myDict_value,
            }
        );
        await system.run();
        // expect(track.track()).toMatchInlineSnapshot();
        // expect(track.collect()).toMatchInlineSnapshot();
        // expect(logger.collect()).toMatchInlineSnapshot(); // TOO LONG
    });
});
