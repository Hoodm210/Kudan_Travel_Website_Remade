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
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">
            Kudan Travel & Tours B2B Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Partner With Us (B2B Rates)
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Join our global network of travel partners to access exclusive B2B tariffs, curated itineraries, and dedicated operational support.
          </p>
        </div>

        {/* Form or Success View */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-6 py-10">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="text-2xl font-black text-white">Application Received</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We have received your business details and documents. Our management team will review your application and contact you within <strong className="text-white">24 hours</strong>.
                </p>
              </div>

              {/* Emergency WhatsApp Card */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 max-w-md mx-auto space-y-3">
                <p className="text-xs uppercase tracking-widest font-black text-[#D4AF37]">
                  Need Immediate Assistance?
                </p>
                <p className="text-xs text-slate-300">
                  In case of an urgent inquiry or emergency, reach out to our desk directly via WhatsApp:
                </p>
                <a
                  href="https://wa.me/9779843502155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
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
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Submit another application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: BUSINESS DETAILS */}
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h2 className="text-base font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <Building2 size={18} />
                    <span>1. Business Information</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Company Legal Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Himalayan Horizon Travels Pvt. Ltd."
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Business Registration / PAN Number *</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      required
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="Registration or Tax ID"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Business Type</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Travel Agency">Travel Agency</option>
                      <option value="Tour Operator">Tour Operator</option>
                      <option value="Corporate / MICE">Corporate / MICE</option>
                      <option value="OTA (Online Travel Agency)">OTA (Online Travel Agency)</option>
                      <option value="Independent Agent">Independent Agent</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Official Company Email *</label>
                    <input
                      type="email"
                      name="officialEmail"
                      required
                      value={formData.officialEmail}
                      onChange={handleChange}
                      placeholder="partners@company.com"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Official Phone Number *</label>
                    <input
                      type="tel"
                      name="officialPhone"
                      required
                      value={formData.officialPhone}
                      onChange={handleChange}
                      placeholder="+977 ... or international code"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Company Website</label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.company.com"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Country *</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">City / Office Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address and city"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: OWNER / REPRESENTATIVE DETAILS */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-slate-800 pb-2">
                  <h2 className="text-base font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <User size={18} />
                    <span>2. Owner / Authorized Representative Details</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Representative Full Name *</label>
                    <input
                      type="text"
                      name="representativeName"
                      required
                      value={formData.representativeName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Designation / Title *</label>
                    <input
                      type="text"
                      name="representativeTitle"
                      required
                      value={formData.representativeTitle}
                      onChange={handleChange}
                      placeholder="e.g. Managing Director / CEO / Head of Operations"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Direct Email *</label>
                    <input
                      type="email"
                      name="representativeEmail"
                      required
                      value={formData.representativeEmail}
                      onChange={handleChange}
                      placeholder="personal.email@company.com"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">Direct Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="representativePhone"
                      required
                      value={formData.representativePhone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: DOCUMENT UPLOADS (PDF ONLY, MAX 3MB) */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-slate-800 pb-2">
                  <h2 className="text-base font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                    <FileUp size={18} />
                    <span>3. Business Verification Documents</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload official registration or tax certificate. <strong className="text-amber-400">PDF format only, maximum 3 MB per file.</strong>
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950 p-6 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-[#D4AF37]">
                    <FileText size={22} />
                  </div>
                  <div>
                    <label className="relative cursor-pointer rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-all inline-block">
                      <span>Browse PDF Files</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="text-xs text-slate-500 mt-2">Maximum file size: 3 MB (.pdf)</p>
                  </div>
                </div>

                {fileError && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/30 border border-rose-500/30 p-3 rounded-xl">
                    <AlertCircle size={15} />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Selected Files Display List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-300">Selected Documents ({selectedFiles.length}):</p>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate text-slate-300">
                            <FileText size={14} className="text-[#D4AF37]" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-slate-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-slate-500 hover:text-rose-400 p-1"
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
                <div className="border-b border-slate-800 pb-2">
                  <h2 className="text-base font-black uppercase tracking-wider text-[#D4AF37]">
                    4. Additional Information
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Estimated Monthly Pax / Client Volume</label>
                  <select
                    name="estimatedVolume"
                    value={formData.estimatedVolume}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="1-10 pax / month">1 - 10 pax / month</option>
                    <option value="10-30 pax / month">10 - 30 pax / month</option>
                    <option value="30-50 pax / month">30 - 50 pax / month</option>
                    <option value="50+ pax / month">50+ pax / month</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Special Notes or Requirements</label>
                  <textarea
                    name="additionalNotes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Tell us about specific destinations or regions you are interested in..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none resize-y"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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