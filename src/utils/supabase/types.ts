export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type User = {
  artist_id: string | null;
  avatar_url: string | null;
  created_at: string;
  full_name: string | null;
  id: string;
  stripe_customer_id: string;
};

export type commission = {
  user_id: string;
  artist_id: string;
  created_at: string;
  id: string;
  price: number | null;
  work_id: string | null;
};

export type commissionInsert = {
  user_id: string;
  artist_id: string;
  created_at?: string;
  id?: string;
  price?: number | null;
  work_id?: string | null;
};

export type commissionUpdate = {
  user_id?: string;
  artist_id?: string;
  created_at?: string;
  price?: number | null;
  work_id?: string | null;
};

export type Artist = {
  background: string | null;
  bio: string | null;
  display_name: string | null;
  id: string;
  stripe_connected_account_id: string;
};

export type ArtistInsert = {
  background?: string | null;
  bio?: string | null;
  display_name?: string | null;
  id?: string;
  stripe_connected_account_id: string;
};

export type ArtistUpdate = {
  background?: string | null;
  bio?: string | null;
  display_name?: string | null;
  id?: string;
  stripe_connected_account_id?: string;
};

export type Milestone = {
  amount: number;
  approved: boolean | null;
  artist_notes: string | null;
  buyer_notes: string | null;
  commission_id: string | null;
  completed: boolean;
  content_url: string | null;
  desc: string;
  id: string;
  order_id: number;
};

export type MilestoneUpdate = {
  amount?: number;
  approved?: boolean | null;
  artist_notes?: string | null;
  buyer_notes?: string | null;
  commission_id?: string | null;
  completed?: boolean;
  content_url?: string | null;
  desc?: string;
  id: string;
  order_id?: number;
};

export type MilestoneInsert = {
  amount?: number;
  approved?: boolean | null;
  artist_notes?: string | null;
  buyer_notes?: string | null;
  commission_id?: string | null;
  completed?: boolean;
  content_url?: string | null;
  desc: string;
  id?: string;
  order_id: number;
};

export type Work = {
  artist_id: string;
  created_at: string;
  desc: string | null;
  id: string;
  image_url: string;
  price: number | null;
  quantity: number;
  quantity_sold: number;
  title: string;
};

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: Artist;
        Insert: ArtistInsert;
        Update: ArtistUpdate;
        Relationships: [];
      };
      commissions: {
        Row: commission;
        Insert: commissionInsert;
        Update: commissionUpdate;
        Relationships: [
          {
            foreignKeyName: "commissions_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "commissions_work_id_fkey";
            columns: ["work_id"];
            isOneToOne: false;
            referencedRelation: "works";
            referencedColumns: ["id"];
          },
        ];
      };
      milestones: {
        Row: Milestone;
        Insert: MilestoneInsert;
        Update: MilestoneUpdate;
        Relationships: [
          {
            foreignKeyName: "milestones_commission_id_fkey";
            columns: ["commission_id"];
            isOneToOne: false;
            referencedRelation: "commissions";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: User;
        Insert: {
          artist_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          stripe_customer_id: string;
        };
        Update: {
          artist_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          stripe_customer_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
        ];
      };
      works: {
        Row: {
          artist_id: string;
          created_at: string;
          desc: string | null;
          id: string;
          image_url: string;
          price: number | null;
          quantity: number;
          quantity_sold: number;
          title: string;
        };
        Insert: {
          artist_id?: string;
          created_at?: string;
          desc?: string | null;
          id?: string;
          image_url: string;
          price?: number | null;
          quantity?: number;
          quantity_sold?: number;
          title: string;
        };
        Update: {
          artist_id?: string;
          created_at?: string;
          desc?: string | null;
          id?: string;
          image_url?: string;
          price?: number | null;
          quantity?: number;
          quantity_sold?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "works_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: true;
            referencedRelation: "artists";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
