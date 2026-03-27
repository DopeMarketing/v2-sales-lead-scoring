import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function ScoringPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // TODO: Fetch current scoring rules and weights
  // TODO: Get score distribution analytics
  // TODO: Load scoring history and recent changes
  // TODO: Check user permissions for rule editing
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lead Scoring</h1>
        <p className="mt-2 text-gray-600">Configure scoring rules and analytics</p>
      </div>
      
      {/* Scoring Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Rules</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">Domain, Phone, Item scoring</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Avg Score</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">67</p>
          <p className="text-sm text-gray-500 mt-1">Across all leads</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">High Score Rate</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">18%</p>
          <p className="text-sm text-gray-500 mt-1">Leads scoring 80+</p>
        </div>
      </div>
      
      {/* Scoring Rules Configuration */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Scoring Rules</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="border border-gray-200 rounded p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Domain Scoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fortune 500 Domains</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tech Company Domains</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Phone Pattern Scoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Patterns</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Patterns</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Item Request Scoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">High-Value Items</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Orders</label>
                  <input type="number" placeholder="Weight (0-100)" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <a href="/scoring/test" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Test Rules
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}