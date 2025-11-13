import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your survey response has been successfully submitted.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700 mb-4">
              We greatly appreciate your time and effort in helping us collect valuable data 
              about our community. Your contribution will help us better understand and improve 
              the BPP area.
            </p>
            <p className="text-gray-700">
              Your responses have been recorded and will be used for research and planning purposes.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/survey"
              className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Submit Another Survey
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Return to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you have any questions or concerns, please contact the survey administrators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
