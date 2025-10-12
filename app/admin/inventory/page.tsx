'use client'

import { useEffect, useState } from 'react'
import { Package, Wrench, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

interface InventoryItem {
  id: string
  packageId: string
  serialNumber: string
  status: string
  condition: string
  lastServiced: string | null
  notes: string | null
  package: {
    id: string
    name: string
  }
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory')
      const data = await res.json()
      setInventory(data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchInventory()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'rented':
        return 'bg-blue-100 text-blue-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'retired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />
      case 'rented':
        return <Package className="h-4 w-4" />
      case 'maintenance':
        return <Wrench className="h-4 w-4" />
      case 'retired':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const filteredInventory = filter === 'all' 
    ? inventory 
    : inventory.filter(item => item.status === filter)

  const statusCounts = {
    all: inventory.length,
    available: inventory.filter(i => i.status === 'available').length,
    rented: inventory.filter(i => i.status === 'rented').length,
    maintenance: inventory.filter(i => i.status === 'maintenance').length,
    retired: inventory.filter(i => i.status === 'retired').length,
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Manage and track all walkie talkie units</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading inventory...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.serialNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.package.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{item.condition}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="available">Available</option>
                          <option value="rented">Rented</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="retired">Retired</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredInventory.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No inventory items found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rented</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.rented}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.maintenance}</p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

