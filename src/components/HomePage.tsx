import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'generator' | 'result') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-[#4A90E2] p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-[#333]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                RuralMarket.AI
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => {}}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('generator')}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Generate
              </button>
              <button 
                onClick={() => {}}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={() => onNavigate('generator')}
              className="md:hidden text-[#4A90E2]"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMG1hcmtldCUyMHZlbmRvcnN8ZW58MXx8fHwxNzYyNjYwMjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            filter: 'blur(3px)',
          }}
        >
          <div className="absolute inset-0 bg-white/80" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 py-24 sm:py-32 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="max-w-4xl text-center space-y-8">
            {/* Main Title */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl text-[#333] mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Sell Smart, Sell Beautiful.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#333] max-w-2xl mx-auto leading-relaxed">
              RuralMarket.AI helps small sellers generate attractive online listings in seconds using AI.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                onClick={() => onNavigate('generator')}
                className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-12 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Start Now
              </Button>
            </div>

            {/* Additional info */}
            <p className="text-sm text-gray-600 pt-4">
              Free to use • No registration required • AI-powered
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 RuralMarket.AI – Empowering Rural Entrepreneurs with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
