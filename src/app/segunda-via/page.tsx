import { redirect } from "next/navigation";
import { PORTAL_URL } from "@/lib/utils";

export default function SegundaViaPage() {
  redirect(PORTAL_URL);
}
