# 🚀 99Tech Code Challenges — Nguyễn Minh Tấn

Welcome to my **99Tech Code Challenge Solutions**, including Problem 1, 2, and 3.

---

# 🧮 Problem 1 — Three Ways to Sum to n

A simple problem exploring different algorithmic approaches to compute the sum of numbers from 1 to _n_.

> ⏰ Duration: ~1 hour

## ⚙️ Tech Stack

- JavaScript
- Node.js

## 💡 Implemented Approaches

### 1. Iterative Approach (Loop)

```js
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
// Time Complexity: O(n)
// Space Complexity: O(1)
```

### 2. Mathematical Formula Approach

```js
var sum_to_n_b = function (n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
};
// Time Complexity: O(1)
// Space Complexity: O(1)
```

### 3. Recursive Approach

```js
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
// Time Complexity: O(n)
// Space Complexity: O(n)
```

### 🧠 Observations

| Method    | Time | Space | Readability       | Notes                       |
| --------- | ---- | ----- | ----------------- | --------------------------- |
| Loop      | O(n) | O(1)  | ✅ Easy           | Efficient for small n       |
| Formula   | O(1) | O(1)  | ✅✅ Clean        | Best overall                |
| Recursion | O(n) | O(n)  | ⚠️ Less practical | Educational but inefficient |

---

# 🪙 Problem 2 — Fancy Form

Crypto Converter — A modern crypto currency converter built with React, TypeScript, and Tailwind CSS.

> ⏰ Duration: ~12 hours

## ⚙️ Tech Stack

- React + TypeScript
- Tailwind CSS
- Shadcn/UI
- Lucide Icons

## 💡 Key Features

- Convert between major cryptocurrencies
- Swap currency pairs instantly
- Form validation
- Toast notifications
- Appealing layout + theme switch
- Fintech-inspired navy blue design

## 🧠 Design Direction

- Deep navy blue palette
- Clean sans-serif typography
- Centered card layout
- Subtle hover & transition effects

## 🚀 Getting Started

```bash
npm install
npm run dev

# Open http://localhost:5173 (Press "o" to open in browser)
```

---

# 🧩 Problem 3 — Messy React

> ⏰ Duration: ~6 hours

A React component with computational inefficiencies and anti-patterns.  
This problem explores performance issues and refactoring opportunities in a wallet balances component.

## ⚙️ Tech Stack

- TypeScript
- Node.js

## 💡 Issues / Anti-Patterns

1. Undefined variable / broken logic — lhsPriority undefined in filter.
2. Repeated function calls in sort — getPriority called multiple times.
3. Multiple map iterations — formattedBalances unused.
4. React key anti-pattern — index as key.
5. Inline function recreated every render.
6. Type safety issues — any type used.
7. Unused destructuring — children extracted but not used.
8. Minor formatting inefficiency — .toFixed() called early.

## 🧠 Refactored Approach

- Move getPriority outside component, define PRIORITY_MAP.
- Combine filtering, sorting, formatting into one useMemo.
- Use unique key for React list.
- Strongly type blockchain.
- Only include necessary dependencies.
- Remove unused variables.

### ✅ Example Refactored Code

```ts
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
```

---

👤 Author: Nguyễn Minh Tấn
