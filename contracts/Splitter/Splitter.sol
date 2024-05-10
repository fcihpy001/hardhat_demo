// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Splitter {

    // 参与分成的收益者
    address[] private payees;
    // 总份额
    uint256 public constant totalShares = 9;
    // 合约代币地址
    IERC20 public USDT;
    // 每个受益者所占比例
    uint256[] public  shares = [3,3,3];
   

    // 记录每个受益者的额度
    mapping(address => uint256) public incomes; 

    // 合约收到代币的事件
    event Received(address indexed payer, uint256 amount);
    // 分账提现事件
    event Withdraw(address from, uint256 amount);
    event Fallback(address Sender, uint Value, bytes Data);
    event Buy(address from,uint256 amount);

    constructor() {
        // 添加参与分成的收益者
        payees.push(0xC29f164024e971e26da16559Cba4C9318bA79d34);
        payees.push(0x08e8612596C00eAF8D95De794Ebc8a4b03666666);
        payees.push(0x3E5e45778Dc9221Bcf17cb3ff3dc5df4aD884A4E);

        // 初始化合约地址
        USDT = IERC20(0x69e50D407AdA65aBC34A02c2fe40B43D3a3AA150);
    }

    // 收到eth的事件
    receive() external payable {
        emit Received(msg.sender, msg.value);
    
    }

    // 回退函数，兜底处理
    fallback() external payable {
        emit Fallback(msg.sender, msg.value,msg.data);
    }

    function buy(uint256 amount) public {

        USDT.transferFrom(msg.sender, address(this), amount);
        emit Buy(msg.sender, amount);
    }

    // 获取合约当前余额
    function totalBalance() public view returns (uint256){
        return USDT.balanceOf(address(this));
    }

    // 提现操作
    function withdraw() external  {
        // 校验用户是否为合法的受益者
        require(isPayee(msg.sender),'Splitter: not payee');

        // 合约余额
        uint256 _totalBalance = totalBalance();

        // 池子余额大于0,则进行分账
        if (_totalBalance > 0) {
            // 开始向各个账户转账
            for (uint256 i = 0; i < payees.length; i++) {
                // 计算每个账户应得额度,总收入 / 总份额 * 每个账户应得份额
                uint256 amount = _totalBalance / totalShares * shares[i];
                
                // 给每个账户累加收益
                address payee = payees[i];
                incomes[payee] += amount;
    
            }
             // 总余额减小
             _totalBalance = 0;
        }
        uint256 income = incomes[msg.sender];
        // 获取账户应得数量
        USDT.transfer(msg.sender, income);
        // 分账事件
        emit Withdraw(msg.sender, income);
    }

    function isPayee(address _target) private view returns (bool) {
        for (uint256 i = 0; i < payees.length; i++) {
            if (payees[i] == _target) {
                return true;
            }
        }
        return false;
    }
}