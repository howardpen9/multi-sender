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

export type InputTON = {
    $$type: 'InputTON';
    length: bigint;
    user_list: Dictionary<bigint, Address>;
    sending_value: Dictionary<bigint, bigint>;
}

export function storeInputTON(src: InputTON) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3052599932, 32);
        b_0.storeInt(src.length, 257);
        b_0.storeDict(src.user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadInputTON(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3052599932) { throw Error('Invalid prefix'); }
    let _length = sc_0.loadIntBig(257);
    let _user_list = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _sending_value = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'InputTON' as const, length: _length, user_list: _user_list, sending_value: _sending_value };
}

function loadTupleInputTON(source: TupleReader) {
    let _length = source.readBigNumber();
    let _user_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _sending_value = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'InputTON' as const, length: _length, user_list: _user_list, sending_value: _sending_value };
}

function storeTupleInputTON(source: InputTON) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.length);
    builder.writeCell(source.user_list.size > 0 ? beginCell().storeDictDirect(source.user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.sending_value.size > 0 ? beginCell().storeDictDirect(source.sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserInputTON(): DictionaryValue<InputTON> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInputTON(src)).endCell());
        },
        parse: (src) => {
            return loadInputTON(src.loadRef().beginParse());
        }
    }
}

export type InputJetton = {
    $$type: 'InputJetton';
    length: bigint;
    jetton_address: Address;
    user_list: Dictionary<bigint, Address>;
    sending_value: Dictionary<bigint, bigint>;
}

export function storeInputJetton(src: InputJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1953149365, 32);
        b_0.storeInt(src.length, 257);
        b_0.storeAddress(src.jetton_address);
        b_0.storeDict(src.user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadInputJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1953149365) { throw Error('Invalid prefix'); }
    let _length = sc_0.loadIntBig(257);
    let _jetton_address = sc_0.loadAddress();
    let _user_list = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _sending_value = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'InputJetton' as const, length: _length, jetton_address: _jetton_address, user_list: _user_list, sending_value: _sending_value };
}

function loadTupleInputJetton(source: TupleReader) {
    let _length = source.readBigNumber();
    let _jetton_address = source.readAddress();
    let _user_list = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _sending_value = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'InputJetton' as const, length: _length, jetton_address: _jetton_address, user_list: _user_list, sending_value: _sending_value };
}

function storeTupleInputJetton(source: InputJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.length);
    builder.writeAddress(source.jetton_address);
    builder.writeCell(source.user_list.size > 0 ? beginCell().storeDictDirect(source.user_list, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.sending_value.size > 0 ? beginCell().storeDictDirect(source.sending_value, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserInputJetton(): DictionaryValue<InputJetton> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInputJetton(src)).endCell());
        },
        parse: (src) => {
            return loadInputJetton(src.loadRef().beginParse());
        }
    }
}

 type TestTest_init_args = {
    $$type: 'TestTest_init_args';
    owner: Address;
}

function initTestTest_init_args(src: TestTest_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function TestTest_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECDQEAAs0AART/APSkE/S88sgLAQIBYgIDAYTQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAAZT6QAExlfpAAQHR4lnbPDDI+EIBzH8BygABzxbJ7VQEAHGhd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcD0nAh10nCH5UwINcLH94Cklt/4CGCELXy+ny6jp4x0x8BghC18vp8uvLggYEBAdcA9AT0BFUgbBPbPH/gIcAAIddJwSGwjpZb+EFvJBAjXwNwgQCCcFUgbW1t2zx/4AGCEHRqsbW64wIwcAULBgT0+EFvJDAy+CdvECKhggpiWgBmtgihggpiWgCgEqFwII7KJYEBASNZ9AxvoZIwbd+BAQFUVgBSUEEz9AxvoZQB1wAwkltt4iAgbvLQgFADoAEgbvLQgAIgbvLQgBJycFUgbW1t2zwBpFMGvBLmMWwzoXJwids8FEMwbW0LBwgJAELTHwGCEHRqsbW68uCBgQEB1wD6QAEB9AT0BFUwbBRfBH8AEENvbXBsZXRlAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEKAQTbPAsAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwH2yHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6zDAAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsA');
    const __system = Cell.fromBase64('te6cckECDwEAAtcAAQHAAQEFoXoBAgEU/wD0pBP0vPLICwMCAWIFBABxoXejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHAYTQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAAZT6QAExlfpAAQHR4lnbPDDI+EIBzH8BygABzxbJ7VQGA9JwIddJwh+VMCDXCx/eApJbf+AhghC18vp8uo6eMdMfAYIQtfL6fLry4IGBAQHXAPQE9ARVIGwT2zx/4CHAACHXScEhsI6WW/hBbyQQI18DcIEAgnBVIG1tbds8f+ABghB0arG1uuMCMHAIDQcAQtMfAYIQdGqxtbry4IGBAQHXAPpAAQH0BPQEVTBsFF8EfwT0+EFvJDAy+CdvECKhggpiWgBmtgihggpiWgCgEqFwII7KJYEBASNZ9AxvoZIwbd+BAQFUVgBSUEEz9AxvoZQB1wAwkltt4iAgbvLQgFADoAEgbvLQgAIgbvLQgBJycFUgbW1t2zwBpFMGvBLmMWwzoXJwids8FEMwbW0NDAoJAQTbPA0BQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMQsAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwAQQ29tcGxldGUB9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusw4AMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AB0bv68=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTestTest_init_args({ $$type: 'TestTest_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TestTest_errors: { [key: number]: { message: string } } = {
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

export class TestTest implements Contract {
    
    static async init(owner: Address) {
        return await TestTest_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await TestTest_init(owner);
        const address = contractAddress(0, init);
        return new TestTest(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TestTest(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: TestTest_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InputTON | null | InputJetton) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InputTON') {
            body = beginCell().store(storeInputTON(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InputJetton') {
            body = beginCell().store(storeInputJetton(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}