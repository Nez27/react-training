export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          amount: number
          endDate: string
          id: number
          roomId: number
          startDate: string
          status: boolean
          userId: number
        }
        Insert: {
          amount: number
          endDate: string
          id?: number
          roomId: number
          startDate: string
          status: boolean
          userId: number
        }
        Update: {
          amount?: number
          endDate?: string
          id?: number
          roomId?: number
          startDate?: string
          status?: boolean
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_roomId_fkey"
            columns: ["roomId"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          id: number
          name: string
          price: number
          status: boolean
        }
        Insert: {
          id?: number
          name: string
          price: number
          status?: boolean
        }
        Update: {
          id?: number
          name?: string
          price?: number
          status?: boolean
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          isBooked: boolean
          name: string
          phone: string
        }
        Insert: {
          id?: number
          isBooked?: boolean
          name: string
          phone: string
        }
        Update: {
          id?: number
          isBooked?: boolean
          name?: string
          phone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
