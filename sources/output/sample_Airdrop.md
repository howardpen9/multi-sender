# TACT Compilation Report
Contract: Airdrop
BOC Size: 921 bytes

# Types
Total Types: 6

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## AirdropTON_Without_Comment
TLB: `airdrop_ton_without_comment#31599bbe length:int257 ton_user_list:dict<int, address> ton_sending_value:dict<int, int> = AirdropTON_Without_Comment`
Signature: `AirdropTON_Without_Comment{length:int257,ton_user_list:dict<int, address>,ton_sending_value:dict<int, int>}`

## JettonAirdrop
TLB: `jetton_airdrop#00001111 length:int257 sender_jetton_wallet:address jetton_user_list:dict<int, address> jetton_sending_value:dict<int, int> = JettonAirdrop`
Signature: `JettonAirdrop{length:int257,sender_jetton_wallet:address,jetton_user_list:dict<int, address>,jetton_sending_value:dict<int, int>}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

# Get Methods
Total Get Methods: 0

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address