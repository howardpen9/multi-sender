
message AirdropTON_Without_Comment {
    length: Int;
    user_list: map<Int, Address>;
    sending_value: map<Int, Int>;
}

contract Airdrop {
    const minTonsForStorage: Int = ton("0.04");
    const gasConsumption: Int = ton("0.04");


    init() {
    }

    receive(msg: AirdropTON_Without_Comment) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        msgValue = msgValue - (storageFee + self.gasConsumption);

        let value_default: Int = 1;
        let sendingValue: Int = 1;

        do {
            let receiver: Address? = msg.user_list.get(value_default);
            let value_send: Int? = msg.sending_value.get(value_default);
            sendingValue = value_send!! + sendingValue;

            send(SendParameters{
                to: receiver!!, 
                value: value_send!!, 
                mode: SendIgnoreErrors,  
                bounce: false
            });
            value_default =  value_default + 1;
        } until (value_default > msg.length);

        send(SendParameters{
                to: ctx.sender,
                value: msgValue - sendingValue, 
                mode: SendIgnoreErrors, 
                bounce: false,
                body: "Complete".asComment()
            });
    }

    receive(){
        let ctx: Context = context();
        send(SendParameters{
                to: ctx.sender,
                value: 0, 
                mode: SendIgnoreErrors + SendRemainingBalance,
                bounce: false
        });
    }
}



// contract Echo {
//     init() {
//     }
//     receive(msg: String) {
//         let ctx: Context = context();
//         let builder: StringBuilder = beginString();
//         builder.append("Hello, ");
//         builder.append(msg);

//         reply(builder.toString().asComment());
//         throw(123123123);

//         send(SendParameters{
//             to: ctx.sender,
//             value: 0, 
//             mode: SendRemainingValue + SendIgnoreErrors, 
//             bounce: false, 
//             body: builder.toString().asComment()
//         });  
//     }
//     receive(msg: Slice) {
//         reply(msg.asCell());
//     }
//     get fun hello(src: String): String {
//         let builder: StringBuilder = beginString();
//         builder.append("Hello, ");
//         builder.append(src);
//         return builder.toString();
//     }
// }