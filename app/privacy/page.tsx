import Link from "next/link"

 const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">StocKing Privacy Policy</h1>

        <p className="text-gray-600">
          At <span className="font-semibold">StocKing</span>, we value your privacy. This policy explains how we collect, use, and protect your information.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">
            We may collect personal information such as your name, email address, and usage data when you interact with our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. How We Use Information</h2>
          <p className="text-gray-600">
            Your information is used to improve our services, personalize user experience, and communicate updates related to StocKing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Data Protection</h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Third-Party Services</h2>
          <p className="text-gray-600">
            We may use third-party tools or APIs that collect, monitor, and analyze data to improve functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal information at any time.
          </p>
        </section>

            <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-gray-500">Last updated: March 2026</p>
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
            Got it
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;