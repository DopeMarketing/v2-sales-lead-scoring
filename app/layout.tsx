import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sales Lead Scoring V2',
  description: 'AI-powered lead scoring and management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <h1 className="text-xl font-bold">Lead Scoring V2</h1>
                <div className="flex space-x-4">
                  <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                  <a href="/leads" className="text-gray-600 hover:text-gray-900">Leads</a>
                  <a href="/scoring" className="text-gray-600 hover:text-gray-900">Scoring</a>
                  <a href="/reports" className="text-gray-600 hover:text-gray-900">Reports</a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}