"use client";
import {
  IconMail,
  IconEyeOff,
  IconEye,
  IconBriefcase,
  IconUsers,
  IconPassword,
} from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all the required fields");
      return;
    }
    try {
      const response = axios.post(`/spring-server/api/auth/login`, formData, {
        withCredentials: true,
      });
      toast.promise(response, {
        loading: "Logging in...",
        success: (data) => {
          router.push(`/${data.data.role}/dashboard`);
          return "Logged in successfully!";
        },
        error: (err) => {
          console.log(err);
          return err.response?.data || "Something went wrong!!!";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 pt-20">
        <div className="w-full max-w-md bg-base-100 shadow-xl px-10 py-8 rounded-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <IconBriefcase size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-base-content/70">
              Login to your Hire Hub account
            </p>
          </div>
          <div className="space-y-2">
            {/* Email Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">
                Email <span className="text-error">*</span>
              </legend>
              <label className="w-full input input-primary">
                <IconMail size={20} className="opacity-70" />
                <div className="flex w-full h-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="user@company.com"
                    className="h-full w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.toLowerCase(),
                      })
                    }
                  />
                </div>
              </label>
            </fieldset>
            {/* Password Field */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">
                Password <span className="text-error">*</span>
              </legend>
              <div className="join">
                <label className="w-full input input-primary">
                  <IconPassword size={20} className="opacity-70" />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="h-full w-full"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </label>
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
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div>
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Login Now
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="link link-primary font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
