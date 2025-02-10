export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_reports: {
        Row: {
          club_id: string
          created_at: string
          date: string
          description: string | null
          id: string
          members_count: number
        }
        Insert: {
          club_id: string
          created_at?: string
          date: string
          description?: string | null
          id?: string
          members_count: number
        }
        Update: {
          club_id?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          members_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "activity_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      club_edits: {
        Row: {
          club_id: string
          created_at: string
          field: string
          id: string
          reviewed_at: string | null
          value: string
        }
        Insert: {
          club_id: string
          created_at?: string
          field: string
          id?: string
          reviewed_at?: string | null
          value?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          field?: string
          id?: string
          reviewed_at?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_edits_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          activity_intro: string | null
          alias_name: string | null
          contact: string | null
          created_at: string
          description: string | null
          id: string
          is_established: boolean | null
          location: string | null
          name: string
          time: string | null
        }
        Insert: {
          activity_intro?: string | null
          alias_name?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_established?: boolean | null
          location?: string | null
          name: string
          time?: string | null
        }
        Update: {
          activity_intro?: string | null
          alias_name?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_established?: boolean | null
          location?: string | null
          name?: string
          time?: string | null
        }
        Relationships: []
      }
      clubs_leaders: {
        Row: {
          club_id: string
          created_at: string
          id: string
          profile_id: string
        }
        Insert: {
          club_id: string
          created_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          club_id?: string
          created_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clubs_leaders_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_leaders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          alt_first: string | null
          auth_id: string | null
          created_at: string
          first: string | null
          id: string
          last: string | null
        }
        Insert: {
          alt_first?: string | null
          auth_id?: string | null
          created_at?: string
          first?: string | null
          id?: string
          last?: string | null
        }
        Update: {
          alt_first?: string | null
          auth_id?: string | null
          created_at?: string
          first?: string | null
          id?: string
          last?: string | null
        }
        Relationships: []
      }
      resource_types: {
        Row: {
          description: string | null
          id: string
          type_name: string
        }
        Insert: {
          description?: string | null
          id: string
          type_name: string
        }
        Update: {
          description?: string | null
          id?: string
          type_name?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          publisher: string
          title: string | null
          type_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          publisher: string
          title?: string | null
          type_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          publisher?: string
          title?: string | null
          type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_publisher_fkey"
            columns: ["publisher"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "resource_types"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
