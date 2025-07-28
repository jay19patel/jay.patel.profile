"use client"

import { useEffect, useState } from 'react'
import { AdminPageWrapper } from '@/components/customUi/AdminPageWrapper'
import { AdminTable } from '@/components/customUi/AdminTable'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Mail, MailOpen } from 'lucide-react'
import { toast } from 'sonner'
import { getMessages, toggleMessageRead } from '@/app/actions/messages'

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async (page = pagination.page) => {
    setIsLoading(true)
    const res = await getMessages(page, pagination.limit)
    if (res.success) {
      setMessages(res.data)
      if (res.pagination) {
        setPagination(res.pagination)
      }
    }
    setIsLoading(false)
  }

  const handleToggleRead = async (message) => {
    const newReadStatus = !message.isRead;
    toast.promise(
      async () => {
        const { success, error } = await toggleMessageRead(message._id, newReadStatus);
        if (!success) throw new Error(error || 'Failed to update message status');
        await fetchMessages(pagination.page);
      },
      {
        loading: `Marking message as ${newReadStatus ? 'read' : 'unread'}...`,
        success: `Message marked as ${newReadStatus ? 'read' : 'unread'} successfully`,
        error: 'Failed to update message status'
      }
    );
  };

  const handlePageChange = (newPage) => {
    fetchMessages(newPage);
  };

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
    },
    {
      header: 'Status',
      accessorKey: 'isRead',
      cell: ({ row }) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.original.isRead 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {row.original.isRead ? 'Read' : 'Unread'}
        </span>
      )
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 text-gray-600 dark:text-gray-400 ${
            row.original.isRead 
              ? 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              : 'hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
          onClick={() => handleToggleRead(row.original)}
          title={row.original.isRead ? 'Mark as unread' : 'Mark as read'}
        >
          {row.original.isRead ? (
            <Mail className="h-4 w-4" />
          ) : (
            <MailOpen className="h-4 w-4" />
          )}
          <span className="sr-only">{row.original.isRead ? 'Mark as unread' : 'Mark as read'}</span>
        </Button>
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {messages.filter(m => !m.isRead).length} Unread
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {messages.filter(m => m.isRead).length} Read
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {messages.length} Total
              </span>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <AdminTable
            data={messages}
            columns={columns}
            searchField="name"
            searchPlaceholder="Search messages by name, email, or subject..."
          />
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </AdminPageWrapper>
  )
} 