export const TO_DO_CONTRACT_ADDRESS =
  '0x7053270073C993724D25CF9C80127E8b07DB8d40';

export const TO_DO_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'taskCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tasks',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'remind',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'start_time',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'end_time',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'completed',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'owner_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'owner_email',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_content',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_start_time',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_end_time',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_owner_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_owner_email',
        type: 'string',
      },
    ],
    name: 'createTasks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
