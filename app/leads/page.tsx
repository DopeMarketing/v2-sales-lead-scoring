import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function LeadsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // TODO: Fetch leads with filtering and pagination
  // TODO: Get lead scores and tags for each lead
  // TODO: Load current user assignments and permissions
  // TODO: Fetch available tags for filtering
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <p className="mt-2 text-gray-600">Manage and track all sales leads</p>
      </div>
      
      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <select className="border border-gray-300 rounded px-3 py-2">
              <option>All Scores</option>
              <option>High (80-100)</option>
              <option>Medium (50-79)</option>
              <option>Low (0-49)</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-2">
              <option>All Status</option>
              <option>Unassigned</option>
              <option>Assigned</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>
            <input type="text" placeholder="Search leads..." className="border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Bulk Actions
            </button>
            <a href="/leads/import" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Import Leads
            </a>
          </div>
        </div>
      </div>
      
      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Loading leads...</div>
                    <div className="text-sm text-gray-500">Please wait</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">-</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Loading</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}