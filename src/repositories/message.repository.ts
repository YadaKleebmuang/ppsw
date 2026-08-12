import { BaseRepository } from './base.repository';
import { ContactMessage } from '@/types';
import { orderBy } from 'firebase/firestore';

class MessageRepository extends BaseRepository<ContactMessage> {
  constructor() {
    super('messages');
  }

  async getAllMessages(): Promise<ContactMessage[]> {
    return this.getAll([orderBy('createdAt', 'desc')]);
  }

  async createMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'isRead'>): Promise<string> {
    return this.create({
      ...data,
      isRead: false,
    });
  }

  async markAsRead(id: string): Promise<void> {
    return this.update(id, { isRead: true });
  }
}

export const messageRepository = new MessageRepository();
