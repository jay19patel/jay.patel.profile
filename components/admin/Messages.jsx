import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getMessages } from '@/app/actions/admin'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMessages().then(res => {
      if (res.success) setMessages(res.data.slice(0, 3))
      setLoading(false)
    })
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No messages yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Date</th>
                <th className="py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg._id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-2 font-medium text-gray-900 dark:text-white">{msg.name}</td>
                  <td className="py-2">{msg.subject}</td>
                  <td className="py-2 text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 max-w-[180px] truncate">{msg.message.slice(0, 40)}{msg.message.length > 40 ? '…' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Link href="/admin/messages">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 