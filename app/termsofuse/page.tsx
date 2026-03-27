import React from "react";
import Link from "next/link"

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">StocKing Terms of Use</h1>

        <p className="text-gray-600">
          Welcome to <span className="font-semibold">StocKing</span>. By accessing or using our stock prediction platform, you agree to comply with and be bound by the following terms.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Use of Service</h2>
          <p className="text-gray-600">
            StocKing provides stock market predictions for informational purposes only. You agree to use the platform responsibly and not for any unlawful activity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. No Financial Advice</h2>
          <p className="text-gray-600">
            The predictions and data provided are not financial advice. Always conduct your own research or consult a professional before making investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. User Responsibility</h2>
          <p className="text-gray-600">
            You are solely responsible for any financial decisions you make based on the information provided by StocKing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Data Accuracy</h2>
          <p className="text-gray-600">
            We do not guarantee the accuracy, completeness, or reliability of any data displayed on the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-600">
            StocKing reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
          </p>
        </section>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-gray-500">Last updated: March 2026</p>
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
            Accept
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
