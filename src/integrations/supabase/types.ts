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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tea_sets: {
        Row: {
          created_at: string | null
          description: string | null
          gift_packaging: boolean | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          items_included: string[] | null
          price: number
          serves_people: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gift_packaging?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          items_included?: string[] | null
          price: number
          serves_people?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gift_packaging?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          items_included?: string[] | null
          price?: number
          serves_people?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      teas: {
        Row: {
          brewing_temperature: number | null
          brewing_time: number | null
          caffeine_level: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          origin_country: string | null
          price: number
          tea_type: Database["public"]["Enums"]["tea_type"]
          title: string
          updated_at: string | null
          weight_options: number[] | null
        }
        Insert: {
          brewing_temperature?: number | null
          brewing_time?: number | null
          caffeine_level?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          origin_country?: string | null
          price: number
          tea_type: Database["public"]["Enums"]["tea_type"]
          title: string
          updated_at?: string | null
          weight_options?: number[] | null
        }
        Update: {
          brewing_temperature?: number | null
          brewing_time?: number | null
          caffeine_level?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          origin_country?: string | null
          price?: number
          tea_type?: Database["public"]["Enums"]["tea_type"]
          title?: string
          updated_at?: string | null
          weight_options?: number[] | null
        }
        Relationships: []
      }
      teaware: {
        Row: {
          capacity_ml: number | null
          created_at: string | null
          description: string | null
          dimensions: string | null
          dishwasher_safe: boolean | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          material: Database["public"]["Enums"]["teaware_material"]
          microwave_safe: boolean | null
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          capacity_ml?: number | null
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          dishwasher_safe?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          material: Database["public"]["Enums"]["teaware_material"]
          microwave_safe?: boolean | null
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          capacity_ml?: number | null
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          dishwasher_safe?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          material?: Database["public"]["Enums"]["teaware_material"]
          microwave_safe?: boolean | null
          price?: number
          title?: string
          updated_at?: string | null
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
      product_category: "tea" | "teaware" | "sets" | "ceremony"
      tea_type: "green" | "black" | "white" | "oolong" | "pu_erh" | "herbal"
      teaware_material:
        | "ceramic"
        | "porcelain"
        | "glass"
        | "clay"
        | "bamboo"
        | "metal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      product_category: ["tea", "teaware", "sets", "ceremony"],
      tea_type: ["green", "black", "white", "oolong", "pu_erh", "herbal"],
      teaware_material: [
        "ceramic",
        "porcelain",
        "glass",
        "clay",
        "bamboo",
        "metal",
      ],
    },
  },
} as const
