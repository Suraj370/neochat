import React from 'react'
import ConversationList from './__components/ConversationList';
import getConversations from '@/actions/getConversations';
import getUsers from '@/actions/getUsers';

const Conversationlayout = async({
    children
}: {
    children: React.ReactNode;
}) => {

  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <div className='h-full'>
      <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
    </div>
  )
}

export default Conversationlayout