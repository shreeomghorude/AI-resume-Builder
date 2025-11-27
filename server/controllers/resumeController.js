// // controller for creating a new resume
// //POST: /api/resumes/create

// import imageKit from "../configs/imageKit.js";
// import Resume from "../models/Resume.js";
// import fs from 'fs';

// export const createResume = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { title } = req.body;

//     // create new resume
//     const newResume = await Resume.create({ userId, title });

//     // return success Message
//     return res
//       .status(201)
//       .json({ message: "Resume created successfully", resume: newResume });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// // controller for deleting the resume
// //DELETE: /api/resumes/delete

// export const deleteResume = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { resumeId } = req.params;

//     await Resume.findOneAndDelete({ userId, _id: resumeId });

//     // return success message
//     return res.status(200).json({ message: "Resume deleted successfully" });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// // get user resume by id
// //GET: /api/resumes/get

// export const getResumeById = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { resumeId } = req.params;

//     const resume = await Resume.findOne({ userId, _id: resumeId });

//     if (!resume) {
//       return res.status(404).json({ message: "Resume not found" });
//     }

//     // return success message
//     resume._v = undefined;
//     resume.createdAt = undefined;
//     resume.updatedAt = undefined;

//     return res.status(200).json({ resume });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// // get user resume by id public
// //GET: /api/resumes/public

// export const getPublicResumeById = async (req, res) => {
//   try {
//     const { resumeId } = res.params;
//     const resume = await Resume.findOne({ public: true, _id: resumeId });

//     if (!resume) {
//       return res.status(404).json({ message: "Resume not found" });
//     }
//     return res.status(200).json({ resume });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// // controller for updating a resume
// //PUT: /api/resumes/update

// export const updateResume = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { resumeId, resumeData, removeBackground } = req.body;
//     const image = req.file;

//     let resumeDataCopy = JSON.parse(resumeData);

//     if (image) {

//         const imageBufferData = fs.createReadStream(image.path)
//       const response = await imageKit.files.upload({
//         file: imageBufferData,
//         fileName: "resume.png",
//         folder: 'user-resumes',
//         transformation: {
//             pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
//         }
//       });
//       resumeDataCopy.personal_info.image = response.url; 
//     }

//     const resume = await Resume.findByIdAndUpdate(
//       { userId, _id: resumeId },
//       resumeDataCopy,
//       { new: true }
//     );
//     return res.status(200).json({ message: "saved successfully", resume });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };


import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// ======================= GET ALL RESUMES =======================
// GET: /api/resumes
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// ======================= CREATE RESUME =======================
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ======================= DELETE RESUME =======================
// DELETE: /api/resumes/delete/:resumeId
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ======================= GET RESUME BY ID (PRIVATE) =======================
// GET: /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ======================= GET PUBLIC RESUME =======================
// GET: /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ======================= UPDATE RESUME =======================
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData)
    }else{
      resumeDataCopy = structuredClone(resumeData)
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "saved successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
