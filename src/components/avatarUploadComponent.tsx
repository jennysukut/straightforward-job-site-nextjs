// import React, { useState, useRef } from "react";
// // import { Camera, Upload, X } from "lucide-react";

// const AvatarUpload = ({ onImageUpload, maxSizeMB = 5 }: any) => {
//   const [preview, setPreview] = useState("");
//   const [error, setError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileSelect = (event: any) => {
//     const file = event.target.files[0];
//     setError("");

//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       setError("Please upload an image file");
//       return;
//     }

//     // Validate file size (convert maxSizeMB to bytes)
//     if (file.size > maxSizeMB * 1024 * 1024) {
//       setError(`File size must be less than ${maxSizeMB}MB`);
//       return;
//     }

//     // Create preview URL
//     const previewUrl = URL.createObjectURL(file);
//     setPreview(previewUrl);

//     // Pass file to parent component
//     onImageUpload(file);

//     // Clean up previous preview URL
//     return () => URL.revokeObjectURL(previewUrl);
//   };

//   const handleDragOver = (event: any) => {
//     event.preventDefault();
//     event.currentTarget.classList.add("border-blue-500");
//   };

//   const handleDragLeave = (event: any) => {
//     event.preventDefault();
//     event.currentTarget.classList.remove("border-blue-500");
//   };

//   const handleDrop = (event: any) => {
//     event.preventDefault();
//     event.currentTarget.classList.remove("border-blue-500");

//     const file = event.dataTransfer.files[0];
//     if (file) {
//       const dummyEvent = { target: { files: [file] } };
//       handleFileSelect(dummyEvent);
//     }
//   };

//   const clearImage = () => {
//     setPreview("");
//     setError("");
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     onImageUpload(null);
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div
//         className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"} transition-colors hover:border-blue-400`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {preview ? (
//           <div className="relative">
//             <img
//               src={preview}
//               alt="Avatar preview"
//               className="h-32 w-32 rounded-full object-cover"
//             />
//             <button
//               onClick={clearImage}
//               className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
//               aria-label="Remove image"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* <Camera className="mb-4 h-12 w-12 text-gray-400" />
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileSelect}
//               className="hidden"
//               id="avatar-upload"
//             />
//             <label
//               htmlFor="avatar-upload"
//               className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               <Upload className="h-4 w-4" />
//               Choose Image
//             </label> */}
//             <p className="mt-2 text-sm text-gray-500">
//               or drag and drop an image here
//             </p>
//           </>
//         )}
//       </div>

//       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

//       <p className="mt-2 text-xs text-gray-500">
//         Supported formats: JPG, PNG, GIF (max {maxSizeMB}MB)
//       </p>
//     </div>
//   );
// };

// export default AvatarUpload;
