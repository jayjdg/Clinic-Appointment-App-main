import React, { useState, useEffect } from "react";
import axios from "axios";


interface Appointment {
    appointmentId: number;
    startTime: string;  // Or Date if handling as a Date object
    EndTime: string;
    status: string;
    doctorId: number;
    doctorName:string;
    patientId: number;
}

interface Doctor {
    doctorId: number;
    name: string;
    specialization: string;
}

const Appointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    
    


    useEffect(() => {
        //fetchAppointments();
        fetchAppointmentsById();
        fetchDoctors();
       
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:5081/api/Doctor/list");
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const fetchAppointmentsById = async () => {
        try {
            const response = await axios.get(`http://localhost:5081/api/Appointement/${localStorage.getItem("userid")?.toString()}`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };



    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5081/api/Appointement`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const bookAppointment = async () => {
        try {
            await axios.post(`http://localhost:5081/api/Appointement/book`, {
                doctorId:selectedDoctor,
                patientId:localStorage.getItem("userid")?.toString(),
                startTime: selectedTime,
            });
            alert("Appointment Booked successfully!");
            //alert("Appointment Booked successfully!");
            fetchAppointmentsById();
            //fetchAppointments();
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    const cancelAppointment = async (id: number) => {
        try {
            await axios.put(`http://localhost:5081/api/Appointement/cancel/${id}`);
            alert("Appointment cancelled successfully!");
            fetchAppointmentsById();
            //fetchAppointments();
        } catch (error) {
            console.error("Error canceling appointment:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Appointments</h2>

  {/* Search Appointment */}
  <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
    <input
      type="text"
      readOnly
      placeholder="Patient ID"
      value={localStorage.getItem("userid")?.toString()}
      onChange={(e) => setPatientId(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
    />

    <button
      className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      onClick={fetchAppointmentsById}
    >
      Search Appointment
    </button>
  </div>

  {/* Appointment Booking */}
  <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
    <label className="block text-gray-700 font-medium mb-2">Select Doctor:</label>
    <select
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
      value={selectedDoctor ?? ""}
      onChange={(e) => setSelectedDoctor(Number(e.target.value))}
    >
      <option value="">-- Select Doctor --</option>
      {doctors.map((doctor) => (
        <option key={doctor.doctorId} value={doctor.doctorId}>
          {doctor.name}
        </option>
      ))}
    </select>

    <input
      type="datetime-local"
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg mt-3 focus:ring focus:ring-blue-300"
    />

    <button
      className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      onClick={bookAppointment}
    >
      Book Appointment
    </button>
  </div>

  {/* Appointments List */}
  <ul className="space-y-4">
    {appointments.map((appointment) => (
      <li key={appointment.appointmentId} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
        <span className="text-gray-700">
          Dr. {appointment.doctorName} - {appointment.patientId} - {appointment.startTime} - 
          <span className={`ml-2 px-2 py-1 text-sm rounded-md ${appointment.status === "Booked" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {appointment.status}
          </span>
        </span>

        {appointment.status === "Booked" && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => cancelAppointment(appointment.appointmentId)}
          >
            Cancel
          </button>
        )}
      </li>
    ))}
  </ul>
</div>

    );
};

export default Appointments;
