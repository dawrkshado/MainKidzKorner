import { useEffect, useState } from "react";
import api from "../api";

function StudentFilesPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await api.get("/api/files/");
        setFiles(res.data);
      } catch (err) {
        console.error("Error loading files:", err);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Files</h2>
      <ul className="space-y-4">
        {files.map((file) => (
          <li key={file.id} className="border p-3 rounded">
            <strong>{file.title}</strong>
            <p className="text-sm text-gray-600">By: {file.uploader_name}</p>
            <a
              href={`http://127.0.0.1:8000${file.file}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View / Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentFilesPage;
