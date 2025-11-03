import { useState, useEffect } from "react";
import api from "../api";
import Back from "../components/Back";

function TeacherUploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploads, setUploads] = useState([]);

  const fetchUploads = async () => {
    try {
      const res = await api.get("/api/files/");
      setUploads(res.data);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
  if (!title.trim()) {
    alert("Please enter a title before uploading!");
    return;
  }
  if (!file) {
    alert("Select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  try {
    await api.post("/api/upload_file/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("File uploaded successfully!");
    setTitle("");
    setFile(null);
    fetchUploads();
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed.");
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await api.delete(`/api/delete_file/${id}/`);
      setUploads((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed.");
    }
  };

  return (
    <>
      <Back />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
        <input
          required
          type="text"
          placeholder="Enter file title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded mr-3"
        
        />
        <input type="file" onChange={handleFileChange} className="mr-3" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        <h3 className="text-xl font-bold mt-8 mb-4">Your Uploads</h3>
        <ul className="space-y-4">
          {uploads.map((f) => (
            <li key={f.id} className="border p-3 rounded">
              <strong>{f.title}</strong>
              <p className="text-sm text-gray-600">By: {f.uploader_name}</p>
              <a
                href={f.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mr-4"
              >
                View / Download
              </a>
              <button
                onClick={() => handleDelete(f.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TeacherUploadPage;
