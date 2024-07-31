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
  const [strength, setStrength] = useState('');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const calculateStrength = (password: string, options: any) => {
    let score = 0;
    
    // Length contribution
    if (password.length < 10) score -= 4    
    else if (password.length >= 12) score += 3;
    else if (password.length >= 8) score += 2;
    else if (password.length >= 6) score += 1;

    // Character type contribution
    if (options.lowercase) score += 1;
    if (options.uppercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 1;

    // Determine strength based on score
    if (score >= 6) return 'very strong';
    if (score >= 4) return 'strong';
    if (score >= 3) return 'moderate';
    if (score >= 2) return 'weak';
    return 'very weak';
  };

  useEffect(() => {
    const genPassword = generatePassword(
      length,
      options.uppercase,
      options.lowercase,
      options.numbers,
      options.symbols
    );
    setPassword(genPassword);
    setStrength(calculateStrength(genPassword, options));
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
    setStrength(calculateStrength(genPassword, options));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast("Password copied to clipboard");
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-screen">
      <div className="border border-gray-600 rounded-lg p-8 mt-16">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Password Generator
        </h1>
        <h2 className={`text-center pb-4 font-semibold text-sm ${
          strength === 'very weak' ? 'text-red-600' : 
          strength === 'weak' ? 'text-orange-500' :
          strength === 'moderate' ? 'text-yellow-500' :
          strength === 'strong' ? 'text-blue-500' : 'text-green-500'
        }`}>
          {strength}
        </h2>
        
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={password}
              readOnly
              className="w-full text-center font-mono text-lg pr-12"
              placeholder="Your password will appear here"
            />
            <Button
              onClick={copyToClipboard}
              className="absolute right-0 top-0 h-full px-3"
              aria-label="Copy password">
              <MdContentCopy size={20} />
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2 text-gray-700 dark:text-gray-300">
              Password Length: {length}
            </label>
            <Slider
              value={[length]}
              onValueChange={([value]) => setLength(value)}
              max={32}
              min={4}
              step={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label htmlFor={key} className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
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

          <Button onClick={handleGeneratePassword} className="w-full">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;