import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, Trash } from "lucide-react";
import { CURRENCIES } from "@/constants";
import clsx from "clsx";
import { toast } from "sonner";

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [amount, setAmount] = useState("");
  const [exchangedAmount, setExchangedAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const amountRef = useRef<HTMLInputElement | null>(null);

  //! Handle swap logic
  const handleSwap = () => {
    //! Ensure both currencies are selected
    if (!fromCurrency || !toCurrency) {
      toast.error("Please select both currencies before swapping.");
      return;
    }

    if (!exchangeRate) return;

    //! Invert the exchange rate when swapping
    const swappedRate = 1 / exchangeRate;

    //! Swap currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    //! Swap amounts
    setAmount(exchangedAmount);
    setExchangedAmount(amount);

    //! Apply new swapped rate
    setExchangeRate(swappedRate);

    amountRef.current?.focus();
  };

  //! Handle conversion logic
  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency) return;

    //! Prevent identical currencies are selected
    if (fromCurrency === toCurrency) {
      toast.warning("Cannot convert the same currency!");
      return;
    }

    const fromData = CURRENCIES.find((c) => c.currency === fromCurrency);

    const toData = CURRENCIES.find((c) => c.currency === toCurrency);

    if (!fromData || !toData) return;

    setIsLoading(true);

    //! Simulate API delay (for loading feedback)
    setTimeout(() => {
      const rate = fromData.price / toData.price;
      const result = Number(amount) * rate || 0;

      setExchangedAmount(result.toFixed(6));

      setExchangeRate(rate);

      setIsLoading(false);

      //! Notification or toast for successful conversion
      toast.success(
        `${amount} ${fromCurrency} → ${result.toFixed(6)} ${toCurrency}`
      );
    }, 800);
  };

  //! Handle clear logic
  const handleClear = () => {
    setVisible(false);

    setTimeout(() => {
      setAmount("");
      setExchangedAmount("");
      setExchangeRate(null);
      amountRef.current?.focus();
    }, 300);
  };

  //! Focus on input
  useEffect(() => {
    if (!isLoading) amountRef.current?.focus();
  }, [isLoading]);

  //! Support fade animations when exchange rate is shown
  useEffect(() => {
    if (exchangeRate !== null) setVisible(true);
  }, [exchangeRate]);

  return (
    <Card className="flex flex-col items-center justify-center w-full max-w-lg gap-4 p-6 shadow-md shadow-primary rounded-2xl">
      <CardHeader className="w-full p-0 mb-4 text-center">
        <CardTitle className="text-3xl font-bold">Crypto Converter</CardTitle>
        <p className="text-sm text-muted-foreground">
          Effortless crypto conversion.
        </p>
      </CardHeader>

      <CardContent className="grid w-full grid-rows-3 gap-6 p-2">
        {/* //? CURRENCIES SWAP  */}
        <div className="relative flex flex-row items-center justify-between w-full gap-6">
          {/*//? SWAP BUTTON */}
          <div className="absolute z-10 transform -translate-x-1/2 translate-y-2 left-1/2 top-2">
            <Button
              aria-label="Swap currencies"
              className="rounded-full button-base size-12 hover:bg-accent hover:rotate-180 hover:scale-110"
              onClick={handleSwap}
            >
              <ArrowRightLeft />
            </Button>
          </div>

          {/*//? FROM */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem
                    key={currency.currency}
                    value={currency.currency}
                    className="flex flex-row"
                  >
                    {currency.icon ? (
                      <img
                        src={currency.icon}
                        alt={currency.currency}
                        className="inline w-4 h-4 mr-2"
                      />
                    ) : null}

                    <span>{currency.currency}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/*//? TO */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="toCurrency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem
                    key={currency.currency}
                    value={currency.currency}
                    className="flex flex-row"
                  >
                    {currency.icon ? (
                      <img
                        src={currency.icon}
                        alt={currency.currency}
                        className="w-4 h-4 mr-2"
                      />
                    ) : null}

                    <span>{currency.currency}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/*//? AMOUNT */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            ref={amountRef}
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min={0}
            step="0.01"
            disabled={isLoading}
          />
        </div>

        {/*//? EXCHANGED AMOUNT */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="exchangedAmount">Exchanged Amount</Label>
          <Input
            id="exchangedAmount"
            type="text"
            value={exchangedAmount}
            readOnly
            placeholder="Exchanged amount"
          />
        </div>

        {exchangeRate !== null && (
          <div className="flex flex-row items-center justify-between w-full gap-3">
            {/*//? EXCHANGE RATE */}
            <span
              key={String(exchangeRate)}
              className={clsx(
                "text-sm text-muted-foreground/70",
                visible ? "animate-fade-in" : "animate-fade-out"
              )}
            >
              {1} {fromCurrency} ≈ {exchangeRate.toFixed(6)} {toCurrency}
            </span>

            {/*//? CLEAR BUTTON */}
            <Button
              className={clsx(
                "button-base size-8 bg-destructive hover:bg-accent hover:scale-110",
                visible ? "animate-fade-in" : "animate-fade-out"
              )}
              onClick={handleClear}
              disabled={isLoading}
            >
              <Trash />
            </Button>
          </div>
        )}

        {/*//? CONVERT BUTTON */}
        <Button
          className="w-full button-base hover:bg-accent"
          onClick={handleConvert}
          disabled={
            !fromCurrency ||
            !toCurrency ||
            !amount ||
            Number(amount) <= 0 ||
            isLoading
          }
        >
          {isLoading ? (
            <>
              Converting
              <span className="delay-75 animate-bounce ">.</span>
              <span className="delay-150 animate-bounce">.</span>
              <span className="delay-300 animate-bounce">.</span>
            </>
          ) : (
            "Convert"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConverterForm;
