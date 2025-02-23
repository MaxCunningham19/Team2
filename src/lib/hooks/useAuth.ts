import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check active sessions and sets the user
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      if (error) {
        console.error('Error:', error.message)
      }
    }

    void getUser()

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return { user, loading }
}
