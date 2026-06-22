'use client'

import { Navbar } from '@/components/ui/Navbar'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { ArrowRight, BookOpen, Code, Zap } from 'lucide-react'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-default-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance">
              {SITE_NAME}
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Authentication Guide
              </span>
            </h1>
            
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto text-balance">
              {SITE_DESCRIPTION}
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                as={Link}
                href="/docs/getting-started"
                className='bg-primary text-white px-[10px] py-2.5 rounded-lg'
                size="lg"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Get Started
              </Button>
              <Button
                as={Link}
                href="/docs/installation"
                variant="bordered"
                size="lg"
              >
                View Docs
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-divider hover:bg-default-50 transition-colors">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
            <p className="text-foreground-600">
              Get up and running with Supabase authentication in minutes with our step-by-step guide.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-divider hover:bg-default-50 transition-colors">
            <Code className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Code Examples</h3>
            <p className="text-foreground-600">
              Learn from practical, production-ready code examples for every authentication scenario.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-divider hover:bg-default-50 transition-colors">
            <BookOpen className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Comprehensive</h3>
            <p className="text-foreground-600">
              Everything from basic login to advanced topics like OAuth and session persistence.
            </p>
          </div>
        </section>

        {/* Topics Preview */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">What You&apos;ll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Project Setup', desc: 'Environment variables and project structure' },
              { title: 'Authentication', desc: 'Email, password, and OAuth implementation' },
              { title: 'Sessions', desc: 'User session management and persistence' },
              { title: 'Security', desc: 'Protected routes and best practices' },
              { title: 'Real-world Examples', desc: 'Login, register, and profile components' },
              { title: 'Advanced Topics', desc: 'Multi-factor auth and role-based access' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-default-100 border border-default-200">
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-foreground-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn?</h2>
          <p className="text-lg text-foreground-600 mb-8">
            Start with the basics and progress to advanced authentication patterns.
          </p>
          <Button
            as={Link}
            href="/docs/getting-started"
            className='bg-primary text-white px-[10px] py-2.5 rounded-lg'
            size="lg"
            endContent={<ArrowRight className="w-5 h-5" />}
          >
            Begin Learning
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-divider bg-default-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-foreground-600 text-sm">
          <p>© 2026 Supabase & React.js Documentation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
