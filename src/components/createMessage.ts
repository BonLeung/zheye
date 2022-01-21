import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountedNode = document.createElement('div')
  document.body.appendChild(mountedNode)
  messageInstance.mount(mountedNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountedNode)
  }, timeout)
}

export default createMessage
