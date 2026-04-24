'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface BarcodeScannerProps {
  onScan: (result: string) => void
  onError?: (error: string) => void
}

export function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  const startScanning = () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      )
    }

    scannerRef.current.render(
      (decodedText) => {
        onScan(decodedText)
        stopScanning()
      },
      (errorMessage) => {
        if (onError) {
          onError(errorMessage)
        }
      }
    )

    setIsScanning(true)
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error)
    }
    setIsScanning(false)
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
      }
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Barcode Scanner</CardTitle>
        <CardDescription>
          Scan drug barcodes to quickly find or add items
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning ? (
          <div className="text-center py-8">
            <Button onClick={startScanning} className="mb-4">
              Start Scanning
            </Button>
            <p className="text-sm text-muted-foreground">
              Click to start barcode scanning
            </p>
          </div>
        ) : (
          <div>
            <div id="qr-reader" className="w-full max-w-md mx-auto mb-4" />
            <div className="flex justify-center">
              <Button onClick={stopScanning} variant="outline">
                Stop Scanning
              </Button>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          <p>• Ensure good lighting</p>
          <p>• Hold camera steady</p>
          <p>• Keep barcode within the scanning area</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Hook for using barcode scanner
export function useBarcodeScanner() {
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = (result: string) => {
    setScannedCode(result)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const reset = () => {
    setScannedCode(null)
    setError(null)
  }

  return {
    scannedCode,
    error,
    handleScan,
    handleError,
    reset,
  }
}
