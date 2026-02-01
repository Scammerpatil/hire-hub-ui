"use client";
import {
  IconEye,
  IconEyeOff,
  IconPlus,
  IconSearch,
  IconCopy,
  IconUserPlus,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";

export default function ManageEmployees() {
  const { user } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [employeeName, setEmployeeName] = useState("");

  const [newEmployee, setNewEmployee] = useState({
    companyId: "",
    user: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      profileImage: "",
      role: "employee",
    },
  });

  const fetchEmployees = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/company/employees/${user.userId}`,
      );
      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [user?.userId]);

  const filteredEmployees = employees.filter((emp) =>
    emp.user.fullName.toLowerCase().includes(employeeName.toLowerCase()),
  );

  const uploadImage = async () => {
    if (!image || !newEmployee.user.fullName) {
      toast.error("Please select an image and enter a name first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", newEmployee.user.fullName.trim());
    formData.append("folderName", "employee-profile-images");

    const uploadPromise = axios.post("/api/helper/upload-img", formData);

    toast.promise(uploadPromise, {
      loading: "Uploading profile image...",
      success: (res) => {
        setNewEmployee((prev) => ({
          ...prev,
          user: { ...prev.user, profileImage: res.data.path },
        }));
        return "Image uploaded successfully!";
      },
      error: "Upload failed.",
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/spring-server/api/company/register-employee`, {
        ...newEmployee,
        companyId: user?.userId,
      });
      toast.success("Employee registered successfully!");
      document.getElementById("add_employee").close();
      fetchEmployees();
      // Reset form
      setNewEmployee({
        companyId: "",
        user: {
          fullName: "",
          email: "",
          phone: "",
          password: "",
          profileImage: "",
          role: "employee",
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && employees.length === 0) return <Loading />;

  return (
    <>
      <PageTitle title="Team Management" />
      <div className="pb-10">
        <div className="bg-base-200 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col md:flex-row gap-4 items-end mx-10 my-4">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend uppercase tracking-widest opacity-60">
              Filter Team Members
            </legend>
            <div className="input input-bordered w-full focus:input-primary">
              <IconSearch className="opacity-40" size={20} />
              <input
                type="text"
                placeholder="Search by name..."
                className="grow"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </fieldset>
          <button
            className="btn btn-primary px-8 gap-2 w-full md:w-auto"
            onClick={() => document.getElementById("add_employee").showModal()}
          >
            <IconPlus size={20} /> Add Employee
          </button>
        </div>

        {/* TABLE SECTION */}
        <div className="mt-8 px-10">
          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-xl">
            <table className="table table-lg w-full">
              <thead className="bg-base-200/50">
                <tr>
                  <th className="text-xs uppercase tracking-wider">Employee</th>
                  <th className="text-xs uppercase tracking-wider">
                    Contact Details
                  </th>
                  <th className="text-xs uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="text-xs uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-20 opacity-50 italic"
                    >
                      No employees found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp.employeeId}
                      className="hover:bg-base-200/30 transition-colors"
                    >
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 bg-base-300">
                              <img
                                src={
                                  emp.user.profileImage ||
                                  "https://api.dicebear.com/7.x/initials/svg?seed=" +
                                    emp.user.fullName
                                }
                                alt="Profile"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {emp.user.fullName}
                            </div>
                            <div className="font-medium text-sm">
                              Internal Staff
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm font-medium">
                          {emp.user.email}
                        </div>
                        <div className="text-xs opacity-50">
                          {emp.user.phone}
                        </div>
                      </td>
                      <td className="font-mono text-xs">{emp.employeeId}</td>
                      <td className="text-right">
                        <button
                          className="btn btn-ghost btn-sm tooltip"
                          data-tip="Copy Email"
                          onClick={() => {
                            navigator.clipboard.writeText(emp.user.email);
                            toast.success("Email copied!");
                          }}
                        >
                          <IconCopy size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD EMPLOYEE MODAL */}
        <dialog
          id="add_employee"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-3xl">
            <div className="bg-primary p-6 text-primary-content flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <IconUserPlus size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  Register Employee
                </h3>
                <p className="text-sm opacity-80 font-medium">
                  Fill in the details to create a new company account.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddEmployee} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Full Name
                  </legend>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full focus:input-primary"
                    value={newEmployee.user.fullName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        user: { ...newEmployee.user, fullName: e.target.value },
                      })
                    }
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Email Address
                  </legend>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="input input-bordered w-full focus:input-primary"
                    value={newEmployee.user.email}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        user: {
                          ...newEmployee.user,
                          email: e.target.value.toLowerCase(),
                        },
                      })
                    }
                    required
                  />
                </fieldset>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Phone Number
                  </legend>
                  <input
                    type="tel"
                    className="input input-bordered w-full focus:input-primary"
                    value={newEmployee.user.phone}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        user: {
                          ...newEmployee.user,
                          phone: e.target.value.slice(0, 10),
                        },
                      })
                    }
                    required
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Password
                  </legend>
                  <div className="join w-full">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="input input-bordered w-full join-item focus:input-primary"
                      value={newEmployee.user.password}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          user: {
                            ...newEmployee.user,
                            password: e.target.value,
                          },
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-neutral join-item"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                </fieldset>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-bold">
                  Profile Picture
                </legend>
                <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl border border-dashed border-base-content/20">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadImage}
                    disabled={!image || newEmployee.user.profileImage !== ""}
                  >
                    Upload
                  </button>
                </div>
              </fieldset>

              <div className="modal-action gap-2 pt-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    document.getElementById("add_employee").close()
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-10"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Confirm Registration"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}
