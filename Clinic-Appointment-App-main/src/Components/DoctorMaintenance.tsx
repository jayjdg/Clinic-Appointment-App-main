import { useState, useEffect } from "react";
import axios from "axios";

interface Doctor {
  doctorId: number;
  name: string;
  specialization: string;
}

const API_URL = "http://localhost:5081/api/Doctor"; // Base API URL

const DoctorMaintenance = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState({ doctorId: 0,name: "", specialization: "" });
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/list`);
        setDoctors(response.data); // Assuming API returns a list of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Add Doctor
  const addDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialization) return;
    try {
      const response = await axios.post(`${API_URL}/add`, newDoctor);
      setDoctors([...doctors, response.data]); // Add newly created doctor to list
      setNewDoctor({ doctorId: 0, name: "", specialization: "" });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Update Doctor
  const updateDoctor = async () => {
    if (!editingDoctor) return;
    try {
      await axios.put(`${API_URL}/update/${editingDoctor.doctorId}`, editingDoctor);
      setDoctors(doctors.map((doc) => (doc.doctorId === editingDoctor.doctorId ? editingDoctor : doc)));
      setEditingDoctor(null);
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  // Delete Doctor
  const deleteDoctor = async (id: number) => {
    if (!id) {
      console.error("Doctor ID is undefined!");
      return;
  }
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setDoctors(doctors.filter((doc) => doc.doctorId !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Doctor Maintenance</h2>

      {/* Doctor List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Doctors List</h3>
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li
              key={doctor.doctorId}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div>
                <span className="font-semibold">Doctor Id {doctor.doctorId} - Dr. {doctor.name} - {doctor.specialization}</span> 
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  onClick={() => setEditingDoctor(doctor)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteDoctor(doctor.doctorId)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Doctor */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add Doctor</h3>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Doctor Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        />
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, specialization: e.target.value })
          }
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={addDoctor}
        >
          Add Doctor
        </button>
      </div>

      {/* Edit Doctor */}
      {editingDoctor && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Edit Doctor</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Doctor Name"
            value={editingDoctor.name}
            onChange={(e) =>
              setEditingDoctor({ ...editingDoctor, name: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Specialization"
            value={editingDoctor.specialization}
            onChange={(e) =>
              setEditingDoctor({
                ...editingDoctor,
                specialization: e.target.value,
              })
            }
          />
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            onClick={updateDoctor}
          >
            Update Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorMaintenance;
