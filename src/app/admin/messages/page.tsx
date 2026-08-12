'use client';

import { useEffect, useState } from 'react';
import { ContactMessage } from '@/types';
import { messageRepository } from '@/repositories/message.repository';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, MailOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function formatDate(value: ContactMessage['createdAt']) {
  if (!value) return '-';
  if ('toDate' in value) return value.toDate().toLocaleString();
  return '-';
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const data = await messageRepository.getAllMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load messages.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMessages();
  }, []);

  const handleMarkRead = async (message: ContactMessage) => {
    if (!message.id) return;
    try {
      await messageRepository.markAsRead(message.id);
      toast.success('Message marked as read.');
      loadMessages();
    } catch (error) {
      console.error(error);
      toast.error('Could not update message.');
    }
  };

  const handleDelete = async (message: ContactMessage) => {
    if (!message.id) return;
    if (!confirm('Delete this message?')) return;

    try {
      await messageRepository.delete(message.id);
      toast.success('Message deleted.');
      loadMessages();
    } catch (error) {
      console.error(error);
      toast.error('Could not delete message.');
    }
  };

  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-[#0063ff] shadow-sm">
            <Mail className="size-4" />
            Contact Inbox
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#08245c]">Messages</h1>
          <p className="mt-2 text-[#5a72a4]">Messages submitted from the public contact form.</p>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-sm">
          <p className="text-sm font-semibold text-[#6a82b2]">Unread</p>
          <p className="text-2xl font-bold text-[#0063ff]">{unreadCount}</p>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/75 bg-white/68 p-4 shadow-[0_18px_45px_rgba(41,101,202,0.08)] backdrop-blur-xl">
        {isLoading ? (
          <div className="grid min-h-56 place-items-center text-[#6a82b2]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-[#b8cff5] bg-white/45 text-center">
            <div>
              <Mail className="mx-auto mb-3 size-10 text-[#7daaf3]" />
              <p className="font-bold text-[#08245c]">No messages yet</p>
              <p className="mt-1 text-sm text-[#6a82b2]">New contact form messages will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="rounded-[1.25rem] border border-white/80 bg-white/72 p-5 shadow-sm transition hover:bg-white"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={message.isRead ? 'secondary' : 'default'} className={!message.isRead ? 'bg-[#0063ff]' : ''}>
                        {message.isRead ? 'Read' : 'New'}
                      </Badge>
                      <p className="text-sm text-[#7b91bd]">{formatDate(message.createdAt)}</p>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-[#08245c]">{message.subject}</h2>
                    <p className="mt-1 font-semibold text-[#294678]">{message.name}</p>
                    <a href={`mailto:${message.email}`} className="text-sm font-medium text-[#0063ff] hover:underline">
                      {message.email}
                    </a>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {!message.isRead && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkRead(message)} className="rounded-full bg-white/75 text-emerald-600">
                        <Check className="mr-1 size-4" />
                        Mark read
                      </Button>
                    )}
                    <a href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}>
                      <Button variant="outline" size="sm" className="rounded-full bg-white/75 text-[#0063ff]">
                        <MailOpen className="mr-1 size-4" />
                        Reply
                      </Button>
                    </a>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(message)} className="rounded-full bg-white/75 text-red-600">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#dce9ff] bg-[#f7fbff] p-4 text-sm leading-7 text-[#46629a]">
                  {message.message}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
