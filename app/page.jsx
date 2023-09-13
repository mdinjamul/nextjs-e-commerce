import Link from "next/link";

const Home = async () => {
  return (
    <div className="text-white mt-10 py-3 px-5 bg-blue-600 w-48 m-auto flex items-center justify-center ">
      <Link href="/products">Products</Link>
    </div>
  );
};

export default Home;
