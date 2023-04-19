import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type AirdropTON_Without_Comment = {
    $$type: 'AirdropTON_Without_Comment';
    length: bigint;
    ton_user_list: Dictionary<bigint, Address>;
    ton_sending_value: Dictionary<bigint, bigint>;
}

export function storeAirdropTON_Without_Comment(src: AirdropTON_Without_Comment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(827956158, 32);
        b_0.storeInt(src.length, 257);
        b_0.storeDict(src.ton_user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.ton_sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadAirdropTON_Without_Comment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 827956158) { throw Error('Invalid prefix'); }
    let _length = sc_0.loadIntBig(257);
    let _ton_user_list = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _ton_sending_value = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'AirdropTON_Without_Comment' as const, length: _length, ton_user_list: _ton_user_list, ton_sending_value: _ton_sending_value };
}

function loadTupleAirdropTON_Without_Comment(source: TupleReader) {
    let _length = source.readBigNumber();
    let _ton_user_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _ton_sending_value = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'AirdropTON_Without_Comment' as const, length: _length, ton_user_list: _ton_user_list, ton_sending_value: _ton_sending_value };
}

function storeTupleAirdropTON_Without_Comment(source: AirdropTON_Without_Comment) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.length);
    builder.writeCell(source.ton_user_list.size > 0 ? beginCell().storeDictDirect(source.ton_user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.ton_sending_value.size > 0 ? beginCell().storeDictDirect(source.ton_sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserAirdropTON_Without_Comment(): DictionaryValue<AirdropTON_Without_Comment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAirdropTON_Without_Comment(src)).endCell());
        },
        parse: (src) => {
            return loadAirdropTON_Without_Comment(src.loadRef().beginParse());
        }
    }
}

export type JettonAirdrop = {
    $$type: 'JettonAirdrop';
    length: bigint;
    sender_jetton_wallet: Address;
    jetton_user_list: Dictionary<bigint, Address>;
    jetton_sending_value: Dictionary<bigint, bigint>;
}

export function storeJettonAirdrop(src: JettonAirdrop) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4369, 32);
        b_0.storeInt(src.length, 257);
        b_0.storeAddress(src.sender_jetton_wallet);
        b_0.storeDict(src.jetton_user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.jetton_sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadJettonAirdrop(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4369) { throw Error('Invalid prefix'); }
    let _length = sc_0.loadIntBig(257);
    let _sender_jetton_wallet = sc_0.loadAddress();
    let _jetton_user_list = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _jetton_sending_value = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'JettonAirdrop' as const, length: _length, sender_jetton_wallet: _sender_jetton_wallet, jetton_user_list: _jetton_user_list, jetton_sending_value: _jetton_sending_value };
}

function loadTupleJettonAirdrop(source: TupleReader) {
    let _length = source.readBigNumber();
    let _sender_jetton_wallet = source.readAddress();
    let _jetton_user_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _jetton_sending_value = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'JettonAirdrop' as const, length: _length, sender_jetton_wallet: _sender_jetton_wallet, jetton_user_list: _jetton_user_list, jetton_sending_value: _jetton_sending_value };
}

function storeTupleJettonAirdrop(source: JettonAirdrop) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.length);
    builder.writeAddress(source.sender_jetton_wallet);
    builder.writeCell(source.jetton_user_list.size > 0 ? beginCell().storeDictDirect(source.jetton_user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.jetton_sending_value.size > 0 ? beginCell().storeDictDirect(source.jetton_sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserJettonAirdrop(): DictionaryValue<JettonAirdrop> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonAirdrop(src)).endCell());
        },
        parse: (src) => {
            return loadJettonAirdrop(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

 type Airdrop_init_args = {
    $$type: 'Airdrop_init_args';
}

function initAirdrop_init_args(src: Airdrop_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Airdrop_init() {
    const __code = Cell.fromBase64('te6ccgECEwEAA40AART/APSkE/S88sgLAQIBYgIDAnbQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAMJFtjoLbPOJZ2zwwMMj4QgHMfwHKAMntVAQFAHGhd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcAAm0EqHAh10nCH5UwINcLH94Cklt/4CGBERG6j7Ix0x8BgRERuvLggYEBAdcA+kABAfQE9ARVMGwU+EFvJDAyUGbbPHAgiuYxbEOhEts8f+AhghAxWZu+ugwGDQcD2CWBAQEjWfQMb6GSMG3fgQEBVFYAUlBBM/QMb6GUAdcAMJJbbeIgIG7y0IAToIIQBMS0AHJwBSBu8tCABCBu8tCA+ChtgghMS0DbPCpQllBZFEMwyFVg2zzJKkQUA1BVFEMwbW3bPAGkUwe8EggJEQT+j/wx0x8BghAxWZu+uvLggYEBAdcA9AT0BFUgbBP4QW8kMDJQVds8cCCOyiWBAQEjWfQMb6GSMG3fgQEBVFYAUlBBM/QMb6GUAdcAMJJbbeIgIG7y0IBQA6ABIG7y0IACIG7y0IAScnBVIG1tbds8AaRTBrwS5jFsM6ES2zx/4AwRDQ4CCNs82zwKCwBYghAPin6lUAjLHxbLP1AE+gJYzxYBzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYABMjJAALQACz4J28QIaGCCcnDgGa2CKGCCcnDgKChAipycIuENvbXBsZXRljbPBRDMG1t2zwPEQFEAcAAAddJwSGwjpX4QW8kECNfA3CBAIJwVSBtbW3bPH/gcBEBQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMRAAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwH2yHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6zEgAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsA');
    const __system = Cell.fromBase64('te6cckECFQEAA5cAAQHAAQEFoNd1AgEU/wD0pBP0vPLICwMCAWIFBABxoXejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHAnbQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAMJFtjoLbPOJZ2zwwMMj4QgHMfwHKAMntVBQGBKhwIddJwh+VMCDXCx/eApJbf+AhgRERuo+yMdMfAYEREbry4IGBAQHXAPpAAQH0BPQEVTBsFPhBbyQwMlBm2zxwIIrmMWxDoRLbPH/gIYIQMVmbvroTDAkHBP6P/DHTHwGCEDFZm7668uCBgQEB1wD0BPQEVSBsE/hBbyQwMlBV2zxwII7KJYEBASNZ9AxvoZIwbd+BAQFUVgBSUEEz9AxvoZQB1wAwkltt4iAgbvLQgFADoAEgbvLQgAIgbvLQgBJycFUgbW1t2zwBpFMGvBLmMWwzoRLbPH/gEw0JCAFEAcAAAddJwSGwjpX4QW8kECNfA3CBAIJwVSBtbW3bPH/gcA0CKnJwi4Q29tcGxldGWNs8FEMwbW3bPAoNAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DELALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMD2CWBAQEjWfQMb6GSMG3fgQEBVFYAUlBBM/QMb6GUAdcAMJJbbeIgIG7y0IAToIIQBMS0AHJwBSBu8tCABCBu8tCA+ChtgghMS0DbPCpQllBZFEMwyFVg2zzJKkQUA1BVFEMwbW3bPAGkUwe8EhAPDQH2yHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6zDgAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsAAFiCEA+KfqVQCMsfFss/UAT6AljPFgHPFiFus5V/AcoAzJRwMsoA4gH6AgHPFgII2zzbPBIRAALQAATIyQAs+CdvECGhggnJw4BmtgihggnJw4CgoQACbd2McuI=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAirdrop_init_args({ $$type: 'Airdrop_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Airdrop_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
}

export class Airdrop implements Contract {
    
    static async init() {
        return await Airdrop_init();
    }
    
    static async fromInit() {
        const init = await Airdrop_init();
        const address = contractAddress(0, init);
        return new Airdrop(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Airdrop(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Airdrop_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonAirdrop | AirdropTON_Without_Comment | null) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonAirdrop') {
            body = beginCell().store(storeJettonAirdrop(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AirdropTON_Without_Comment') {
            body = beginCell().store(storeAirdropTON_Without_Comment(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}