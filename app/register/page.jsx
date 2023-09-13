import { getServerSession } from "next-auth";
import Register from "../components/auth/Register";
import { handler } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(handler);

  if (session) {
    redirect("/dashboard/profile");
  }
  return <Register />;
};

export default RegisterPage;
