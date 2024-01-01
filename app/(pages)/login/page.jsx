import { handler } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/app/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(handler);

  if (session) {
    redirect("/dashboard/profile");
  }
  return <Login />;
};

export default LoginPage;
