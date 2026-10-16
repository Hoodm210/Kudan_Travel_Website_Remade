"use client";

import React, { useState } from "react";
import {
  Building2,
  User,
  FileUp,
  Send,
  CheckCircle2,
  MessageCircle,
  Loader2,
  FileText,
  AlertCircle,
  ArrowLeft,
  X,
} from "lucide-react";
import Link from "next/link";

interface B2BFormData {
  companyName: string;
  registrationNumber: string;
  businessType: string;
  officialEmail: string;
  officialPhone: string;
  website: string;
  country: string;
  city: string;
  address: string;
  representativeName: string;
  representativeTitle: string;
  representativeEmail: string;
  representativePhone: string;
  estimatedVolume: string;
  additionalNotes: string;
}

const INITIAL_FORM: B2BFormData = {
  companyName: "",
  registrationNumber: "",
  businessType: "Travel Agency",
  officialEmail: "",
  officialPhone: "",
  website: "",
  country: "Nepal",
  city: "",
  address: "",
  representativeName: "",
  representativeTitle: "",
  representativeEmail: "",
  representativePhone: "",
  estimatedVolume: "10-30 pax / month",
  additionalNotes: "",
};

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function B2BPartnerPage() {
  const [formData, setFormData] = useState<B2BFormData>(INITIAL_FORM);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles: File[] = [];

      for (const file of filesArray) {
        // Validate PDF format
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
          setFileError("Only PDF files are allowed.");
          return;
        }
        // Validate File Size (Max 3 MB)
        if (file.size > MAX_FILE_SIZE_BYTES) {
          setFileError(`Each file must be smaller than ${MAX_FILE_SIZE_MB} MB.`);
          return;
        }
        validFiles.push(file);
      }

      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setFileError("Please upload at least one PDF verification document.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Append files
      selectedFiles.forEach((file) => {
        data.append("files", file);
      });

      // Sends form text & PDF files to your API route
      const response = await fetch("/api/b2b-submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white min-h-screen relative overflow-x-hidden py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-stone-500 hover:text-[#A44A3F] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 font-sans">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F]">
            Kudan Travel & Tours B2B Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#172A3A]">
            Partner With Us (B2B Rates)
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Join our global network of travel partners to access exclusive B2B tariffs, curated itineraries, and dedicated operational support.
          </p>
        </div>

        {/* Form or Success View */}
        <div className="rounded-none border border-stone-200/90 bg-white p-6 sm:p-10 shadow-sm font-sans">
          {submitted ? (
            <div className="text-center space-y-6 py-10">
              <div className="inline-flex h-16 w-16 items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="text-2xl font-serif font-bold text-[#172A3A]">Application Received</h2>
                <p className="text-stone-600 text-sm leading-relaxed font-normal">
                  We have received your business details and documents. Our management team will review your application and contact you within <strong className="text-[#172A3A]">24 hours</strong>.
                </p>
              </div>

              {/* Emergency WhatsApp Card */}
              <div className="border border-stone-300 bg-[#EFECE6] p-5 max-w-md mx-auto space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#A44A3F]">
                  Need Immediate Assistance?
                </p>
                <p className="text-xs text-stone-600 font-normal">
                  In case of an urgent inquiry or emergency, reach out to our desk directly via WhatsApp:
                </p>
                <a
                  href="https://wa.me/9779843502155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp (+977 9843502155)</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(INITIAL_FORM);
                    setSelectedFiles([]);
                  }}
                  className="text-xs text-stone-500 hover:text-[#A44A3F] underline"
                >
                  Submit another application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              
              {/* SECTION 1: BUSINESS DETAILS */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#A44A3F] flex items-center gap-2">
                    <Building2 size={16} />
                    <span>1. Business Information</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Company Legal Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Himalayan Horizon Travels Pvt. Ltd."
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Business Registration / PAN Number *</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      required
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Registration or Tax ID"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Business Type</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] focus:border-[#A44A3F] focus:outline-none"
                    >
                      <option value="Travel Agency">Travel Agency</option>
                      <option value="Tour Operator">Tour Operator</option>
                      <option value="Corporate / MICE">Corporate / MICE</option>
                      <option value="OTA (Online Travel Agency)">OTA (Online Travel Agency)</option>
                      <option value="Independent Agent">Independent Agent</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Official Company Email *</label>
                    <input
                      type="email"
                      name="officialEmail"
                      required
                      value={formData.officialEmail}
                      onChange={handleChange}
                      placeholder="partners@company.com"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Official Phone Number *</label>
                    <input
                      type="tel"
                      name="officialPhone"
                      required
                      value={formData.officialPhone}
                      onChange={handleChange}
                      placeholder="+977 ... or international code"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Company Website</label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.company.com"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Country *</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">City / Office Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address and city"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: OWNER / REPRESENTATIVE DETAILS */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-stone-200 pb-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#A44A3F] flex items-center gap-2">
                    <User size={16} />
                    <span>2. Owner / Authorized Representative Details</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Representative Full Name *</label>
                    <input
                      type="text"
                      name="representativeName"
                      required
                      value={formData.representativeName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Designation / Title *</label>
                    <input
                      type="text"
                      name="representativeTitle"
                      required
                      value={formData.representativeTitle}
                      onChange={handleChange}
                      placeholder="e.g. Managing Director / CEO / Head of Operations"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Direct Email *</label>
                    <input
                      type="email"
                      name="representativeEmail"
                      required
                      value={formData.representativeEmail}
                      onChange={handleChange}
                      placeholder="personal.email@company.com"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700">Direct Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="representativePhone"
                      required
                      value={formData.representativePhone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: DOCUMENT UPLOADS (PDF ONLY, MAX 3MB) */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-stone-200 pb-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#A44A3F] flex items-center gap-2">
                    <FileUp size={16} />
                    <span>3. Business Verification Documents</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 font-normal">
                    Upload official registration or tax certificate. <strong className="text-[#A44A3F]">PDF format only, maximum 3 MB per file.</strong>
                  </p>
                </div>

                <div className="border-2 border-dashed border-stone-300 bg-[#EFECE6] p-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 bg-white border border-stone-300 flex items-center justify-center text-[#A44A3F]">
                    <FileText size={22} />
                  </div>
                  <div>
                    <label className="relative cursor-pointer bg-white border border-stone-300 px-4 py-2.5 text-xs font-extrabold text-[#172A3A] hover:bg-stone-50 transition-all inline-block shadow-xs">
                      <span>Browse PDF Files</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="text-xs text-stone-500 mt-2 font-normal">Maximum file size: 3 MB (.pdf)</p>
                  </div>
                </div>

                {fileError && (
                  <div className="flex items-center gap-2 text-rose-700 text-xs bg-rose-50 border border-rose-200 p-3">
                    <AlertCircle size={15} />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Selected Files Display List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-700">Selected Documents ({selectedFiles.length}):</p>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-[#EFECE6] border border-stone-300 px-4 py-2.5 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate text-stone-700 font-normal">
                            <FileText size={14} className="text-[#A44A3F]" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-stone-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-stone-400 hover:text-rose-600 p-1"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 4: ADDITIONAL NOTES */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-stone-200 pb-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#A44A3F]">
                    4. Additional Information
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700">Estimated Monthly Pax / Client Volume</label>
                  <select
                    name="estimatedVolume"
                    value={formData.estimatedVolume}
                    onChange={handleChange}
                    className="w-full bg-[#EFECE6] border border-stone-300 px-4 py-3 text-sm text-[#172A3A] focus:border-[#A44A3F] focus:outline-none"
                  >
                    <option value="1-10 pax / month">1 - 10 pax / month</option>
                    <option value="10-30 pax / month">10 - 30 pax / month</option>
                    <option value="30-50 pax / month">30 - 50 pax / month</option>
                    <option value="50+ pax / month">50+ pax / month</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700">Special Notes or Requirements</label>
                  <textarea
                    name="additionalNotes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Tell us about specific destinations or regions you are interested in..."
                    className="w-full bg-[#EFECE6] border border-stone-300 p-4 text-sm text-[#172A3A] placeholder-stone-400 focus:border-[#A44A3F] focus:outline-none resize-y font-normal"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#172A3A] hover:bg-[#A44A3F] py-4 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Partner Application</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}