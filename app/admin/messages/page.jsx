"use client"

import { useEffect, useState } from 'react'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'
import { AdminTable } from '@/components/customUi/AdminTable'
import { getMessages } from '@/app/actions/messages'

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setIsLoading(true)
    const res = await getMessages()
    if (res.success) setMessages(res.data)
    setIsLoading(false)
  }

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => <span className="font-medium text-gray-900 dark:text-white">{row.original.name}</span>
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => <span className="text-blue-700 dark:text-blue-300">{row.original.email}</span>
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: ({ row }) => <span>{row.original.subject}</span>
    },
    {
      header: 'Message',
      accessorKey: 'message',
      cell: ({ row }) => (
        <div className="max-w-xs">
          <p className="line-clamp-2 text-gray-700 dark:text-gray-300">{row.original.message}</p>
        </div>
      )
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {new Date(row.original.createdAt).toLocaleString()}
        </span>
      )
    }
  ]

  return (
    <AdminPageWrapper
      breadcrumbItems={[
        { label: 'Admin', href: '/admin' },
        { label: 'Messages' }
      ]}
      title="Contact Messages"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Messages</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage contact form submissions</p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {messages.length} Total Messages
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <AdminTable
          data={messages}
          columns={columns}
          searchField="name"
          searchPlaceholder="Search messages by name, email, or subject..."
        />
      )}
    </AdminPageWrapper>
  )
} 