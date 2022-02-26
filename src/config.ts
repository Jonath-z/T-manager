export const TO_DO_CONTRACT_ADDRESS =
  '0x38165ca918A60905F2ba6002B2D1c34453CAf165';

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
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
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
        name: 'remind',
        type: 'bool',
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
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'progress',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'userCount',
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
    name: 'users',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'profile',
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
        name: '_title',
        type: 'string',
      },
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
      {
        internalType: 'string',
        name: '_date',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_progress',
        type: 'string',
      },
    ],
    name: 'createTasks',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_profile',
        type: 'string',
      },
    ],
    name: 'createUser',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
];
