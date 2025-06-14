import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

const Homepage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-slate-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-consultant-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">GM</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">GrantMate Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="shadow-sm">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find & Win More Grants
            <span className="text-consultant-blue"> with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Discover relevant funding opportunities and write winning applications faster. 
            <strong className="text-gray-900"> Try our grant search free</strong> - no signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-4 shadow-md">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    View Components
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/search">
                  <Button size="lg" className="text-lg px-10 py-5 shadow-lg bg-gradient-to-r from-consultant-blue to-consultant-blue/90 hover:from-consultant-blue/90 hover:to-consultant-blue/80 transform hover:scale-[1.02] transition-all duration-200">
                    🔍 Find Your Grant
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-consultant-blue text-consultant-blue hover:bg-consultant-blue hover:text-white">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="ghost" size="lg" className="text-lg px-8 py-4 text-gray-600 hover:text-gray-900">
                    View Components
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Demo Preview */}
        <div className="bg-slate-bg rounded-2xl p-8 max-w-6xl mx-auto border border-slate-border">
          <div className="bg-white rounded-xl shadow-sm border border-slate-border h-96 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-consultant-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-consultant-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Demo</h3>
                <p className="text-gray-500 mb-4">Experience the complete grant writing workflow</p>
                <Link to="/demo">
                  <Button variant="outline" className="shadow-sm">
                    Explore Components
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-bg py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Win More Grants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tools designed specifically for grant consultants and their unique workflow
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-slate-border bg-white hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-consultant-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-consultant-blue/20 transition-colors">
                  <svg className="w-6 h-6 text-consultant-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Client Dashboard</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Organize and manage multiple clients and their grant applications in one professional workspace.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-border bg-white hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-success-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-success-green/20 transition-colors">
                  <svg className="w-6 h-6 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">AI Application Writer</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Smart wizard asks the right questions and generates professional draft sections with AI assistance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-border bg-white hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Grant Finder</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  AI-powered grant discovery to find perfect funding opportunities for your clients.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-8">Trusted by grant consultants across the country</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for client logos */}
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your consulting practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-slate-border bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    2 active clients
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    5 applications per month
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Basic AI assistance
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email support
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-consultant-blue border-2 bg-white relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-consultant-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl">Professional</CardTitle>
                <CardDescription>Most popular for consultants</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited clients
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited applications
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced AI features
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Grant finder access
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6 shadow-md">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-border bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <CardDescription>For larger consulting firms</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Everything in Professional
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Client portal access
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Dedicated support
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-consultant-blue py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Grant Writing Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join grant consultants who are already winning more grants with GrantMate Pro.
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-lg">
                Go to Your Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-lg">
                Start Your Free Trial Today
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-9 h-9 bg-consultant-blue rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GM</span>
                </div>
                <span className="text-xl font-semibold">GrantMate Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI-powered grant writing assistance designed for professional consultants and firms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GrantMate Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage; 