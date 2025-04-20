
import { Token, Transaction, TransactionStatus, TransactionType, WalletInfo } from "@/types";

// Mock token list with logos and data
export const mockTokens: Token[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    decimals: 18,
    balance: "1.5263",
    price: 2845.23,
    priceChange24h: 3.5,
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    decimals: 8,
    balance: "0.0358",
    price: 56231.42,
    priceChange24h: 2.1,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    decimals: 6,
    balance: "523.67",
    price: 1.0,
    priceChange24h: 0.01,
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    decimals: 6,
    balance: "745.21",
    price: 1.0,
    priceChange24h: 0.0,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    decimals: 9,
    balance: "12.431",
    price: 102.38,
    priceChange24h: 5.7,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    decimals: 6,
    balance: "452.16",
    price: 0.55,
    priceChange24h: -1.2,
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    decimals: 18,
    balance: "3.482",
    price: 304.12,
    priceChange24h: 0.8,
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "Ripple",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    decimals: 6,
    balance: "1250.32",
    price: 0.59,
    priceChange24h: -0.5,
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: TransactionType.SWAP,
    fromToken: mockTokens[0],
    toToken: mockTokens[2],
    fromAmount: "0.5",
    toAmount: "1423.45",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    hash: "0x1234...5678",
    status: TransactionStatus.COMPLETED,
    account: "0xabc...def",
  },
  {
    id: "tx2",
    type: TransactionType.SEND,
    fromToken: mockTokens[2],
    fromAmount: "100",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    hash: "0x2345...6789",
    status: TransactionStatus.COMPLETED,
    account: "0xabc...def",
  },
  {
    id: "tx3",
    type: TransactionType.RECEIVE,
    toToken: mockTokens[1],
    toAmount: "0.01",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    hash: "0x3456...7890",
    status: TransactionStatus.COMPLETED,
    account: "0xabc...def",
  },
  {
    id: "tx4",
    type: TransactionType.SWAP,
    fromToken: mockTokens[3],
    toToken: mockTokens[4],
    fromAmount: "250",
    toAmount: "2.47",
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    hash: "0x4567...8901",
    status: TransactionStatus.COMPLETED,
    account: "0xabc...def",
  },
  {
    id: "tx5",
    type: TransactionType.APPROVE,
    fromToken: mockTokens[5],
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    hash: "0x5678...9012",
    status: TransactionStatus.COMPLETED,
    account: "0xabc...def",
  },
  {
    id: "tx6",
    type: TransactionType.SWAP,
    fromToken: mockTokens[4],
    toToken: mockTokens[6],
    fromAmount: "5.3",
    toAmount: "0.53",
    timestamp: Date.now() - 30 * 60 * 1000,
    hash: "0x6789...0123",
    status: TransactionStatus.PENDING,
    account: "0xabc...def",
  },
];

// Mock wallet data
export const mockWallet: WalletInfo = {
  address: "0xabc...def",
  name: "Main Wallet",
  balance: "5246.32",
  tokens: mockTokens,
};

// Helper to calculate total balance
export const calculateTotalBalance = (tokens: Token[]): number => {
  return tokens.reduce((acc, token) => {
    return acc + (parseFloat(token.balance || "0") * (token.price || 0));
  }, 0);
};

// Helper to format currency with proper commas and decimal places
export const formatCurrency = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Helper to format an address with ellipsis
export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

// Generate mock chart data (simple random values)
export const generateChartData = (days = 7, startPrice = 100): number[][] => {
  const data: number[][] = [];
  let currentPrice = startPrice;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Random price change percentage between -5% and +5%
    const changePercent = (Math.random() * 10) - 5;
    currentPrice = currentPrice * (1 + (changePercent / 100));
    
    data.push([date.getTime(), currentPrice]);
  }
  
  return data;
};

// Calculate swap estimates
export const calculateSwapEstimate = (
  fromToken: Token | null,
  toToken: Token | null,
  amount: string
): { toAmount: string; priceImpact: number } => {
  if (!fromToken || !toToken || !amount || isNaN(parseFloat(amount))) {
    return { toAmount: "0", priceImpact: 0 };
  }
  
  const fromPrice = fromToken.price || 0;
  const toPrice = toToken.price || 1;
  
  // Simple conversion based on price
  const fromValue = parseFloat(amount) * fromPrice;
  const toAmount = (fromValue / toPrice).toFixed(toToken.decimals > 6 ? 6 : toToken.decimals);
  
  // Mock price impact (higher for larger trades)
  const priceImpact = Math.min(parseFloat(amount) * 0.002, 5);
  
  return { toAmount, priceImpact };
};
