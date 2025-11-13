"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SurveyPage() {
  const router = useRouter();
  const [volunteerName, setVolunteerName] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    timeOfDay: "",
    weatherConditions: "",
    trafficLevel: "",
    pedestrianCount: "",
    cyclistCount: "",
    publicTransportUsage: "",
    parkingAvailability: "",
    noiseLevel: "",
    airQuality: "",
    greenSpaces: "",
    commercialActivity: "",
    residentialActivity: "",
    infrastructureCondition: "",
    safetyPerception: "",
    accessibility: "",
    additionalObservations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if volunteer is registered
    const currentVolunteer = localStorage.getItem("currentVolunteer");
    if (currentVolunteer) {
      const volunteer = JSON.parse(currentVolunteer);
      // Use a microtask to avoid synchronous setState in effect
      Promise.resolve().then(() => setVolunteerName(volunteer.fullName));
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.timeOfDay) {
      newErrors.timeOfDay = "Time of day is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call and save to localStorage
    setTimeout(() => {
      const currentVolunteer = localStorage.getItem("currentVolunteer");
      const volunteerData = currentVolunteer ? JSON.parse(currentVolunteer) : { id: "anonymous" };
      
      const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
      const newSurvey = {
        id: Date.now().toString(),
        volunteerId: volunteerData.id,
        volunteerName: volunteerData.fullName || "Anonymous",
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      surveys.push(newSurvey);
      localStorage.setItem("surveys", JSON.stringify(surveys));
      
      setIsSubmitting(false);
      router.push("/thank-you");
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 mb-4">
              <span>←</span> Back to Home
            </Link>
            {volunteerName && (
              <p className="text-sm text-gray-600 mb-2">
                Welcome, <span className="font-semibold">{volunteerName}</span>
              </p>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              BPP Area Survey
            </h1>
            <p className="text-gray-600">
              Please provide detailed observations about the area you are surveying.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Area *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Main Street between 1st and 2nd Avenue"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Day *
                  </label>
                  <select
                    id="timeOfDay"
                    name="timeOfDay"
                    value={formData.timeOfDay}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.timeOfDay ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (6am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-6pm)</option>
                    <option value="evening">Evening (6pm-12am)</option>
                    <option value="night">Night (12am-6am)</option>
                  </select>
                  {errors.timeOfDay && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeOfDay}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Environmental Conditions */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Environmental Conditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="weatherConditions" className="block text-sm font-medium text-gray-700 mb-2">
                    Weather Conditions
                  </label>
                  <select
                    id="weatherConditions"
                    name="weatherConditions"
                    value={formData.weatherConditions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select weather</option>
                    <option value="sunny">Sunny</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="rainy">Rainy</option>
                    <option value="snowy">Snowy</option>
                    <option value="foggy">Foggy</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="noiseLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Noise Level
                  </label>
                  <select
                    id="noiseLevel"
                    name="noiseLevel"
                    value={formData.noiseLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="quiet">Quiet</option>
                    <option value="moderate">Moderate</option>
                    <option value="loud">Loud</option>
                    <option value="very-loud">Very Loud</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="airQuality" className="block text-sm font-medium text-gray-700 mb-2">
                    Air Quality Perception
                  </label>
                  <select
                    id="airQuality"
                    name="airQuality"
                    value={formData.airQuality}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select quality</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="greenSpaces" className="block text-sm font-medium text-gray-700 mb-2">
                    Green Spaces / Parks
                  </label>
                  <select
                    id="greenSpaces"
                    name="greenSpaces"
                    value={formData.greenSpaces}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    <option value="abundant">Abundant</option>
                    <option value="adequate">Adequate</option>
                    <option value="limited">Limited</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Traffic and Transportation */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Traffic & Transportation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="trafficLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Traffic Level
                  </label>
                  <select
                    id="trafficLevel"
                    name="trafficLevel"
                    value={formData.trafficLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                    <option value="congested">Congested</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="parkingAvailability" className="block text-sm font-medium text-gray-700 mb-2">
                    Parking Availability
                  </label>
                  <select
                    id="parkingAvailability"
                    name="parkingAvailability"
                    value={formData.parkingAvailability}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    <option value="abundant">Abundant</option>
                    <option value="adequate">Adequate</option>
                    <option value="limited">Limited</option>
                    <option value="none">None/Full</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pedestrianCount" className="block text-sm font-medium text-gray-700 mb-2">
                    Pedestrian Activity
                  </label>
                  <select
                    id="pedestrianCount"
                    name="pedestrianCount"
                    value={formData.pedestrianCount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="none">None/Very Few</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cyclistCount" className="block text-sm font-medium text-gray-700 mb-2">
                    Cyclist Activity
                  </label>
                  <select
                    id="cyclistCount"
                    name="cyclistCount"
                    value={formData.cyclistCount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="none">None/Very Few</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="publicTransportUsage" className="block text-sm font-medium text-gray-700 mb-2">
                    Public Transport Usage
                  </label>
                  <select
                    id="publicTransportUsage"
                    name="publicTransportUsage"
                    value={formData.publicTransportUsage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select usage</option>
                    <option value="none">No public transport available</option>
                    <option value="low">Low usage</option>
                    <option value="moderate">Moderate usage</option>
                    <option value="high">High usage</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Area Activity */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Area Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="commercialActivity" className="block text-sm font-medium text-gray-700 mb-2">
                    Commercial Activity
                  </label>
                  <select
                    id="commercialActivity"
                    name="commercialActivity"
                    value={formData.commercialActivity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="residentialActivity" className="block text-sm font-medium text-gray-700 mb-2">
                    Residential Activity
                  </label>
                  <select
                    id="residentialActivity"
                    name="residentialActivity"
                    value={formData.residentialActivity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="none">None/Not residential</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Infrastructure and Safety */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Infrastructure & Safety</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="infrastructureCondition" className="block text-sm font-medium text-gray-700 mb-2">
                    Infrastructure Condition
                  </label>
                  <select
                    id="infrastructureCondition"
                    name="infrastructureCondition"
                    value={formData.infrastructureCondition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="very-poor">Very Poor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="safetyPerception" className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Perception
                  </label>
                  <select
                    id="safetyPerception"
                    name="safetyPerception"
                    value={formData.safetyPerception}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select perception</option>
                    <option value="very-safe">Very Safe</option>
                    <option value="safe">Safe</option>
                    <option value="neutral">Neutral</option>
                    <option value="unsafe">Unsafe</option>
                    <option value="very-unsafe">Very Unsafe</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 mb-2">
                    Accessibility (Wheelchair, Stroller, etc.)
                  </label>
                  <select
                    id="accessibility"
                    name="accessibility"
                    value={formData.accessibility}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select accessibility</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Additional Observations */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Observations</h2>
              <div>
                <label htmlFor="additionalObservations" className="block text-sm font-medium text-gray-700 mb-2">
                  Any other observations or notes?
                </label>
                <textarea
                  id="additionalObservations"
                  name="additionalObservations"
                  value={formData.additionalObservations}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Please provide any additional observations, concerns, or suggestions about the area..."
                />
              </div>
            </section>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Survey"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              * Required fields. All information collected is confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
