export interface UserData {
  id: string
  firstName?: string
  lastName?: string
  email: string
  avatar?: string
  role?: { id: string; name: string }
}
