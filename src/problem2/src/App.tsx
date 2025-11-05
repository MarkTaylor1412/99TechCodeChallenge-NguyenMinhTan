import ConverterForm from "./components/custom/ConverterForm";
import ThemeSwitcher from "./components/custom/ThemeSwitcher";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <ConverterForm />

      <div className="absolute top-5 right-5">
        <ThemeSwitcher />
      </div>

      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

export default App;
