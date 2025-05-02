"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/emoji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Toast d'erreur en anglais
        toast({
          title: "Error",
          description: data.error
            ? `Error: ${data.error}`
            : "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        throw new Error(data.error || "An error occurred");
      }

      setResult(data.emoji);
      toast({
        title: "Success!",
        description: "Emoji generated successfully",
      });
    } catch (error) {
      // Toast d'erreur en anglais
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? `Error: ${error.message}`
            : "Failed to process request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Documentation Section */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span role="img" aria-label="dart">
                🎯
              </span>{" "}
              Emoji Finder API
            </CardTitle>
            <CardDescription>
              An API to find a relevant emoji from a sentence in any language.
              <br />
              Powered by <b>GROQ</b> using the <b>LLaMA 3.1 8B Instant</b>{" "}
              model.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <span role="img" aria-label="rocket">
                  🚀
                </span>{" "}
                Demo
              </h3>
              <a
                href="https://emojiefinder.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                👉 Demo Site
              </a>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <span role="img" aria-label="sparkles">
                  ✨
                </span>{" "}
                Features
              </h3>
              <ul className="list-disc list-inside text-sm ml-4">
                <li>Generate emojis from multilingual text.</li>
                <li>Secure authentication via API key.</li>
                <li>Simple web interface to quickly test the API.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <span role="img" aria-label="tools">
                  🛠️
                </span>{" "}
                Installation
              </h3>
              <pre className="bg-muted rounded p-2 text-xs overflow-x-auto mt-1">
                <code>
                  {`git clone <repo-url>
cd emojie-api
cp env.example .env
# Edit the environment variables in the .env file
npm install
npm run dev`}
                </code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <span role="img" aria-label="package">
                  📦
                </span>{" "}
                Usage
              </h3>
              <div className="mb-2">
                <span className="font-medium">1. From the web interface:</span>
                <span className="ml-2">
                  <a
                    href="http://localhost:3000"
                    className="text-primary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://localhost:3000
                  </a>
                </span>
              </div>
              <div>
                <span className="font-medium">2. From an API request:</span>
                <pre className="bg-background rounded p-2 text-xs overflow-x-auto mt-1">
                  <code>
                    {`curl -X POST http://localhost:3000/api/emojie \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_SECRET_API_KEY" \\
  -d '{"text": "Your text"}'`}
                  </code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Form */}
        <Card className="w-full md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>Emoji Generator API</CardTitle>
            <CardDescription>
              Enter text in any language to generate a relevant emoji
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Your Text</Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text in any language"
                  required
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Generate Emoji"
                )}
              </Button>
            </form>
          </CardContent>
          {result && (
            <CardFooter className="flex flex-col items-center">
              <div className="text-6xl my-4">{result}</div>
              <p className="text-sm text-muted-foreground">
                Generated emoji based on your input
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  );
}
