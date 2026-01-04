"use client";
import {
  IconMail,
  IconUser,
  IconEyeOff,
  IconEye,
  IconPhone,
  IconBriefcase,
} from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios, { type AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    profileImage: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [otpSent, setOtpSent] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const verifyEmail = async () => {
    if (
      !formData.email ||
      !formData.email.includes("@") ||
      !formData.email.includes(".")
    ) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.fullName) {
      toast.error("Please enter your name first");
      return;
    }
    try {
      const response = axios.post(`/api/helper/verify-email`, {
        name: formData.fullName,
        email: formData.email,
      });
      toast.promise(response, {
        loading: "Sending Email...",
        success: (data: AxiosResponse) => {
          (
            document.getElementById("otpContainer") as HTMLDialogElement
          ).showModal();
          setOtpSent(data.data.token);
          return "Email Sent!!";
        },
        error: (err) => err.data?.response.message || "Something went wrong",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.profileImage
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    try {
      const response = axios.post(`/spring-server/api/candidate/create`, {
        user: formData,
      });
      toast.promise(response, {
        loading: "Creating your account...",
        success: () => {
          router.push("/login");
          return "Account created successfully!";
        },
        error: (err: unknown) => {
          return `This just happened: ${err}`;
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
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
          setFormData({
            ...formData,
            profileImage: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 pt-20">
        <div className="w-full max-w-md bg-base-100 shadow-xl px-10 py-4 rounded-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <IconBriefcase size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-base-content/70">Join Hire Hub today</p>
          </div>
          <div className="space-y-2">
            {/* Name Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Name <span className="text-error">*</span>
              </legend>
              <label className="w-full input input-primary">
                <IconUser size={20} className="opacity-70" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="grow join-item"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" "),
                    })
                  }
                  required
                />
              </label>
            </fieldset>
            {/* Phone Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Phone <span className="text-error">*</span>
              </legend>
              <label className="w-full input input-primary">
                <IconPhone size={20} className="opacity-70" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="123-456-7890"
                  className="grow join-item"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target.value.length <= 10
                          ? e.target.value
                          : formData.phone,
                    })
                  }
                  required
                />
              </label>
            </fieldset>
            {/* Email Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Email <span className="text-error">*</span>
              </legend>
              <div className="join">
                <label className="w-full input input-primary join-item">
                  <IconMail size={20} className="opacity-70" />
                  <input
                    type="email"
                    name="email"
                    placeholder="user@company.com"
                    disabled={isEmailVerified || formData.fullName.length < 3}
                    className="h-full w-full "
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.toLowerCase(),
                      })
                    }
                  />
                </label>
                {formData.email.includes("@") &&
                  formData.email.includes(".") &&
                  formData.email.length > 5 &&
                  formData.fullName.length > 2 &&
                  !isEmailVerified && (
                    <button
                      className="btn btn-primary join-item"
                      onClick={verifyEmail}
                    >
                      Verify
                    </button>
                  )}
              </div>
            </fieldset>
            {/* Profile Image Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Profile Image <span className="text-error">*</span>
              </legend>
              <div className="join">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-primary w-full join-item"
                  disabled={
                    formData.profileImage !== "" || formData.fullName === ""
                  }
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setImage(files[0]);
                    }
                  }}
                />
                {(image || formData.profileImage !== "") && (
                  <button
                    className="btn btn-secondary join-item"
                    onClick={() =>
                      uploadImage(
                        "applicant-profile-images",
                        formData.fullName || "profile-image",
                        "profileImage"
                      )
                    }
                  >
                    Upload
                  </button>
                )}
              </div>
            </fieldset>
            {/* Password Field */}
            <fieldset className="fieldset">
              <legend className="legend font-bold">
                Password <span className="text-error">*</span>
              </legend>
              <div className="join">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-primary join-item w-full"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="btn btn-square join-item"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  type="button"
                >
                  {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </fieldset>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />I agree to the Terms
                and Conditions
              </label>
            </div>
            <button
              className="btn btn-primary w-full"
              disabled={
                !isEmailVerified ||
                formData.password.length < 6 ||
                !formData.fullName ||
                !formData.phone ||
                !formData.email ||
                !formData.profileImage
              }
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="link link-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <dialog id="otpContainer" className="modal">
        <div className="modal-box space-y-6">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content hover:text-primary transition duration-200">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl text-center text-base-content uppercase my-4">
            Please Enter The OTP
          </h3>

          <div className="flex justify-center gap-4">
            {/* OTP Input fields for 6 digits */}
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="input input-bordered input-primary text-center w-12 h-12 text-xl font-semibold placeholder:text-base-content/70"
                value={formData.otp?.[index] ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d$/.test(value) || value === "") {
                    const otp = [...formData.otp!];
                    otp[index] = value;
                    setFormData({ ...formData, otp: otp.join("") });
                    if (value && index < 5) {
                      document
                        .getElementById(`otp-input-${index + 1}`)
                        ?.focus();
                    }
                  }
                }}
                id={`otp-input-${index}`}
                placeholder="●"
              />
            ))}
          </div>

          <button
            className="btn btn-primary w-full mt-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              if (formData.otp?.length === 6 && formData.otp === otpSent) {
                setIsEmailVerified(true);
                (
                  document.getElementById("otpContainer") as HTMLDialogElement
                )?.close();
                toast.success("OTP Verified", { duration: 2000 });
              } else {
                toast.error("Invalid OTP!!!", { duration: 2000 });
              }
            }}
          >
            Verify
          </button>
        </div>
      </dialog>
    </>
  );
};

export default SignUp;
