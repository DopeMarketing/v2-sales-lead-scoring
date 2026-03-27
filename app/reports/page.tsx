import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function ReportsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // TODO: Fetch performance analytics and metrics
  // TODO: Get score trend data for charts
  // TODO: Load conversion metrics by score tier
  // TODO: Fetch sales rep performance data
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="mt-2 text-gray-600">Lead scoring performance and sales analytics</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Conversion Rate</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">23.4%</p>
          <p className="text-sm text-gray-500 mt-1">+2.3% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Avg Deal Size</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">$12,450</p>
          <p className="text-sm text-gray-500 mt-1">+5.7% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">High Score ROI</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">340%</p>
          <p className="text-sm text-gray-500 mt-1">80+ score leads</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Response Time</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">12min</p>
          <p className="text-sm text-gray-500 mt-1">Avg first response</p>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Score Distribution</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart: Lead score distribution</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversion Trends</h2>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart: Monthly conversion rates</p>
          </div>
        </div>
      </div>
      
      {/* Sales Rep Performance */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Sales Rep Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rep</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Converted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Loading performance data...</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Export Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Reports</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export to Google Drive
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Download CSV
          </button>
          <a href="/reports/builder" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Custom Report Builder
          </a>
        </div>
      </div>
    </div>
  )
}