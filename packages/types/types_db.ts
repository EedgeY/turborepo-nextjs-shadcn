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
      cattle: {
        Row: {
          birth_date: string
          breed: string | null
          created_at: string | null
          farm: string | null
          farm_owner_id: string | null
          gender: string
          id: string
          individual_id: string
          updated_at: string | null
        }
        Insert: {
          birth_date: string
          breed?: string | null
          created_at?: string | null
          farm?: string | null
          farm_owner_id?: string | null
          gender: string
          id?: string
          individual_id: string
          updated_at?: string | null
        }
        Update: {
          birth_date?: string
          breed?: string | null
          created_at?: string | null
          farm?: string | null
          farm_owner_id?: string | null
          gender?: string
          id?: string
          individual_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cattle_farm_owner_id_fkey"
            columns: ["farm_owner_id"]
            isOneToOne: false
            referencedRelation: "farm_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      cattle_breeding: {
        Row: {
          breeding_date: string
          classification_id: number
          cow_number: string
          created_at: string | null
          id: number
          manager: string | null
          owner_id: number
          price: number | null
          quantity: number | null
          remarks: string | null
          test_id: number | null
          updated_at: string | null
          veterinarian_id: number | null
        }
        Insert: {
          breeding_date: string
          classification_id: number
          cow_number: string
          created_at?: string | null
          id?: number
          manager?: string | null
          owner_id: number
          price?: number | null
          quantity?: number | null
          remarks?: string | null
          test_id?: number | null
          updated_at?: string | null
          veterinarian_id?: number | null
        }
        Update: {
          breeding_date?: string
          classification_id?: number
          cow_number?: string
          created_at?: string | null
          id?: number
          manager?: string | null
          owner_id?: number
          price?: number | null
          quantity?: number | null
          remarks?: string | null
          test_id?: number | null
          updated_at?: string | null
          veterinarian_id?: number | null
        }
        Relationships: []
      }
      cattle_breeds: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      cattle_farm_history: {
        Row: {
          cattle_id: string | null
          created_at: string | null
          entry_date: string
          entry_height: number | null
          entry_weight: number | null
          exit_date: string | null
          exit_height: number | null
          exit_reason: string | null
          exit_weight: number | null
          farm_id: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          cattle_id?: string | null
          created_at?: string | null
          entry_date: string
          entry_height?: number | null
          entry_weight?: number | null
          exit_date?: string | null
          exit_height?: number | null
          exit_reason?: string | null
          exit_weight?: number | null
          farm_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          cattle_id?: string | null
          created_at?: string | null
          entry_date?: string
          entry_height?: number | null
          entry_weight?: number | null
          exit_date?: string | null
          exit_height?: number | null
          exit_reason?: string | null
          exit_weight?: number | null
          farm_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cattle_farm_history_cattle_id_fkey"
            columns: ["cattle_id"]
            isOneToOne: false
            referencedRelation: "cattle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cattle_farm_history_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          billable: boolean | null
          cattle_id: string | null
          created_at: string | null
          event_date: string
          event_type: string
          id: string
          notes: string | null
          performed_by: string | null
          updated_at: string | null
        }
        Insert: {
          billable?: boolean | null
          cattle_id?: string | null
          created_at?: string | null
          event_date: string
          event_type: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Update: {
          billable?: boolean | null
          cattle_id?: string | null
          created_at?: string | null
          event_date?: string
          event_type?: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_cattle_id_fkey"
            columns: ["cattle_id"]
            isOneToOne: false
            referencedRelation: "cattle"
            referencedColumns: ["id"]
          },
        ]
      }
      exit_reasons: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      farm_owners: {
        Row: {
          created_at: string | null
          farm_id: string | null
          id: string
          owner_code: string
          owner_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          owner_code: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          owner_code?: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_owners_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_owners_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_pricing_systems: {
        Row: {
          created_at: string | null
          farm_id: string | null
          id: string
          nursing_days: number | null
          nursing_rate: number | null
          raising_days: number | null
          raising_rate: number | null
          summer_end_date: string | null
          summer_rate: number | null
          summer_start_date: string | null
          system_type: string
          updated_at: string | null
          winter_end_date: string | null
          winter_rate: number | null
          winter_start_date: string | null
        }
        Insert: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          nursing_days?: number | null
          nursing_rate?: number | null
          raising_days?: number | null
          raising_rate?: number | null
          summer_end_date?: string | null
          summer_rate?: number | null
          summer_start_date?: string | null
          system_type: string
          updated_at?: string | null
          winter_end_date?: string | null
          winter_rate?: number | null
          winter_start_date?: string | null
        }
        Update: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          nursing_days?: number | null
          nursing_rate?: number | null
          raising_days?: number | null
          raising_rate?: number | null
          summer_end_date?: string | null
          summer_rate?: number | null
          summer_start_date?: string | null
          system_type?: string
          updated_at?: string | null
          winter_end_date?: string | null
          winter_rate?: number | null
          winter_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_pricing_systems_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoice_item_types: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      medicines: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          name: string
          standard_price: number
          unit: string
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id?: string
          name: string
          standard_price: number
          unit: string
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          name?: string
          standard_price?: number
          unit?: string
        }
        Relationships: []
      }
      owner_fee_settings: {
        Row: {
          created_at: string | null
          dehorning_fee: number | null
          entry_fee: number | null
          farm_owner_id: string | null
          has_dehorning_fee: boolean | null
          has_entry_fee: boolean | null
          has_insemination_fee: boolean | null
          has_transplant_fee: boolean | null
          id: string
          insemination_fee: number | null
          transplant_fee: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dehorning_fee?: number | null
          entry_fee?: number | null
          farm_owner_id?: string | null
          has_dehorning_fee?: boolean | null
          has_entry_fee?: boolean | null
          has_insemination_fee?: boolean | null
          has_transplant_fee?: boolean | null
          id?: string
          insemination_fee?: number | null
          transplant_fee?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dehorning_fee?: number | null
          entry_fee?: number | null
          farm_owner_id?: string | null
          has_dehorning_fee?: boolean | null
          has_entry_fee?: boolean | null
          has_insemination_fee?: boolean | null
          has_transplant_fee?: boolean | null
          id?: string
          insemination_fee?: number | null
          transplant_fee?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owner_fee_settings_farm_owner_id_fkey"
            columns: ["farm_owner_id"]
            isOneToOne: false
            referencedRelation: "farm_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      owners: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_system_types: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          active: boolean | null
          contact_info: Json | null
          id: string
          license_number: string | null
          name: string
          role: string
        }
        Insert: {
          active?: boolean | null
          contact_info?: Json | null
          id?: string
          license_number?: string | null
          name: string
          role: string
        }
        Update: {
          active?: boolean | null
          contact_info?: Json | null
          id?: string
          license_number?: string | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: number
          type: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          type: string
          url: string
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          type?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_userId_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccines: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          manufacturer: string | null
          name: string
          standard_price: number
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id?: string
          manufacturer?: string | null
          name: string
          standard_price: number
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          manufacturer?: string | null
          name?: string
          standard_price?: number
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

