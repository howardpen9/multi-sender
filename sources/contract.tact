
// message AirdropTON_Without_Comment {
//     length: Int;
//     user_list: map<Int, Address>;
//     sending_value: map<Int, Int>;
// }
// message InputJetton {
//     length: Int;
//     jetton_address: Address;
//     user_list: map<Int, Address>;
//     sending_value: map<Int, Int>;
// }
// contract TestTest {
//     const minTonsForStorage: Int = ton("0.04");
//     const gasConsumption: Int = ton("0.04");
//     owner: Address;

//     init(owner: Address) {
//         self.owner = owner;
//     }
//     // cost: 0.001188 TON with comment 
//     // cost: 0.001    TON without Comment
//     receive(msg: AirdropTON_Without_Comment) {
//         let ctx: Context = context();
//         let msgValue: Int = ctx.value;
//         let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
//         let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
//         msgValue = msgValue - (storageFee + self.gasConsumption);

//         let value_default: Int = 0;
//         let sendingValue: Int = 0;

//         do {
//             let receiver: Address? = msg.user_list.get(value_default);
//             let value_send: Int? = msg.sending_value.get(value_default);
//             sendingValue = value_send!! + sendingValue;
//             send(SendParameters{
//                 to: receiver!!, 
//                 value: value_send!!, 
//                 mode: SendIgnoreErrors,  
//                 bounce: false,
//                 body: "Airdrop".asComment()
//             });
//             value_default =  value_default + 1;
//         } until (value_default > msg.length);

//         send(SendParameters{
//                 to: ctx.sender,
//                 value: msgValue - sendingValue, 
//                 mode: SendIgnoreErrors, 
//                 bounce: false,
//                 body: "Complete".asComment()
//             });
//     }

//     receive(){
//         let ctx: Context = context();
//         send(SendParameters{
//                 to: ctx.sender,
//                 value: 0, 
//                 mode: SendIgnoreErrors + SendRemainingBalance,
//                 bounce: false
//         });
//     }

//     receive(msg: Slice) {
//         let ctx: Context = context();
        
//         send(SendParameters{
//             to: ctx.sender,
//             value: 0, 
//             mode: SendRemainingValue + SendIgnoreErrors, 
//             bounce: true, 
//             body: msg.asComment()
//         });    
//     }

// }



contract Echo {

    init(a: Int) {
   
    }

    receive(msg: String) {
        let builder: StringBuilder = beginString();
        builder.append("Hello, ");
        builder.append(msg);

        let endTime: Int = now() + 10000;
        while (now() < endTime) {
            // Do nothing 
        }
        reply(builder.toString().asComment());
    }
    
    receive(msg: Slice) {
        reply(msg.asCell());
    }

    get fun hello(src: String): String {
        let builder: StringBuilder = beginString();
        builder.append("Hello, ");
        builder.append(src);
        return builder.toString();
    }
}