import React from "react";
import Navbar from "@/components/layout/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About CapCo</h1>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1500&auto=format&fit=crop"
              alt="CapCo Team"
              className="w-full h-[400px] object-cover rounded-lg mb-8 max-w-none"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />

            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2015, CapCo began with a simple mission: to create
              premium quality caps that combine style, comfort, and durability.
              What started as a small workshop with just three designers has
              grown into a beloved brand with a global presence.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our passion for craftsmanship and attention to detail has made us
              a leader in the headwear industry. Each cap is designed with care
              and manufactured using only the finest materials to ensure that
              our customers receive products they can be proud to wear.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-700">
                  We never compromise on quality. From the materials we source
                  to the final stitching, every detail matters.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to reducing our environmental impact through
                  responsible manufacturing and packaging.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-700">
                  We continuously explore new designs, materials, and
                  technologies to bring you the best headwear possible.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our diverse team of designers, craftspeople, and cap enthusiasts
              work together to create products we're proud of. With backgrounds
              ranging from fashion design to textile engineering, our team
              brings a wealth of knowledge and passion to everything we do.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
                },
                {
                  name: "Sam Rivera",
                  role: "Lead Designer",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
                },
                {
                  name: "Taylor Kim",
                  role: "Production Manager",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
                },
                {
                  name: "Jordan Patel",
                  role: "Marketing Director",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover max-w-none"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
