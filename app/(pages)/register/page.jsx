import { handler } from "@/app/api/auth/[...nextauth]/route";
import Register from "@/app/components/auth/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(handler);

  if (session) {
    redirect("/dashboard/profile");
  }
  return <Register />;
};

export default RegisterPage;
