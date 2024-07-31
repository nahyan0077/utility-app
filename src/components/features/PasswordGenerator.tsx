import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { MdContentCopy } from "react-icons/md";
import { generatePassword } from "@/utils/generatePassword";

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  useEffect(() => {
    const genPassword = generatePassword(
      length,
      options.uppercase,
      options.lowercase,
      options.numbers,
      options.symbols
    );
    setPassword(genPassword);
  }, [length, options]);

  const handleOptionChange = (option: keyof typeof options) => {
    const isOnlyOneEnabled = Object.values(options).filter(Boolean).length === 1;

    if (isOnlyOneEnabled && options[option]) {

      toast("At least one option must be selected");
      return;
    }

    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleGeneratePassword = () => {
    const genPassword = generatePassword(
      length,
      options.uppercase,
      options.lowercase,
      options.numbers,
      options.symbols
    );

    setPassword(genPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast("Password copied to clipboard");
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Password Generator</h1>

      <div className="flex flex-col space-y-6 justify-center items-center">
        <div className="w-full space-y-2">
          <div className="relative">
            <Input
              type="text"
              value={password}
              readOnly
              className="w-full text-center font-mono text-xl"
              placeholder="Your password will appear here"
            />
            <Button
              onClick={copyToClipboard}
              className="absolute right-0 top-0 h-full px-4"
            >
              <MdContentCopy size={20} />
            </Button>
          </div>
        </div>

        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Password Length: {length}</label>
          <Slider
            value={[length]}
            onValueChange={([value]) => setLength(value)}
            max={32}
            min={4}
            step={1}
          />
        </div>

        <div className="w-full space-y-4">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label htmlFor={key} className="text-sm font-medium capitalize">
                {key}
              </label>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={() => handleOptionChange(key as keyof typeof options)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button onClick={handleGeneratePassword} className="w-full mt-4">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
