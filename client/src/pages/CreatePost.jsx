import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // ✅ Handle Image Upload to Cloudinary via Backend with Progress
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);

      const formDataFile = new FormData();
      formDataFile.append('image', file);

      // ✅ Use XMLHttpRequest to show upload progress
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setImageUploadProgress(progress);
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.success) {
            setImageUploadProgress(100);
            // Small delay for smooth animation
            setTimeout(() => {
              setFormData({ ...formData, image: data.imageUrl });
              setImageUploadProgress(null);
            }, 600);
          } else {
            setImageUploadError(data.message || 'Upload failed');
            setImageUploadProgress(null);
          }
        } else {
          setImageUploadError('Upload failed');
          setImageUploadProgress(null);
        }
      };

      xhr.onerror = () => {
        setImageUploadError('Network error during upload');
        setImageUploadProgress(null);
      };

      xhr.open('POST', `${import.meta.env.VITE_BACKEND_URL}/api/upload`, true);
      xhr.send(formDataFile);
    } catch (error) {
      console.error(error);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  // ✅ Handle Post Creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error(error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title + Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
         <Select
  onChange={(e) =>
    setFormData({ ...formData, category: e.target.value })
  }
>
  <option value="uncategorized">Select a category</option>
  <option value="job-alerts">Job Alerts</option>
  <option value="internships">Internships</option>
  <option value="career-tips">Career Tips</option>
  <option value="interview-preparation">Interview Preparation</option>
  <option value="resume-guides">Resume Guides</option>
  <option value="skill-development">Skill Development</option>
  <option value="success-stories">Success Stories</option>
  <option value="company-updates">Company Updates</option>
</Select>

        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
          >
            {imageUploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {/* Error or Preview */}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData.image && (
          <div className="relative w-full h-72">
            <img
              src={formData.image}
              alt="upload preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Submit */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
