"use client";
import { useEffect, useState } from "react";
import {
  IconCancel,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconRestore,
  IconTrash,
  IconUpload,
  IconWorldWww,
} from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Company } from "@/Type";

export default function ManageCompanies() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: "",
    technology: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/spring-server/api/company/all-companies`
      );
      console.log("Fetched companies:", response.data);
      setCompanies(response.data);
    } catch (error) {
      console.log("Error fetching companies:", error);
      toast.error("Failed to fetch companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async () => {
    setLoading(true);
    console.log(newCompany);
    try {
      if (
        !newCompany?.user?.fullName ||
        !newCompany?.user.email ||
        !newCompany?.user.phone ||
        !newCompany?.user.password ||
        !newCompany.industry ||
        !newCompany.companySize ||
        !newCompany.website ||
        !newCompany.address ||
        !newCompany.description ||
        !image
      ) {
        toast.error("Please fill all the required fields.");
        setLoading(false);
        return;
      }
      await axios.post(`/spring-server/api/admin/register-company`, newCompany);
      toast.success("Company added successfully.");
      fetchCompanies();
      (
        document.getElementById("add-company-modal") as HTMLDialogElement
      ).close();
      setNewCompany({});
      setImage(null);
    } catch (error) {
      console.log("Error adding company:", error);
      toast.error("Failed to add company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockCompany = async (companyId: number, block: boolean) => {
    setLoading(true);
    try {
      await axios.post(
        `/spring-server/api/admin/${block ? "block" : "unblock"}-company`,
        { company_id: companyId }
      );
      toast.success(`Company ${block ? "blocked" : "unblocked"} successfully.`);
      fetchCompanies();
    } catch (error) {
      console.log("Error updating company status:", error);
      toast.error("Failed to update company status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (companyId: number) => {
    setLoading(true);
    try {
      await axios.delete(
        `/spring-server/api/admin/delete-company/${companyId}`
      );
      toast.success("Company deleted successfully.");
      fetchCompanies();
    } catch (error) {
      console.log("Error deleting company:", error);
      toast.error("Failed to delete company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (folderName: string, imageName: string, path: string) => {
    if (!image) {
      toast.error("No image selected");
      return;
    }
    if (imageName.trim() === "") {
      toast.error("Image name cannot be empty");
      return;
    }
    if (image) {
      if (image.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file: image,
        name: imageName,
        folderName: folderName,
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setNewCompany({
            ...newCompany,
            user: {
              ...newCompany.user!,
              profileImage: data.data.path,
            },
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <Loading />;

  const filteredCompanies = companies.filter(
    (company) =>
      company.user?.fullName
        .toLowerCase()
        .includes(searchParams.name.toLowerCase()) &&
      (searchParams.technology === "" ||
        company.industry === searchParams.technology)
  );

  return (
    <>
      <PageTitle title="Manage Companies" />
      <div className="px-10 space-y-8">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            Search Companies by their name
          </legend>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="input input-primary w-full"
              placeholder="Enter company name"
              value={searchParams.name}
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
            />
            <select
              className="select select-primary w-full"
              value={searchParams.technology}
              onChange={(e) =>
                setSearchParams({ ...searchParams, technology: e.target.value })
              }
            >
              <option value="">All Industries</option>
              {[
                "Technology",
                "Finance",
                "Healthcare",
                "Education",
                "Retail",
                "Manufacturing",
                "Hospitality",
              ].map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              onClick={() =>
                (
                  document.getElementById(
                    "add-company-modal"
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              Add Company <IconPlus className="ml-2" />
            </button>
          </div>
        </fieldset>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {filteredCompanies.map((company) => (
            <Card
              key={company.companyId}
              company={company}
              handleBlockCompany={handleBlockCompany}
              handleDeleteCompany={handleDeleteCompany}
            />
          ))}
        </div>
      </div>
      {/* Add New Company Modal */}
      <dialog
        id="add-company-modal"
        className="modal bg-base-100/70 backdrop-blur-lg opacity-100"
      >
        <Toaster />
        <div className="modal-box w-11/12 max-w-5xl bg-base-100 backdrop-blur-lg h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="font-bold text-2xl text-primary text-center mb-4">
            Add New Company
          </h3>
          <div className="px-10 py-5 mx-auto bg-base-200 rounded-lg">
            <h1 className="border-b text-lg font-bold mb-4">Company Details</h1>
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Company Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Name <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Enter the Company name"
                  value={newCompany.user?.fullName || ""}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      user: {
                        ...newCompany.user!,
                        fullName: e.target.value,
                      },
                    })
                  }
                />
              </fieldset>
              {/* Company Email */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Email <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Enter the Company email"
                  value={newCompany.user?.email}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      user: {
                        ...newCompany.user!,
                        email: e.target.value.toLowerCase().trim(),
                      },
                    })
                  }
                />
              </fieldset>
              {/* Company Phone */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Phone <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Enter the Company phone"
                  value={newCompany.user?.phone}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      user: {
                        ...newCompany.user!,
                        phone:
                          e.target.value.length > 10
                            ? e.target.value.slice(0, 10).replace(/\D/g, "")
                            : e.target.value,
                      },
                    })
                  }
                />
              </fieldset>
              {/* Company Industry */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Industry <span className="text-error">*</span>{" "}
                </legend>
                <select
                  name="industry"
                  className="select select-primary w-full"
                  value={newCompany.industry}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, industry: e.target.value })
                  }
                >
                  <option defaultChecked value="">
                    Select Industry
                  </option>
                  {[
                    "Technology",
                    "Finance",
                    "Healthcare",
                    "Education",
                    "Retail",
                    "Manufacturing",
                    "Hospitality",
                  ].map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Company Size */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Size <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Enter the Company size (e.g., 50-100)"
                  value={newCompany.companySize}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      companySize: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Company Website */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Website <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Enter the Company website"
                  value={newCompany.website}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      website: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Company Password */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Password <span className="text-error">*</span>{" "}
                </legend>
                <div className="join">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="input input-primary w-full join-item"
                    placeholder="Enter the Company password"
                    value={newCompany.user?.password || ""}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        user: {
                          ...newCompany.user!,
                          password: e.target.value,
                        },
                      })
                    }
                  />
                  <button
                    className="btn btn-square join-item btn-primary"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <IconEyeOff size={16} />
                    ) : (
                      <IconEye size={16} />
                    )}
                  </button>
                </div>
              </fieldset>
              {/* Company Image */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Company Image <span className="text-error">*</span>{" "}
                </legend>
                <div className="join">
                  <input
                    type="file"
                    disabled={newCompany.user?.fullName ? false : true}
                    className="file-input file-input-primary w-full join-item"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                      }
                    }}
                  />
                  <button
                    className="btn btn-square join-item btn-primary"
                    onClick={() => {
                      uploadImage(
                        "companies-logo",
                        newCompany.user?.fullName!,
                        "user.profileImage"
                      );
                    }}
                    disabled={newCompany.user?.profileImage ? true : false}
                  >
                    <IconUpload size={16} />
                  </button>
                </div>
              </fieldset>
              {/* Company Address */}
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">
                  Company Address <span className="text-error">*</span>{" "}
                </legend>
                <textarea
                  className="textarea textarea-primary w-full"
                  placeholder="Enter the Company address"
                  value={newCompany.address}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, address: e.target.value })
                  }
                ></textarea>
              </fieldset>
              {/* Company Description */}
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">
                  Company Description <span className="text-error">*</span>{" "}
                </legend>
                <textarea
                  className="textarea textarea-primary w-full"
                  placeholder="Enter the Company description"
                  value={newCompany.description}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </fieldset>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <button
                className="btn btn-error btn-outline w-full"
                onClick={() => window.location.reload()}
              >
                <IconRestore size={16} className="mr-2" />
                Reset
              </button>
              <button
                className="btn btn-primary w-full"
                onClick={handleAddCompany}
              >
                <IconPlus size={16} className="mr-2" />
                Submit
              </button>
              <button
                className="btn btn-secondary w-full"
                onClick={() => {
                  (
                    document.getElementById(
                      "add-company-modal"
                    ) as HTMLDialogElement
                  ).close();
                }}
              >
                <IconCancel size={16} className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

const Card = ({
  company,
  handleBlockCompany,
  handleDeleteCompany,
}: {
  company: Company;
  handleBlockCompany: (companyId: number, block: boolean) => void;
  handleDeleteCompany: (companyId: number) => void;
}) => {
  return (
    <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
      <figure className="bg-base-100 p-4 border-b border-base-300 flex items-center justify-center h-36">
        <img
          src={company.user?.profileImage}
          alt={`${company.user?.fullName} Logo`}
          className="h-full object-contain"
        />
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-xl font-bold uppercase text-center">
          {company.user?.fullName}
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-primary badge-outline">
            {company.industry}
          </span>
          <span className="badge badge-secondary badge-outline">
            {company.companySize} Employees
          </span>
        </div>

        <p className="text-sm opacity-80 mt-2 line-clamp-3">
          {company.description || "No description available"}
        </p>

        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="font-semibold">📍 Address:</span>
          <span className="opacity-90">{company.address}</span>
        </div>

        <div className="flex flex-col text-sm mt-2 opacity-80">
          <span>📧 {company.user?.email}</span>
          <span>📞 {company.user?.phone}</span>
        </div>

        <div className="card-actions mt-4 justify-between">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => {
              const block = company.isBlocked ? false : true;
              handleBlockCompany(company.companyId, block);
            }}
          >
            {company.isBlocked ? "Unblock Company" : "Block Company"}
          </button>
          <a
            href={company.website}
            target="_blank"
            className="btn btn-primary btn-sm"
          >
            <IconWorldWww /> Visit Website
          </a>

          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDeleteCompany(company.companyId)}
          >
            <IconTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
