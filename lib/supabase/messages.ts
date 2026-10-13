import { createClient } from "./client";

export interface MessageRow {
  id: number;
  business_id: number;
  sender_id: string | null;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  body: string;
  read_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  businessId: string;
  senderId: string | null;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  body: string;
  readAt: string | null;
  createdAt: string;
}

function rowToMessage(r: MessageRow): Message {
  return {
    id: String(r.id),
    businessId: String(r.business_id),
    senderId: r.sender_id,
    senderName: r.sender_name,
    senderEmail: r.sender_email,
    senderPhone: r.sender_phone ?? "",
    body: r.body,
    readAt: r.read_at,
    createdAt: r.created_at,
  };
}

/** Send a message about a business */
export async function sendMessage(input: {
  businessId: string;
  name: string;
  email: string;
  phone: string;
  body: string;
}): Promise<Message> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to send a message.");
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      business_id: Number(input.businessId),
      sender_id: user.id,
      sender_name: input.name,
      sender_email: input.email,
      sender_phone: input.phone || null,
      body: input.body,
    })
    .select()
    .single();

  if (error) throw error;
  return rowToMessage(data as MessageRow);
}

/** Fetch messages the current user has sent */
export async function getSentMessages(): Promise<
  (Message & { businessName: string; businessSlug: string })[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*, businesses(name, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((r: any) => ({
    ...rowToMessage(r),
    businessName: r.businesses?.name ?? "Unknown",
    businessSlug: r.businesses?.slug ?? "",
  }));
}

/** Fetch messages received for businesses owned by the current user */
export async function getReceivedMessages(): Promise<
  (Message & { businessName: string; businessSlug: string })[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*, businesses!inner(name, slug, user_id)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((r: any) => ({
    ...rowToMessage(r),
    businessName: r.businesses?.name ?? "Unknown",
    businessSlug: r.businesses?.slug ?? "",
  }));
}

/** Mark a message as read */
export async function markMessageRead(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("id", Number(id));

  if (error) throw error;
}

/** Delete a message the current user sent */
export async function deleteMessage(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", Number(id));

  if (error) throw error;
}