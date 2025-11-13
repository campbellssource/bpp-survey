import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="w-full max-w-2xl px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              BPP Volunteer Survey
            </h1>
            <p className="text-xl text-gray-600">
              Help us collect valuable data about our community
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Welcome, Volunteers!
              </h2>
              <p className="text-gray-700 mb-4">
                Thank you for your interest in participating in the BPP survey. 
                Your contribution will help us gather important data about our area.
              </p>
              <p className="text-gray-700">
                Please register as a volunteer and then complete the survey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/register"
                className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-lg text-center text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
              >
                Register as Volunteer
              </Link>
              
              <Link 
                href="/survey"
                className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg text-center text-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                Complete Survey
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              All data collected is confidential and will be used for research purposes only.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
