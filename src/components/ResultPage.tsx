import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Copy, Download, RefreshCw, Check } from 'lucide-react';
import { GeneratedListing } from '../App';
import { toast } from 'sonner@2.0.3';

interface ResultPageProps {
  listing: GeneratedListing;
  productImage?: string;
  onGenerateAgain: () => void;
  onNavigate: (page: 'home' | 'generator' | 'result') => void;
}

export function ResultPage({ listing, productImage, onGenerateAgain, onNavigate }: ResultPageProps) {
  const [copied, setCopied] = useState(false);

  const fullListingText = `${listing.title}

${listing.description}

${listing.hashtags.join(' ')}

Price: ${listing.price}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(fullListingText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([fullListingText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-listing.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#4A90E2] p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-[#333]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                RuralMarket.AI
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Home
              </button>
              <button className="text-[#333] hover:text-[#4A90E2] transition-colors">About</button>
              <button 
                onClick={() => onNavigate('generator')}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Generate
              </button>
              <button className="text-[#333] hover:text-[#4A90E2] transition-colors">Contact</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D8EEFF] rounded-full mb-4">
            <Check className="w-8 h-8 text-[#4A90E2]" />
          </div>
          <h1 className="text-4xl sm:text-5xl text-[#333] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your AI-Generated Listing
          </h1>
          <div className="h-1 w-20 bg-[#4A90E2] rounded-full mx-auto mt-4" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button
            onClick={handleCopyText}
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <span className="mr-2">📋</span>
                Copy Text
              </>
            )}
          </Button>

          <Button
            onClick={handleDownloadTxt}
            className="bg-white hover:bg-gray-50 text-[#4A90E2] border-2 border-[#4A90E2] px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Result
          </Button>
        </div>

        {/* Result Display */}
        <div className={`grid ${productImage ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
          {/* Product Image (if available) */}
          {productImage && (
            <div className="lg:col-span-1">
              <Card className="p-4 rounded-2xl shadow-md border-2 border-gray-100">
                <img
                  src={productImage}
                  alt="Product"
                  className="w-full rounded-xl"
                />
              </Card>
            </div>
          )}

          {/* Listing Content */}
          <div className={`${productImage ? 'lg:col-span-2' : 'max-w-4xl mx-auto w-full'}`}>
            <Card className="p-8 rounded-2xl shadow-lg border-2 border-gray-100 space-y-8">
              {/* Product Title */}
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide mb-2 block">
                  Product Title
                </label>
                <h2 className="text-3xl text-[#333]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {listing.title}
                </h2>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide mb-2 block">
                  Description
                </label>
                <div className="text-[#333] whitespace-pre-wrap leading-relaxed">
                  {listing.description}
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide mb-3 block">
                  Hashtags
                </label>
                <div className="text-gray-500">
                  {listing.hashtags.join(' ')}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-gray-500 uppercase tracking-wide mb-2 block">
                  Suggested Price
                </label>
                <div className="text-4xl text-[#4A90E2]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {listing.price}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Generate Again Button */}
        <div className="text-center mt-10">
          <Button
            onClick={onGenerateAgain}
            className="bg-white hover:bg-gray-50 text-[#333] border-2 border-gray-300 px-10 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Again
          </Button>
        </div>

        {/* Tips Card */}
        <Card className="mt-10 p-8 rounded-2xl bg-[#D8EEFF]/30 border-2 border-[#4A90E2]/20">
          <h3 className="text-xl text-[#333] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            💡 Next Steps
          </h3>
          <ul className="space-y-3 text-[#333]">
            <li className="flex items-start gap-3">
              <span className="text-[#4A90E2] mt-1">✓</span>
              <span>Copy the listing text and paste it into your marketplace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4A90E2] mt-1">✓</span>
              <span>Upload your product photo to complete the listing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4A90E2] mt-1">✓</span>
              <span>Share on social media using the generated hashtags</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4A90E2] mt-1">✓</span>
              <span>Adjust the price based on your market and costs</span>
            </li>
          </ul>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 RuralMarket.AI – Empowering Rural Entrepreneurs with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
