import { getServerSession } from "next-auth";
import Login from "../components/auth/Login";
import { handler } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(handler);

  if (session) {
    redirect("/dashboard/profile");
  }
  return <Login />;
};

export default LoginPage;
