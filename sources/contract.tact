// ==== Method: 1 ==== // 
message AirdropTON_Without_Comment {
    length: Int;
    ton_user_list: map<Int, Address>;
    ton_sending_value: map<Int, Int>;
}

message (0x1111) JettonAirdrop {
    length: Int;
    sender_jetton_wallet: Address;
    jetton_user_list: map<Int, Address>;
    jetton_sending_value: map<Int, Int>;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

// Owner Transfer Jetton -> Airdrop Contract's jetton Wallet (每種token 都會有不同 wallet)
contract Airdrop {
    const minTonsForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");

    init() {}

    receive(msg: JettonAirdrop) {
        let ctx: Context = context();
        let msgValue: Int = self.msgValue(ctx.value);

        let value_default: Int = 0;
        let sendingValue: Int = 0;

        do {
            let receiver: Address? = msg.jetton_user_list.get(value_default);
            let jetton_send_amount: Int? = msg.jetton_sending_value.get(value_default);
            
            sendingValue = sendingValue + jetton_send_amount!!;

            send(SendParameters{
                    to: msg.sender_jetton_wallet,
                    value: ton("0.08"), 
                    mode: SendIgnoreErrors,  
                    bounce: false,
                    body: TokenTransfer {
                        queryId: value_default, 
                        amount: jetton_send_amount!!,
                        destination: receiver!!,
                        response_destination: myAddress(),
                        custom_payload: null,
                        forward_ton_amount: ton("0.005"),
                        forward_payload: emptySlice()
                    }.toCell()
                });
            value_default =  value_default + 1;
        } until (value_default > msg.length);
        self.completed(ctx.sender, msgValue - sendingValue);
    }


    receive(msg: AirdropTON_Without_Comment) {
        let ctx: Context = context();
        let msgValue: Int = self.msgValue(ctx.value);
        let value_default: Int = 0;
        let sendingValue: Int = 0;
        do {
            let receiver: Address? = msg.ton_user_list.get(value_default);
            let value_send: Int? = msg.ton_sending_value.get(value_default);
            sendingValue = value_send!! + sendingValue;
            send(SendParameters{ to: receiver!!, value: value_send!!, mode: SendIgnoreErrors,  bounce: false });
            value_default =  value_default + 1;
        } until (value_default > msg.length);
        self.completed(ctx.sender, msgValue - sendingValue);
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

    fun completed(to_address: Address, value: Int) {
        send(SendParameters{
                to: to_address,
                value: value, // msgValue - sendingValue, 
                mode: SendIgnoreErrors, 
                bounce: false,
                body: "Complete".asComment()
        });
    }

    fun msgValue(msgValue: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = self.minTonsForStorage - min(tonBalanceBeforeMsg, self.minTonsForStorage);
        msgValue = msgValue - (storageFee + self.gasConsumption);
        return msgValue;
    }
}