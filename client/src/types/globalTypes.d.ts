type LoginInputsType = {
  username: string
  password: string
}

type AuthUserType = {
  id: string
  fullName: string
  profilePic: string
  gender: string
  username: string
}

type ConversationType = {
  id: string
  fullName: string
  profilePic: string
}

type MessageType = {
  id: string
  body: string
  senderId: string
  createdAt: string
}
