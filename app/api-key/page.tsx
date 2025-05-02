"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Copy, Check, Key } from "lucide-react"

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate a random API key for demonstration purposes
  // In a real app, this would be securely generated and stored
  useEffect(() => {
    const generateRandomKey = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      let result = ""
      for (let i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      return result
    }

    setApiKey(generateRandomKey())
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" /> API Key Information
          </CardTitle>
          <CardDescription>Use this API key to authenticate your requests to the Emoji Generator API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Your API Key</Label>
            <div className="flex">
              <Input id="apiKey" value={apiKey} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" className="ml-2" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Keep this key secret. In a production environment, you would securely store this key.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">How to use this API key</h3>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-mono">
                Include the API key in your requests with the <span className="text-primary">X-API-KEY</span> header
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="default" className="w-full" onClick={() => (window.location.href = "/")}>
              Go to Emoji Generator
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
