import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // TODO: Fetch lead metrics and scores from database
  // TODO: Fetch recent leads with pagination
  // TODO: Get score distribution data for chart
  // TODO: Load user assignments and permissions
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Lead scoring overview and quick actions</p>
      </div>
      
      {/* Lead Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Leads</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">High Score Leads</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">89</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Assigned Today</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">34</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Conversion Rate</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">23%</p>
        </div>
      </div>
      
      {/* Recent Leads Table */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Loading...</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/leads/import" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Import Leads
          </a>
          <a href="/assignments/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Assign Leads
          </a>
          <a href="/scoring/test" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Test Scoring
          </a>
        </div>
      </div>
    </div>
  )
}