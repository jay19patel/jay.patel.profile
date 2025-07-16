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
      cell: ({ row }) => <span className="line-clamp-2 max-w-xs">{row.original.message}</span>
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: ({ row }) => <span className="text-xs text-gray-500">{new Date(row.original.createdAt).toLocaleString()}</span>
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