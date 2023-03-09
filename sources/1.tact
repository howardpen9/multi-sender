import "@stdlib/jetton";

message Deposit {
    amount: Int as uint128;
}

message Withdraw {
    amount: Int as uint128;
}

message EmergencyWithdraw {
    amount: Int as uint128;
}

struct UserInfo {
    amount: Int as uint128;
    rewardDebt: Int as uint128;
}

contract MasterChef with Deployable, Jetton {
    // Token which is going to be farmed
    rewardToken: Address;

    // Dev Address
    devAddr: Address;

    // tokens created per second.
    rewardPerTimestamp: Int as uint128;

    constant BONUS_MULTIPLIER: Int = 1;

    // Info of each user that stakes tokens.
    userInfo: map<Address, UserInfo>;

    // Pool Info
    token_minter: Address;
    accTokenPerShare: Int as uint128;
    lastRewardTimestamp: Int as uint128;

    // Balance Data
    rewardTokenBalance: Int;
    tokenBalance: Int;

    init(
        _rewardToken: Address,
        _devAddr: Address,
        _rewardPerTimestamp: Int as uint128,
        _startTimestamp: Int as uint128
    ) {
        self.rewardToken = _rewardToken;
        self.devAddr = _devAddr;
        self.rewardPerTimestamp = _rewardPerTimestamp;
        self.lastRewardTimestamp = _startTimestamp;
        self.accTokenPerShare = 0;
    }

    fun updatePool() {
        if (now() <= lastRewardTimestamp) {
            return;
        }

        let lpSupply: Int = tokenBalance;

        if (lpSupply == 0 || allocPoint == 0) {
            lastRewardTimestamp = now();
            return;
        }

        uint256 multiplier = now() - lastRewardTimestamp;
        uint256 reward = multiplier * rewardPerTimestamp;

        self.mint(myAddress(), reward);

        accTokenPerShare = accTokenPerShare + reward * pow(10,12) / lpSupply;
        lastRewardBlock = now();
    }
 
    receive(msg: Stake) {
        updatePool();
        let user: UserInfo = self.userInfo.get(context().sender);

        if (user.amount > 0) {
            let pending: Int = user.amount * accTokenPerShare / pow(10,12) - user.rewardDebt;
            if (pending > 0) {
                let init: StateInit = initOf JettonDefaultWallet(self.rewardToken, context().sender);
                let walletAddress: Address = contractAddress(init);
                send(SendParameters{
                    to: walletAddress, 
                    value: 0,
                    mode: SendRemainingValue, 
                    bounce: true,
                    body: TokenTransferInternal{
                        amount: pending,
                        queryId: randomInt(),
                        from: myAddress(),
                        responseAddress: myAddress(),
                        forwardTonAmount: msg.forwardTonAmount,
                        forwardPayload: msg.forwardPayload
                    }.toCell(),
                    code: init.code,
                    data: init.data
                });
            }
        }

        if (msg.amount > 0) {
            // Transfer From User to Contract. need to figure out
            user.amount = user.amount - msg.amount;
            tokenBalance = tokenBalance + msg.amount;
        }

        user.rewardDebt = user.amount * accTokenPerShare / pow(10,12);
    }
 
    receive(msg: Withdraw) {
        let user: UserInfo = self.userInfo.get(context().sender);
        require(user.amount >= msg.amount, "withdraw: not good");

        updatePool();

        let pending: Int = user.amount * accTokenPerShare / pow(10,12) - user.rewardDebt;

        if (pending > 0) {
            let init: StateInit = initOf JettonDefaultWallet(self.rewardToken, context().sender);
            let walletAddress: Address = contractAddress(init);
            send(SendParameters{
                to: walletAddress, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: true,
                body: TokenTransferInternal{
                    amount: pending,
                    queryId: randomInt(),
                    from: myAddress(),
                    responseAddress: myAddress(),
                    forwardTonAmount: msg.forwardTonAmount,
                    forwardPayload: msg.forwardPayload
                }.toCell(),
                code: init.code,
                data: init.data
            });
        }

        if (msg.amount > 0) {
            user.amount = user.amount - msg.amount;
            tokenBalance = tokenBalance - msg.amount;

            let init: StateInit = initOf JettonDefaultWallet(self.token_minter, context().sender);
            let walletAddress: Address = contractAddress(init);
            send(SendParameters{
                to: walletAddress, 
                value: 0,
                mode: SendRemainingValue, 
                bounce: true,
                body: TokenTransferInternal{
                    amount: msg.amount,
                    queryId: randomInt(),
                    from: myAddress(),
                    responseAddress: myAddress(),
                    forwardTonAmount: msg.forwardTonAmount,
                    forwardPayload: msg.forwardPayload
                }.toCell(),
                code: init.code,
                data: init.data
            });
        }

        user.rewardDebt = user.amount * accTokenPerShare / pow(10,12);
    }

    receive(msg: EmergencyWithdraw) {
        let user: UserInfo = self.userInfo.get(context().sender);
        let amount: Int = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;

        let init: StateInit = initOf JettonDefaultWallet(self.token_minter, context().sender);
        let walletAddress: Address = contractAddress(init);
        send(SendParameters{
            to: walletAddress, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: true,
            body: TokenTransferInternal{
                amount: amount,
                queryId: randomInt(),
                from: myAddress(),
                responseAddress: myAddress(),
                forwardTonAmount: msg.forwardTonAmount,
                forwardPayload: msg.forwardPayload
            }.toCell(),
            code: init.code,
            data: init.data
        });
    }
}