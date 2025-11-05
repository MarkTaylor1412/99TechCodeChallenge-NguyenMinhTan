type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  blockchain: Blockchain;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formattedAmount: string;
  usdValue: number;
}

interface Props extends BoxProps {}

//! Replaced switch with a map for cleaner code
const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain) => PRIORITY_MAP[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props) => {
  const { ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  //! Combined filter + sort + map in one useMemo
  //! Original code filtered then sorted separately, recalculating priority multiple times
  const rowsData: FormattedWalletBalance[] = useMemo(
    () =>
      balances
        .filter((b) => b.amount > 0 && getPriority(b.blockchain) > -99)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
        .map((b) => ({
          ...b,
          formattedAmount: b.amount.toFixed(),
          usdValue: (prices[b.currency] ?? 0) * b.amount,
        })),
    [balances, prices]
  );

  //! Used unique key instead of index
  return (
    <div {...rest}>
      {rowsData.map((balance) => (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formattedAmount}
        />
      ))}
    </div>
  );
};

export default WalletPage;
