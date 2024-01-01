import Link from "next/link";
import React from "react";

const SecurityPage = () => {
  return (
    <div>
      <h2>SecurityPage</h2>
      <Link href="/user/security/update_password">Update Password</Link>
    </div>
  );
};

export default SecurityPage;
