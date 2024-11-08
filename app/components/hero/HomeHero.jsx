"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeHero = () => {
  return (
    <section className="py-48">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hero-section-data">
            <p className="intro-data text-blue-600 text-2xl mb-4">Welcome to</p>
            <h1 className="capitalize font-bold text-4xl md:text-6xl">E-Commerce Store</h1>
            <p className="mt-8 text-lg text-gray-700">
              An e-commerce website is a digital platform where businesses can showcase and sell products or services to customers online. It features essential components like
              product listings, detailed descriptions, and high-quality images, along with shopping cart and checkout functionalities for a seamless purchasing experience.{" "}
            </p>
            <Link href="/products" className="mt-6 inline-block">
              <button className="text-white mt-10 py-3 px-5 bg-blue-600 w-48 m-auto flex items-center justify-center">Show Now</button>
            </Link>
          </div>

          <div className="hero-section-image flex justify-end items-center">
            <figure className="relative">
              <Image className="md:w-[500px] md:h-auto" src="/images/hero.jpg" alt="HeroImage" width={300} height={200} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
