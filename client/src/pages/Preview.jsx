import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import dummyResumeData from "../assets/assets";
import ResumePreview from "../Components/ResumePreview";
import { ArrowLeftIcon, Loader } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-slate-400" />
      </div>
    );
  }

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          className="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-center text-4xl text-slate-400 font-medium mb-6">
        Resume Not Found
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
      >
        <ArrowLeftIcon className="mr-2 size-4" />
        Go to Home Page
      </Link>
    </div>
  );
};

export default Preview;
