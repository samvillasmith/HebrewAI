import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            Hebrew<span className="text-indigo-600">AI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Master Hebrew with{' '}
            <span className="text-indigo-600">AI-Powered Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Go from zero to B1 Hebrew proficiency with personalized AI lessons,
            interactive conversations, and intelligent speech practice.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Start Learning Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">AI Tutor</h3>
            <p className="text-gray-600">
              Get personalized lessons adapted to your learning pace and style with
              GPT-4 powered instruction.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🗣️</div>
            <h3 className="text-xl font-bold mb-3">Speech Practice</h3>
            <p className="text-gray-600">
              Practice pronunciation with real-time feedback and native Hebrew speech
              synthesis.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Structured Curriculum</h3>
            <p className="text-gray-600">
              Follow a proven path from beginner to B1 with lessons built on the CEFR
              framework.
            </p>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mt-20 bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Your Learning Journey</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                A1
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Complete Beginner</h4>
                <p className="text-gray-600">
                  Master the alphabet, basic greetings, and essential vocabulary
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                A2
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Elementary</h4>
                <p className="text-gray-600">
                  Build conversational skills and understand common phrases
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                B1
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Intermediate</h4>
                <p className="text-gray-600">
                  Express yourself confidently in most everyday situations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Hebrew Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands learning Hebrew with AI. Only $30/month.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
