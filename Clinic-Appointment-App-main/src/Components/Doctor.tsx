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


interface Slot {
    startTime: string; // Or `Date` if using Date objects
    endTime: string;
}

const Doctor = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [doctorId, setDoctorId] = useState(localStorage.getItem("userid") || "");
    const [availability, setAvailability] = useState<Slot[]>([]);
    const [newAvailability, setNewAvailability] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (localStorage.getItem("userid")?.toString()) {
            fetchAvailability();
            fetchAppointmentsById();
        }
    }, [doctorId]);

    const fetchAppointmentsById = async () => {
        try {
            const response = await axios.get(`http://localhost:5081/api/Appointement/Doctor/${localStorage.getItem("userid")?.toString()}`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`http://localhost:5081/api/Doctor/${doctorId}/availability`);
            
            console.log("API Response:", response.data); // Debugging log

            // Ensure the response is an array before setting state
            if (Array.isArray(response.data)) {
                setAvailability(response.data);
            } else {
                setAvailability([]); // Prevent `.map()` errors
            }
        } catch (error) {
            console.error("Error fetching availability:", error);
            setAvailability([]); // Handle API errors
        }
    };


    const updateAvailability = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const availabilitySlots = [
            {
                startTime: new Date(startDate).toISOString(),
                endTime: new Date(endDate).toISOString(),
                status: "Available",
                doctorId: doctorId
            }
        ];

        try {
            await axios.put(
                `http://localhost:5081/api/Doctor/${doctorId}/availability`,
                availabilitySlots
            );
            alert("Availability updated successfully!");
            fetchAvailability(); // Refresh availability list
        } catch (error) {
            console.error("Error updating availability:", error);
        }
    };




    // const updateAvailability = async () => {
    //     try {
    //         const response = await axios.put(`http://localhost:5081/api/Doctor/${doctorId}/availability`, [
    //             {  startTime: newAvailability, status: "Available" }
    //         ]);
    //         alert(response.data.Message);
    //         fetchAvailability();
    //     } catch (error) {
    //         console.error("Error updating availability:", error);
    //     }
    // };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Booked Appointments</h2>

  <ul className="space-y-4">
    {appointments.map((appointment) => (
      <li key={appointment.appointmentId} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
        <span className="text-gray-700">
          Dr. {appointment.doctorName} - {appointment.patientId} - {appointment.startTime} - 
          <span className={`ml-2 px-2 py-1 text-sm rounded-md ${appointment.status === "Booked" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {appointment.status}
          </span>
        </span>

        {/* {appointment.status === "Booked" && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => updateAvailability()}
          >
            Cancel
          </button>
        )} */}
      </li>
    ))}
  </ul>
         <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
                
                <label className="block px-2 py-1 text-white bg-blue-500 rounded-md">
                 Start Date:
                </label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
                <label className="block px-2 py-1 text-white bg-blue-500 rounded-md">
                 End Date:
                </label>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
             onClick={updateAvailability}>Update Availability</button>

            {/* Display Availability Slots */}
            {availability.length === 0 ? (
                <p>No available slots</p>
            ) : (
                <ul>
                    {availability.map((slot, index) => (
                        <li key={index} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                            
                            
                            🟢 <strong>Available Start: </strong> {new Date(slot.startTime).toLocaleString()} |{" "}
                            
                            🟢 <strong>End:</strong> {new Date(slot.endTime).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
  {/* Fetch Doctor Availability */}
 
</div>

    );
};

export default Doctor;
